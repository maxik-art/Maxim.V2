// chat.js – Saubere Version mit Chatverlauf & Close-Funktion

let chatHistory = []; // Speichert den Verlauf im RAM

// Beim Laden der Seite: Prüfe ob Verlauf in localStorage existiert
window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory'));
    if (savedHistory && Array.isArray(savedHistory)) {
        chatHistory = savedHistory;
        updateChatWindow();
    }
});

// Öffne/Schließe das Chatfenster
document.getElementById('chatToggle').addEventListener('click', () => {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('hidden');
});

// Schließe-Button im Chat
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('chatWindow').classList.add('hidden');
});

// Sende Nachricht an Backend & zeige Verlauf
function askAssistant() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return; // Nichts tun bei leerem Input

    // Speichere und zeige Nutzereingabe
    addMessage('user', userInput);
    updateChatWindow();

    // API-Call an Flask-Backend
    fetch('/ask', {
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
        console.error('Error:', error);
        addMessage('ai', 'Sorry, something went wrong.');
        updateChatWindow();
    });

    document.getElementById('userInput').value = ''; // Inputfeld leeren
}

// Füge eine Nachricht zum Verlauf hinzu
function addMessage(sender, message) {
    chatHistory.push({ sender, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory)); // Speichern im Browser
}

// Aktualisiere das Chatfenster mit dem kompletten Verlauf
function updateChatWindow() {
    const responseDiv = document.getElementById('aiResponse');
    responseDiv.innerHTML = ''; // Lösche vorherigen Inhalt

    chatHistory.forEach(entry => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', entry.sender);
        messageDiv.textContent = `${entry.sender === 'user' ? 'You' : 'Maxik.ai'}: ${entry.message}`;
        responseDiv.appendChild(messageDiv);
    });

    // Automatisch zum letzten Eintrag scrollen
    responseDiv.scrollTop = responseDiv.scrollHeight;
}
