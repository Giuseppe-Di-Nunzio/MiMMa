# MiMMA - Assistente Digitale per l'Ufficio Scolastico Regionale della Puglia



Questo repository contiene il codice JavaScript e gli script PHP correlati per implementare **MiMMA**, un assistente digitale progettato specificamente per l'Ufficio Scolastico Regionale per la Puglia. MiMMA è in grado di rispondere a domande relative ad avvisi, decreti e bandi di concorso per il reclutamento emessi dal Ministero dell'Istruzione e dall'Ufficio Scolastico Regionale, dando priorità alle informazioni più recenti.


## Funzionalità Principali

* **Interfaccia Chat Interattiva:** Un'interfaccia utente intuitiva per interagire con l'assistente digitale direttamente sulla pagina web.
* **Recupero Dinamico della Chiave API:** Lo script JavaScript recupera dinamicamente una chiave API da un endpoint PHP sicuro.
* **Integrazione con Gemini 1.5 Flash:** Utilizza il modello linguistico Gemini 1.5 Flash di Google per comprendere le domande degli utenti e generare risposte pertinenti.
* **Ricerca Integrata nel Sito Web:** Prima di rispondere, MiMMA cerca informazioni rilevanti all'interno del sito web tramite uno script PHP dedicato.
* **Gestione della Cronologia della Chat:** La conversazione viene salvata temporaneamente nella sessione del browser per una migliore esperienza utente.
* **Formattazione delle Risposte:** Le risposte del bot sono formattate per una migliore leggibilità, supportando il testo in grassetto e gli elenchi puntati.
* **Minimizzazione/Chiusura della Chat:** Gli utenti possono facilmente minimizzare o chiudere la finestra della chat.
* **Adattamento Dinamico dell'Input Utente:** L'area di input dell'utente si espande automaticamente in base al testo inserito.

## File Contenuti

* `script.js`: Contiene la logica principale dell'applicazione chatbot in JavaScript, inclusa la gestione dell'interfaccia utente, le chiamate API e l'elaborazione delle risposte.
* `get-api-key.php`: Uno script PHP responsabile della fornitura sicura della chiave API necessaria per comunicare con il modello linguistico Gemini. **Importante:** Questo script dovrebbe essere configurato correttamente per proteggere la tua chiave API.
* `search-wp.php`: Uno script PHP che riceve una query e cerca contenuti pertinenti all'interno del database di WordPress. Restituisce i risultati in formato JSON.
* `footer.php`: Un file PHP (presumibilmente parte del tema WordPress) in cui lo script JavaScript e potenzialmente la struttura HTML della chat vengono inclusi.

## Installazione

Per integrare MiMMA nel tuo sito web WordPress, segui questi passaggi:

1.  **Clona o scarica questo repository** nella directory del tuo tema WordPress (`/wp-content/themes/YOUR_THEME/`).
2.  **Posiziona i file PHP** (`get-api-key.php` e `search-wp.php`) nella directory principale del tuo tema WordPress (`/wp-content/themes/YOUR_THEME/`). Assicurati che il tuo server web abbia i permessi di lettura per questi file.
3.  **Incorpora lo snippet in php nel footer.php del tuo tema WordPress (`/wp-content/themes/YOUR_THEME/`).
4.  **Assicurati che gli ID degli elementi HTML** nel tuo tema WordPress corrispondano a quelli utilizzati nello script JavaScript (`chat-box`, `user-input`, `send-btn`, `chat-container`, `chat-toggle-btn`, `close-chat`). Potrebbe essere necessario modificare il tuo tema o lo script JavaScript per farli corrispondere.
5.  **Crea un file credential.json nella directory (`/wp-content/themes/YOUR_THEME/`). Esempio:
         ```json
        {"apiKey": "YOUR_ACTUAL_API_KEY"}
        ```


## Utilizzo

Una volta installato e configurato correttamente, la finestra della chat di MiMMA dovrebbe essere visibile sul tuo sito web.

1.  **Apri la Chat:** Clicca sul pulsante di toggle della chat (identificato da `chatToggleBtn`) per espandere la finestra della chat. 
         ![image](https://github.com/user-attachments/assets/68a2e3f5-3b85-4f62-b5b5-723d76fefbac)
2.  **Digita la tua Domanda:** Inserisci la tua domanda relativa ad avvisi, decreti o bandi di concorso nella casella di input (identificata da `user-input`).
         ![image](https://github.com/user-attachments/assets/bda4c0e2-288e-4650-83d9-da03aae4db5c)
3.  **Invia la Domanda:** Clicca sul pulsante di invio (identificato da `send-btn`) o premi il tasto `Invio`.
4.  **Leggi la Risposta:** La risposta di MiMMA apparirà nella finestra della chat (identificata da `chat-box`).
         ![image](https://github.com/user-attachments/assets/1a204766-2350-4475-84cf-411be12bc410)
5.  **Chiudi la Chat:** Clicca sul pulsante di chiusura (identificato da `close-chat`) per minimizzare la finestra della chat.

MiMMA cercherà di comprendere la tua domanda, cercare informazioni rilevanti sul sito web e fornirti una risposta basata sulle informazioni disponibili e sulla sua conoscenza.



