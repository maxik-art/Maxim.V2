// Warten bis DOM geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");

    // Toggle Chatfenster ein-/ausblenden
    toggleBtn.addEventListener("click", function () {
        chatWindow.classList.toggle("hidden");
    });
});

// Funktion zum Senden an Backend
function askAssistant() {
    const userInput = document.getElementById("userInput").value;
    const aiResponse = document.getElementById("aiResponse");

    fetch("https://ai-website-with-assistant.onrender.com/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        aiResponse.innerHTML = `🤖 ${data.answer}`;
    })
    .catch(error => {
        aiResponse.innerHTML = "❌ Error contacting AI Assistant.";
        console.error(error);
    });

    document.getElementById("userInput").value = "";
}
