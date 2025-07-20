// chat.js – Saubere Version mit Chatverlauf & Close-Funktion

// ✅ Setze hier die URL deines Backends auf Render ein
const API_URL = "https://ai-website-with-assistant.onrender.com"/ask; // Ersetze durch deine echte Render-URL

let chatHistory = []; // Speichert den Verlauf im RAM

// 🏡 Prüfe beim Laden der Seite, ob ein Verlauf in localStorage existiert
window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory'));
    if (savedHistory && Array.isArray(savedHistory)) {
        chatHistory = savedHistory;
        updateChatWindow();
    }
});

// 📌 Öffne oder schließe das Chatfenster per Klick
document.getElementById('chatToggle').addEventListener('click', () => {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('hidden');
});

// 📌 Schließe-Button im Chatfenster
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('chatWindow').classList.add('hidden');
});

// 🧠 Sende Nachricht an das Flask-Backend und zeige Verlauf
function askAssistant() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return; // Nicht senden, wenn Eingabe leer

    // Zeige Nutzereingabe im Chatfenster
    addMessage('user', userInput);
    updateChatWindow();

    // API-Call an Flask-Backend
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        addMessage('ai', data.answer);
        updateChatWindow();
    })
    .catch(error => {
        console.error('❌ API Error:', error);
        addMessage('ai', '❌ Sorry, the server is not responding.');
        updateChatWindow();
    });

    document.getElementById('userInput').value = ''; // Eingabefeld leeren
}

// 📌 Füge eine Nachricht zum Verlauf hinzu
function addMessage(sender, message) {
    chatHistory.push({ sender, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory)); // Verlauf im Browser speichern
}

// 📌 Aktualisiere das Chatfenster mit dem kompletten Verlauf
function updateChatWindow() {
    const responseDiv = document.getElementById('aiResponse');
    responseDiv.innerHTML = ''; // Vorherigen Inhalt löschen

    chatHistory.forEach(entry => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', entry.sender);
        messageDiv.textContent = `${entry.sender === 'user' ? 'You' : 'Maxik.ai'}: ${entry.message}`;
        responseDiv.appendChild(messageDiv);
    });

    // Automatisch zum letzten Eintrag scrollen
    responseDiv.scrollTop = responseDiv.scrollHeight;
}
