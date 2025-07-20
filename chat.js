// API-URL für den Chat
const API_URL = "https://ai-website-with-assistant.onrender.com/ask";

// Funktion zum Ein-/Ausblenden des Chat-Fensters
function toggleChat() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.classList.toggle("show");
}

// Event-Listener für den Roboter-Button
document.getElementById("chatToggle").addEventListener("click", toggleChat);

// Funktion für das Senden einer Nachricht an den AI-Assistenten
async function askAssistant() {
    const userInput = document.getElementById("userInput").value;
    const aiResponse = document.getElementById("aiResponse");
    aiResponse.textContent = "⏳ Thinking...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        aiResponse.textContent = data.reply || "🤖 No response from AI.";
    } catch (error) {
        console.error("Error communicating with AI:", error);
        aiResponse.textContent = "❌ Error communicating with AI.";
    }
}
