
function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var responseDiv = document.getElementById("response");
    if(userInput.trim() !== "") {
        responseDiv.innerHTML = "<strong>AI:</strong> Thanks for your question! I’ll get back to you soon.";
    } else {
        responseDiv.innerHTML = "<strong>AI:</strong> Please enter a question.";
    }
}

// Toggle Chatfenster
document.getElementById("chatToggle").addEventListener("click", function() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.classList.toggle("show");
  chatWindow.classList.toggle("hidden");
});
