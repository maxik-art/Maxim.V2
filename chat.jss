function askAssistant() {
  const userInput = document.getElementById("userInput").value;
  const aiResponse = document.getElementById("aiResponse");

  aiResponse.innerHTML = `🤖 (Demo Mode) You asked: '${userInput}'. This is a placeholder response.`;
  document.getElementById("userInput").value = "";
}
