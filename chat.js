document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("chatToggle");
    const closeBtn = document.getElementById("closeBtn");
    const chatWindow = document.getElementById("chatWindow");
    const userInputField = document.getElementById("userInput");
    const aiResponse = document.getElementById("aiResponse");

    // Funktion zum Senden der Anfrage und Anzeigen der Antwort
    function askAssistant() {
        const userInput = userInputField.value.trim();
        if (userInput === "") return; // Keine leeren Eingaben verarbeiten

        aiResponse.innerHTML += `
            <p><strong>You:</strong> ${userInput}</p>
            <p>🤖 (Demo Mode) AI says: This is a placeholder response.</p>
        `;
        userInputField.value = "";
        aiResponse.scrollTop = aiResponse.scrollHeight; // Scroll nach unten
    }

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
