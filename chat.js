document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("chatToggle");
    const closeBtn = document.getElementById("closeBtn");
    const chatWindow = document.getElementById("chatWindow");
    const userInputField = document.getElementById("userInput");
    const aiResponse = document.getElementById("aiResponse");

    // Funktion zum Senden der Anfrage und Anzeigen der Antwort
    function askAssistant() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return; // Keine leeren Nachrichten

    // Zeige Nutzereingabe
    chatHistory.push({ sender: 'user', message: userInput });
    updateChatWindow();

    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatHistory.push({ sender: 'ai', message: data.answer });
        updateChatWindow();
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('userInput').value = '';
}
        
        let chatHistory = []; // Hier speichern wir den Verlauf
    
    // Toggle Chatfenster (öffnen/schließen)
    toggleBtn.addEventListener("click", function () {
        chatWindow.classList.toggle("hidden");
    });

    // Fenster schließen
    closeBtn.addEventListener("click", function () {
        chatWindow.classList.add("hidden");

        // Verlauf löschen (optional)
        // aiResponse.innerHTML = ""; // Kommentar entfernen, wenn du Verlauf löschen willst
    });

    // Globale Verfügbarkeit der askAssistant-Funktion für Button im HTML
    window.askAssistant = askAssistant;
});

function updateChatWindow() {
    const responseDiv = document.getElementById('aiResponse');
    responseDiv.innerHTML = ''; // Vorherige Inhalte löschen

    chatHistory.forEach(entry => {
        const p = document.createElement('p');
        p.textContent = `${entry.sender === 'user' ? 'You' : 'Maxik.ai'}: ${entry.message}`;
        responseDiv.appendChild(p);
    });
}
