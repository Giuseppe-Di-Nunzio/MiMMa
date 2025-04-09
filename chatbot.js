document.addEventListener("DOMContentLoaded", async function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContainer = document.getElementById("chat-container");
    const chatToggleBtn = document.getElementById("chat-toggle-btn");
    const closeChatBtn = document.getElementById("close-chat");
    const apiUrl = window.location.origin + "/wp-content/themes/design-italia/get-api-key.php";
    const nomeBot = "MiMMA";
    const whoiam = "Sei un assistente digitale dell'ufficio scolastico regionale per la Puglia e rispondi a richieste di informazioni sugli avvisi, decreti e bandi di c
oncorso per il reclutamento emessi dal Ministero dell'Istruzione e dall'Ufficio Scolastico Regionale. Dai la precedenza alle informazioni più recenti a meno che l'utent
e non specifichi un periodo ad-hoc.";

    let API_KEY = "";

    async function loadApiKey() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.apiKey) {
                API_KEY = data.apiKey;
            } else {
                console.error("Errore: API Key non trovata.");
            }
        } catch (error) {
            console.error("Errore nel caricamento dell'API Key:", error);
        }
    }

    function appendMessage(sender, message, isBot = false) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add(isBot ? "bot-message" : "user-message");

        // Formattazione per elenchi e testo in grassetto
        message = message
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // **testo** → <b>testo</b>
            .replace(/\n- /g, "<br>• ") // Elenco puntato
            .replace(/\n\d+\./g, "<br>"); // Elenco numerato

        msgDiv.innerHTML = `<span>${sender}:</span> ${message}`;

        //msgDiv.textContent = sender + ": " + message;
        msgDiv.style.padding = "5px";
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveConversation();
    }

    function saveConversation() {
        const messages = [];
        chatBox.childNodes.forEach(node => {
            messages.push(node.textContent);
        });
        sessionStorage.setItem("chatHistory", JSON.stringify(messages));
    }

    function loadConversation() {
        const savedMessages = JSON.parse(sessionStorage.getItem("chatHistory"));
        if (savedMessages) {
            savedMessages.forEach(msg => appendMessage("", msg, false));
        }
    }

    async function getTopic(userMessage) {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const prompt = `Determina il topic principale della seguente domanda. Restituisci tre sole parole. Non aggiungere altro testo. Domanda: \n\n"${userMessage}"`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }]  // ✅ **Struttura corretta**
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            console.log("Topic individuato: ", data.candidates[0].content.parts[0].text.trim().toLowerCase());
            return data.candidates[0].content.parts[0].text.trim().toLowerCase();  // ✅ **Accesso corretto ai dati**
        } else {
            return null;
        }
    } catch (error) {
        console.error("Errore nella richiesta di topic:", error);
        return null;
    }
}


    async function searchWordPress(query) {
    const apiUrl = window.location.origin + "/wp-content/themes/design-italia/search-wp.php?q=" + encodeURIComponent(query);
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data || data.length === 0) {
        console.log("❌ Nessun risultato trovato");
        return [];
    }


    console.log("✅ Articolo trovato:", data.title, data.url);
    console.log("✅ json restituito:", data);

    return data;
}


async function getBotResponse(userMessage) {
    if (!API_KEY) {
        appendMessage(nomeBot, "❌ Errore: API Key non trovata.", true);
        return;
    }

    let topic = await getTopic(userMessage);
    if (!topic) {
        appendMessage(nomeBot, "Non ho capito il tema della domanda. Puoi riformularla?", true);
        return;
    }

    console.log("🔍 Topic identificato:", topic);

    let wpData = await searchWordPress(topic);
    let additionalContext = "";

    if (wpData.length > 0) {
        additionalContext = `La ricerca sul sito ha individuato questi risultati:\n.`;
        wpData.forEach((article, index) => {
            additionalContext += `(${index + 1}) ${article.title} - ${article.content} - ${article.url}\n`;
            console.log("informazioni nel ciclo:", index+1 );
        });
        additionalContext += "ulteriori istruzioni: rispondi alla richiesta del utente sulla base degli articoli individuati e riporta questi risultati all'utente ben f
ormattati e tale e quali senza accedervi.\n";
    }

    let queryText = `Istruzioni: ${whoiam}\n\n${additionalContext}Domanda: ${userMessage}`;

    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const payload = {
        contents: [{ role: "user", parts: [{ text: queryText }] }]
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
           appendMessage(nomeBot, data.candidates[0].content.parts[0].text, true);
        } else {
           appendMessage(nomeBot, "Non ho trovato informazioni utili. Puoi riformulare la domanda?", true);
        }
    } catch (error) {
        console.error("Errore nella richiesta a Gemini:", error);
        return "Si è verificato un errore nel server.";
    }
}


    sendBtn.addEventListener("click", async function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("Tu", userMessage, false);
            userInput.value = "";
            await getBotResponse(userMessage);
        }
    });

    document.getElementById("user-input").addEventListener("input", function () {
        this.style.height = "40px";
        this.style.height = this.scrollHeight + "px";
    });

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });

 // Espandi/chiudi chat
    chatToggleBtn.addEventListener("click", function () {
        chatContainer.classList.toggle("collapsed");
    });

    closeChatBtn.addEventListener("click", function () {
        chatContainer.classList.add("collapsed");
    });

    await loadApiKey();
});

