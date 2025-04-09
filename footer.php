<script src="https://cdn.jsdelivr.net/npm/@google-cloud/vertex-ai@latest/build/index.js"></script>
<div id="chat-toggle-btn">💬</div>
<div id="chat-container" class="collapsed">
    <div id="chat-header">
        <span>MiMMA - Assistente Digitale</span>
        <button id="close-chat">✖</button>
    </div>
    <div id="chat-box">
        <div class="bot-message">👋 Ciao! Sono MiMMA. Come posso aiutarti oggi?</div>
    </div>
    <div id="chat-input-container">
        <textarea id="user-input" placeholder="Scrivi un messaggio..." rows="2"></textarea>
        <button id="send-btn">Invia</button>
    </div>
</div>
