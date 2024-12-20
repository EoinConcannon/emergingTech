// Initialize conversation history
let conversationHistory = "";

// Responses for ELIZA with multiple possible responses
const responses = [
    { pattern: /hello|hi/i, responses: ["Hello! How can I help you today?", "Hi there! What can I do for you?"] },
    { pattern: /i (need|want|feel|am|can't|think|don't) (.*)/i, responses: ["Why do you $1 $2?", "What would it mean to you if you $1 $2?"] },
    { pattern: /because (.*)/i, responses: ["Is that the real reason you think $1?", "What other reasons might there be?"] },
    { pattern: /because (i|i'll|i'm) (.*)/i, responses: ["Is that the real reason you think $2?", "What other reasons might there be?"] },
    { pattern: /why can'?t i (.*)/i, responses: ["Do you think you should be able to $1?", "What would it take for you to $1?"] },
    { pattern: /are you (.*)/i, responses: ["What would it mean to you if I were $1?", "Why do you ask if I am $1?"] },
    { pattern: /what (.*)/i, responses: ["Why do you ask that?", "What do you think?"] },
    { pattern: /how (.*)/i, responses: ["How do you suppose?", "Why do you ask how $1?"] },
    { pattern: /my (.*)/i, responses: ["Your $1?", "Why do you say your $1?"] },
    { pattern: /mother|father|family|parent/i, responses: ["Tell me more about your family.", "How do you feel about your family?"] },
    { pattern: /child(.*)/i, responses: ["Did you have a close relationship with your childhood?", "What was your childhood like?"] },
    { pattern: /friend(.*)/i, responses: ["Do you value your friendships?", "Tell me more about your friends."] },
    { pattern: /sorry/i, responses: ["There’s no need to apologize.", "Why do you feel sorry?"] },
    { pattern: /thank you|thanks/i, responses: ["You're welcome!", "No problem!"] },
    { pattern: /yes/i, responses: ["Can you tell me more?", "Why do you say yes?"] },
    { pattern: /no/i, responses: ["Why not?", "Can you explain why?"] },
    { pattern: /maybe/i, responses: ["Why the uncertainty?", "What makes you unsure?"] },
    { pattern: /is it (.*)/i, responses: ["Do you think it is $1?", "Why do you ask if it is $1?"] },
    { pattern: /it is (.*)/i, responses: ["Why do you think it is $1?", "What makes you say it is $1?"] },
    { pattern: /do you think (.*)/i, responses: ["Why do you ask whether I think $1?", "What do you think about $1?"] },
    { pattern: /do you feel (.*)/i, responses: ["Why do you wonder if I feel $1?", "What makes you ask if I feel $1?"] },
    { pattern: /are you sure/i, responses: ["Why do you ask if I'm sure?", "What makes you doubt?"] },
    { pattern: /you are (.*)/i, responses: ["What makes you think I am $1?", "Why do you say I am $1?"] },
    { pattern: /am i (.*)/i, responses: ["Why do you ask if you are $1?", "What makes you think you are $1?"] },
    { pattern: /you'?re (.*)/i, responses: ["Does it bother you that I am $1?", "Why do you say I am $1?"] },
    { pattern: /everyone (.*)/i, responses: ["Can you think of anyone in particular?", "Why do you say everyone $1?"] },
    { pattern: /always (.*)/i, responses: ["Can you think of a specific time when it was different?", "Why do you say always $1?"] },
    { pattern: /never (.*)/i, responses: ["Why do you think that has never happened?", "Can you think of a time when it did happen?"] },
    { pattern: /love/i, responses: ["Tell me more about your feelings of love.", "Why do you feel love?"] },
    { pattern: /hate/i, responses: ["Why do you feel hate toward that?", "What makes you feel hate?"] },
    { pattern: /angry|mad/i, responses: ["What makes you feel angry?", "Why do you feel angry?"] },
    { pattern: /happy/i, responses: ["What makes you feel happy?", "Why do you feel happy?"] },
    { pattern: /sad/i, responses: ["What makes you feel sad?", "Why do you feel sad?"] },
    { pattern: /tired|exhausted/i, responses: ["Why do you feel tired?", "What makes you feel exhausted?"] },
    { pattern: /this (.*)/i, responses: ["Why does this $1 make you feel that way?", "What about this $1 bothers you?"] },
    { pattern: /this/i, responses: ["Why does this make you feel that way?", "What about this bothers you?"] },
    { pattern: /bye|exit|quit/i, responses: ["Goodbye! Take care!", "See you later!"] },
    { pattern: /.*/i, responses: ["Can you tell me more about that?", "Why do you say that?", "How does that make you feel?"] } // Default response
];

// Send message function
function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    addMessageToHistory("You", userInput);

    const response = getResponse(userInput);
    addMessageToHistory("ELIZA", response);

    document.getElementById("user-input").value = "";
    scrollToBottom();
}

// Pattern-matching for response generation
function getResponse(userText) {
    if (!userText.trim() || userText.match(/^[\W_]+$/)) {
        return "Could you please say something more specific?";
    }
    for (let item of responses) {
        if (item.pattern.test(userText)) {
            const match = userText.match(item.pattern);
            const possibleResponses = item.responses;
            const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
            return response.replace(/\$1/, match[1] || "").replace(/\$2/, match[2] || "");
        }
    }
    return "I'm not sure I understand. Can you clarify?";
}

// Add messages to conversation history
function addMessageToHistory(sender, message) {
    conversationHistory += `${sender}: ${message}\n`;
    document.getElementById("chat-history").innerText = conversationHistory;
    console.log(`${sender}: ${message}`);
}

// Scroll to the bottom of the chat history
function scrollToBottom() {
    const chatHistory = document.getElementById("chat-history");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Tests
function runTests() {
    const testCases = [
        { input: 'hello', expected: /Hello! How can I help you today?|Hi there! What can I do for you?/ },
        { input: 'i need help', expected: /Why do you need help?|What would it mean to you if you need help?/ },
        { input: 'because I can', expected: /Is that the real reason you think I can?|What other reasons might there be?/ },
        { input: '', expected: "Could you please say something more specific?" },
        { input: 'unknown pattern', expected: "I'm not sure I understand. Can you clarify?" }
    ];

    testCases.forEach(testCase => {
        const response = getResponse(testCase.input);
        const result = testCase.expected instanceof RegExp ? testCase.expected.test(response) : response === testCase.expected;
        console.log(`Test input: "${testCase.input}" - ${result ? 'Passed' : 'Failed'}`);
    });

    // Test addMessageToHistory
    addMessageToHistory('You', 'Hello, ELIZA!');
    const chatHistory = document.getElementById('chat-history').innerText;
    console.log(`Test addMessageToHistory - ${chatHistory.includes('You: Hello, ELIZA!') ? 'Passed' : 'Failed'}`);

    // Test scrollToBottom
    const chatHistoryElement = document.getElementById('chat-history');
    scrollToBottom();
    console.log(`Test scrollToBottom - ${chatHistoryElement.scrollTop === chatHistoryElement.scrollHeight ? 'Passed' : 'Failed'}`);
}

// Run tests on page load
document.addEventListener('DOMContentLoaded', runTests);
