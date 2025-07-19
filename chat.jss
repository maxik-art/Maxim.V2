(function () {
    function askAssistant() {
        const userInput = document.getElementById("userInput").value;
        const aiResponse = document.getElementById("aiResponse");
        aiResponse.innerHTML = `🤖 (Demo Mode) You asked: '${userInput}'. This is a placeholder response.`;
        document.getElementById("userInput").value = "";
    }

    document.addEventListener("DOMContentLoaded", function () {
        const toggleBtn = document.getElementById("chatToggle");
        const chatWindow = document.getElementById("chatWindow");

        toggleBtn.addEventListener("click", function () {
            chatWindow.classList.toggle("hidden");
        });
    });

    window.askAssistant = askAssistant; // macht die Funktion global erreichbar
})();
