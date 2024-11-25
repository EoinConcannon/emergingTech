// Initialize conversation history
let conversationHistory = "";

// Responses for ELIZA
const responses = [
    { pattern: /hello|hi/i, response: "Hello! How can I help you today?" },
    { pattern: /i need (.*)/i, response: "Why do you need $1?" },
    { pattern: /i want (.*)/i, response: "What would it mean to you if you got $1?" },
    { pattern: /i feel (.*)/i, response: "Why do you feel $1?" },
    { pattern: /i am (.*)/i, response: "How long have you been $1?" },
    { pattern: /because (.*)/i, response: "Is that the real reason you think $1?" },
    { pattern: /why can'?t i (.*)/i, response: "Do you think you should be able to $1?" },
    { pattern: /are you (.*)/i, response: "What would it mean to you if I were $1?" },
    { pattern: /what (.*)/i, response: "Why do you ask that?" },
    { pattern: /how (.*)/i, response: "How do you suppose?" },
    { pattern: /my (.*)/i, response: "Your $1?" },
    { pattern: /mother|father|family|parent/i, response: "Tell me more about your family." },
    { pattern: /child(.*)/i, response: "Did you have a close relationship with your childhood?" },
    { pattern: /friend(.*)/i, response: "Do you value your friendships?" },
    { pattern: /sorry/i, response: "There’s no need to apologize." },
    { pattern: /thank you|thanks/i, response: "You're welcome!" },
    { pattern: /yes/i, response: "Can you tell me more?" },
    { pattern: /no/i, response: "Why not?" },
    { pattern: /maybe/i, response: "Why the uncertainty?" },
    { pattern: /i can'?t (.*)/i, response: "What would it take for you to be able to $1?" },
    { pattern: /i'?m (.*)/i, response: "How does being $1 make you feel?" },
    { pattern: /is it (.*)/i, response: "Do you think it is $1?" },
    { pattern: /it is (.*)/i, response: "Why do you think it is $1?" },
    { pattern: /do you think (.*)/i, response: "Why do you ask whether I think $1?" },
    { pattern: /do you feel (.*)/i, response: "Why do you wonder if I feel $1?" },
    { pattern: /are you sure/i, response: "Why do you ask if I'm sure?" },
    { pattern: /you are (.*)/i, response: "What makes you think I am $1?" },
    { pattern: /am i (.*)/i, response: "Why do you ask if you are $1?" },
    { pattern: /you'?re (.*)/i, response: "Does it bother you that I am $1?" },
    { pattern: /i think (.*)/i, response: "Why do you think $1?" },
    { pattern: /i don'?t (.*)/i, response: "Why don’t you $1?" },
    { pattern: /everyone (.*)/i, response: "Can you think of anyone in particular?" },
    { pattern: /always (.*)/i, response: "Can you think of a specific time when it was different?" },
    { pattern: /never (.*)/i, response: "Why do you think that has never happened?" },
    { pattern: /love/i, response: "Tell me more about your feelings of love." },
    { pattern: /hate/i, response: "Why do you feel hate toward that?" },
    { pattern: /angry|mad/i, response: "What makes you feel angry?" },
    { pattern: /happy/i, response: "What makes you feel happy?" },
    { pattern: /sad/i, response: "What makes you feel sad?" },
    { pattern: /tired|exhausted/i, response: "Why do you feel tired?" },
    { pattern: /bye|exit|quit/i, response: "Goodbye! Take care!" },
    { pattern: /.*/i, response: "Can you tell me more about that?" } // Default response
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
            const match = userText.match(item.pattern);
            // Use captured group or fallback to a simpler response
            return item.response.replace(/\$1/, match[1] || "");
        }
    }
    return "I'm not sure I understand. Can you clarify?";
}

// Add messages to conversation history
function addMessageToHistory(sender, message) {
    conversationHistory += `<p><strong>${sender}:</strong> ${message}</p>`;
    document.getElementById("chat-history").innerHTML = conversationHistory;
}