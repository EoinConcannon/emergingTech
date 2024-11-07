// Initialize conversation history
let conversationHistory = "";

// Basic pattern-matching responses
const responses = [
    { pattern: /hello/i, response: "Hello! How can I help you today?" },
    { pattern: /i need (.*)/i, response: "Why do you need $1?" },
    { pattern: /i feel (.*)/i, response: "Why do you feel $1?" },
    { pattern: /bye|exit/i, response: "Goodbye! Take care!" },
    { pattern: /.*(.*)/i, response: "Can you tell me more about that?" } // Default response
];

// Send message function
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessageToHistory("You", userInput);

    const response = getResponse(userInput);
    addMessageToHistory("ELIZA", response);

    document.getElementById("user-input").value = "";
}

// Pattern-matching for response generation
function getResponse(userText) {
    for (let item of responses) {
        if (item.pattern.test(userText)) {
            return item.response.replace(/\$1/, userText.match(item.pattern)[1] || "");
        }
    }
}

// Add messages to conversation history
function addMessageToHistory(sender, message) {
    conversationHistory += `<p><strong>${sender}:</strong> ${message}</p>`;
    document.getElementById("chat-history").innerHTML = conversationHistory;
}
