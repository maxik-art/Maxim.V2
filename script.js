
function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var responseDiv = document.getElementById("response");
    if(userInput.trim() !== "") {
        responseDiv.innerHTML = "<strong>AI:</strong> Thanks for your question! I’ll get back to you soon.";
    } else {
        responseDiv.innerHTML = "<strong>AI:</strong> Please enter a question.";
    }
}
