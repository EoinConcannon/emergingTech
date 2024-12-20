# emergingTech
- Required repository for "Emerging Technologies" course.
- Notes and Assessment page here: https://github.com/ianmcloughlin/2425_emerging_technologies

## Table of Contents
1. [Module Overview](#module-overview)
2. [Tasks](#tasks)
    - 2.1 [Task One](#task-one)
    - 2.2 [Task Two](#task-two)
    - 2.3 [Task Three](#task-three)
    - 2.4 [Task Four](#task-four)
3. [Project](#project)
    - 3.1 [User Interface](#user-interface)
    - 3.2 [Technology Choice](#technology-choice)
    - 3.3 [ELIZA Chatbot Logic](#eliza-chatbot-logic)
    - 3.4 [Testing](#testing)
    - 3.5 [Deployment](#deployment)
    - 3.6 [How to Use](#how-to-use)
    - 3.7 [GitHub Pages Link](#github-pages-link)
4. [Conclusion](#conclusion)


## Module Overview
This module introduces methods for identifying and implementing emerging technologies. The assessment consists of two major components:
- Tasks: Focused on building a trigram-based language model and analyzing generated text.
- Project: A client-side implementation of the ELIZA chatbot, deployed to GitHub Pages.

## Tasks
### Task One
In task one, I was tasked with getting five books from Gutenberg.org, a digital library offering free old eBooks. These books serve as the groundwork for our language model. This is probably the most important/interesting requirement of the tasks as depending on what you chose can have an influence on the type of words that are generated. For example, I chose Friedrich Nietzsche's book "Beyond Good and Evil" (published in 1886) and Miguel de Cervantes's book "Don Quixote" (published in 1605), my choosing of these books will show influences of German and Spanish, however I can see rare letters in English like `x` appearing more often as a result.

Once I got my five books, I had to process each book by removing unwanted characters and sections. First, I converted all characters in the book to uppercase using `.upper()`. I then had to remove all unwanted characters (characters that are not ASCII letters, full stops and spaces). Lastly, I split the text using `mainText = text.split('***')`, which splits the text creating a list where lines containing `***` will create a new list item. Gutenberg uses `***` to indicate where the original contents of the book begin and end. This means that the split will create a list containing three items, the second item is the one that I will be using, `mainText[2]`.

After cleaning the text, I created a trigram model by combining all processed texts. A trigram is a sequence of three consecutive characters extracted from the text. By analyzing the frequency of each trigram, I was able to build a model that captures the patterns and structures of the language used in the books. This model serves as the foundation for generating new text that mimics the style and vocabulary of the original books.

The following Python code snippet demonstrates the process of reading, cleaning, and creating the trigram model from the selected books:

```python
import collections

# List of file paths with author, book name, and date
file_paths = [
    'books/alice.txt',              # Lewis Carroll, Alice's Adventures in Wonderland, 1865
    'books/beyond_good_evil.txt',   # Friedrich Nietzsche, Beyond Good and Evil, 1886
    'books/dracula.txt',            # Bram Stoker, Dracula, 1897
    'books/quixote.txt',            # Miguel de Cervantes, Don Quixote, 1605
    'books/yellow_king.txt'         # Robert W. Chambers, The King in Yellow, 1895
]

finalText = ""

# Read and process each file in file_paths list
for file_path in file_paths:
    with open(file_path, 'r') as file:
        text = file.read()

        # Convert text to uppercase
        text = text.upper()

        # Split the text to remove Gutenberg intro and outro
        mainText = text.split('***')

        # Define the characters we want to keep
        values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ. '

        # Remove characters that are not in the values variable
        cleanText = ''.join(c for c in mainText[2] if c in values)

        # Add processed text to finalText
        finalText += cleanText

# Create trigrams from the finalText
trigrams = [finalText[i:i+3] for i in range(len(finalText) - 2)]

# Count the frequency of each trigram
counts = collections.Counter(trigrams)

# Sort the trigrams by frequency in descending order
sorted_counts = sorted(counts.items(), key=lambda x: x[1], reverse=True)

# Show sorted trigrams
for string, count in sorted_counts:
    print(f"'{string}': {count}")
```

This code reads the text from each book, converts it to uppercase, removes unwanted characters, and splits the text to isolate the main content. It then creates trigrams from the cleaned text and counts their frequency. The resulting trigram model is sorted by frequency, providing a basis for further analysis and text generation in subsequent tasks.

### Task Two
In task two, I had to use the trigram model I created in the previous task to generate a 10,000 character string that would represent a fake language. This task involved leveraging the trigram frequencies to produce a coherent sequence of characters that mimics the style and structure of the original texts.

The process began by initializing the generated string with a starting sequence, specifically "TH". From there, each subsequent character was determined based on the preceding two characters. By examining the trigram model, I identified all possible trigrams that began with the last two characters of the current string. The third character of these trigrams was then selected probabilistically, with the likelihood of each character being chosen proportional to its frequency in the model.

This method ensured that the generated text maintained the statistical properties of the original texts, resulting in a string that, while nonsensical, exhibited patterns and structures reminiscent of the source material. The final output was a 10,000 character string that served as a synthetic representation of the language model derived from the selected books.

#### Steps to Generate the 10,000 Character String

1. **Initialize the Starting String:**
   - The generated string must start with "TH" as per the requirement.

2. **Generate Each Next Character:**
   - For each subsequent character, look at the previous two characters.
   - Find all trigrams in the model that start with those two characters.
   - Randomly select one of the third letters of those trigrams, using the counts as weights.

3. **Repeat Until the String is 10,000 Characters Long:**
   - Continue generating characters until the string reaches the desired length.

#### Code Implementation

Here is the code used to generate the 10,000 character string:

```python
import random

# Variables for generating our language model
chars = counts.keys()
weight = counts.values()

# Initialize the starting string
result = "TH"

# Generate characters until the string is 10,000 characters long
while len(result) < 10000:
    # Get the last two characters from the current result
    prefix = result[-2:]
    
    # Find all trigrams starting with this prefix
    candidates = [(trigram[2], counts[trigram]) for trigram in chars if trigram.startswith(prefix)]
    
    # If no candidates are found, break out of the loop
    if not candidates:
        break
    
    # Separate possible next characters and their corresponding weights
    next_chars, weights = zip(*candidates)
    
    # Select the next character based on the weights
    next_char = random.choices(next_chars, weights=weights, k=1)[0]
    
    # Append the chosen character to the result
    result += next_char

# Print the generated text and check its length
print(result)
print(len(result))  # Should be 10,000 characters
```

### Task Three
In task three, I had to take the fake language I generated in the previous task and compare it to real English words in the `words.txt` file. I got chatGPT to generate this for me. It took the `words.txt` file and put its contents into a set called `words`, the set at this stage contains a single large string that was the contents of `words.txt`. Then the command `.split()` was used to split this string into individual words. This set was then compared to the fake language I generated and a precentage of how similar it was to English is displayed. Each time you rerun the entire `trigrams.ipynb` the percentage of accuracy will change as the language is being regenerated every time. My language model seems to have a consistent percentage of around 35%-40% which I found surprising with how old my chosen books were and also two of them being translated books from other languages.
### Steps to Compare Generated Text to Real English Words

1. **Load the List of Real English Words:**
   - Read the `words.txt` file and load the words into a set for quick lookup.

2. **Split the Generated Text into Words:**
   - Split the generated text into individual words.

3. **Count Valid English Words:**
   - Compare each word in the generated text to the set of real English words.
   - Count how many of the generated words are valid English words.

4. **Calculate the Percentage of Valid English Words:**
   - Calculate the percentage of valid English words in the generated text.

### Code Implementation

Here is the code used to compare the generated text to real English words:

```python
# Load the list of real English words
def load_words(file_path):
    with open(file_path, 'r') as file:
        words = {line.strip().upper() for line in file}  # Convert to set and uppercase
    return words

# Split the generated text into words
def split_into_words(text):
    return text.split()

# Count valid English words in the generated text
def count_valid_words(generated_text, valid_words):
    words = split_into_words(generated_text)
    valid_word_count = sum(1 for word in words if word in valid_words)
    return valid_word_count, len(words)  # Return valid count and total count

# Calculate the percentage of valid English words
def calculate_percentage(valid_count, total_count):
    if total_count == 0:
        return 0  # Prevent division by zero
    return (valid_count / total_count) * 100

# Load the words from the provided file
valid_words = load_words('words.txt')

# Assume 'result' contains your generated text (10,000 characters)
# Count valid words in the generated text
valid_count, total_count = count_valid_words(result, valid_words)

# Calculate the percentage of valid words
percentage_valid = calculate_percentage(valid_count, total_count)

# Print the results
print(f"Total words: {total_count}")
print(f"Valid English words: {valid_count}")
print(f"Percentage of valid English words: {percentage_valid:.2f}%")
```

### Task Four
The final task required me to export my language model to a JSON file. To do this, I added the JSON import to the top of `trigrams.ipynb`. I exported my language model to a dictionary, as the creation of a dictionary is necessary for using anything related to JSON in Python. I first used the JSON import's `.dump` to simply add the language model dictionary to JSON and used the `.dump` command on it.

### Steps to Export the Language Model to JSON

1. **Import the JSON module:**
   - At the beginning of the notebook, import the JSON module to handle JSON operations.

2. **Convert the Trigram Model to a Dictionary:**
   - Convert the trigram model (which is a `Counter` object) to a dictionary.

3. **Export the Dictionary to a JSON File:**
   - Use the `json.dump` method to write the dictionary to a JSON file.

### Code Implementation

Here is the code used to export the language model to a JSON file:

```python
import json

# Convert the trigram model to a dictionary
trigram_dict = dict(counts)

# Export the dictionary to a JSON file
with open('trigrams.json', 'w') as trigram_json:
    json.dump(trigram_dict, trigram_json)
```

However, this only provides the following when printed:
```
<_io.TextIOWrapper name='trigrams.json' mode='w' encoding='UTF-8'>
```
This output shows that the file object has been created and was opened in write mode, but it does not confirm that the data has been written to the file. To ensure that the trigram model is correctly exported to the JSON file, I will verify the contents of the file after the `json.dump` command by reading the file back and printing its contents:

```python
import json

# Convert the trigram model to a dictionary
trigram_dict = dict(counts)

# Export the dictionary to a JSON file
with open('trigrams.json', 'w') as trigram_json:
    json.dump(trigram_dict, trigram_json)

# Verify the contents of the JSON file
with open('trigrams.json', 'r') as trigram_json:
    data = json.load(trigram_json)
    print(data)
```

This additional step ensures that the data has been correctly written to the JSON file and allows you to inspect the contents for accuracy. I have successfully exported the language model to JSON.

## Project
The project for this module is to create an ELIZA chatbot and to deploy it using GitHub Actions. This project is built using HTML and CSS for the user interface, and JavaScript for the chatbot logic. The project was to also be deployed using GitHub Actions.

For my ELIZA chatbot, after commit [`4ebda87`](https://github.com/eoinconcannon/emergingTech/commit/4ebda87ebb0e479066c7a2fafc34982a27431ab3) and researching videos on ELIZA such as this clip I found from an old 1983 TV show talking about ELIZA: [YouTube link](https://www.youtube.com/watch?v=4sngIh0YJ

I decided to make it somewhat replicate the original style of ELIZA such as the dark colour scheme of the terminal, the instant response from ELIZA, reflecting questions back at the user, etc..

### User Interface
I used ChatGPT to help generate the user interface. The goal was to make the interface resemble a traditional ELIZA chatbot interface, which typically features a simple, text-based interaction style. The interface includes:
- A chat history area where the conversation between the user and ELIZA is displayed.
- An input field where the user can type their messages.
- A "Send" button to submit the user's messages.
- ELIZA immediately sends the user a response like it traditionally does, unlike modern chatbots which try to replicate user typing.

### Technology Choice
I chose to use JavaScript over WebAssembly for the chatbot logic. JavaScript is a versatile and widely-used language for web development, making it a suitable choice for this project. While Python is often considered the best language for chatbot creation due to its extensive libraries and frameworks, JavaScript is a strong alternative, especially for client-side applications.

### ELIZA Chatbot Logic
I designed ELIZA's responses to be immediate, mimicking the behavior of the original ELIZA chatbot. This ensures a smooth and responsive user experience, as users receive instant feedback to their inputs.

All ELIZA chatbot logic is implemented using JavaScript `eliza.js`. The chatbot uses pattern matching to identify user inputs and respond accordingly, This was my first time using pattern matching in JavaScript and I found it both interesting and useful as it helped me cut down a lot of work for the chatbot logic, it reminds me of the switch statement in Java. The responses are designed to mimic the behavior of the original ELIZA chatbot, which often reflected the user's statements back at them in the form of questions.

Here is an example of how I used pattern matching:

```eliza.js
// Responses for ELIZA with multiple possible responses
const responses = [
    { pattern: /hello|hi/i, responses: ["Hello! How can I help you today?", "Hi there! What can I do for you?"] },
    { pattern: /i (need|want|feel|am|can't|think|don't) (.*)/i, responses: ["Why do you $1 $2?", "What would it mean to you if you $1 $2?"] },
    { pattern: /because (.*)/i, responses: ["Is that the real reason you think $1?", "What other reasons might there be?"] },
    { pattern: /because (i|i'll|i'm) (.*)/i, responses: ["Is that the real reason you think $2?", "What other reasons might there be?"] },
    { pattern: /why can'?t i (.*)/i, responses: ["Do you think you should be able to $1?", "What would it take for you to $1?"] },
    { pattern: /what (.*)/i, responses: ["Why do you ask that?", "What do you think?"] },
    { pattern: /how (.*)/i, responses: ["How do you suppose?", "Why do you ask how $1?"] },
    { pattern: /thank you|thanks/i, responses: ["You're welcome!", "No problem!"] },
    { pattern: /yes/i, responses: ["Can you tell me more?", "Why do you say yes?"] },
    { pattern: /no/i, responses: ["Why not?", "Can you explain why?"] },
    { pattern: /am i (.*)/i, responses: ["Why do you ask if you are $1?", "What makes you think you are $1?"] },
    { pattern: /angry|mad/i, responses: ["What makes you feel angry?", "Why do you feel angry?"] },
    { pattern: /this (.*)/i, responses: ["Why does this $1 make you feel that way?", "What about this $1 bothers you?"] },
    { pattern: /this/i, responses: ["Why does this make you feel that way?", "What about this bothers you?"] },
    { pattern: /bye|exit|quit/i, responses: ["Goodbye! Take care!", "See you later!"] },
    { pattern: /.*/i, responses: ["Can you tell me more about that?", "Why do you say that?", "How does that make you feel?"] } // Default response
];
```

### Testing
For testing, I created tests directly in the same JavaScript file where the ELIZA chatbot functionality is implemented. These tests are executed when the page loads, and the results are logged to the console. This approach allows for quick and easy verification of the chatbot's behavior without the need for an external testing framework.

### Deployment
I am deploying ELIZA using GitHub Actions as this is a basic ELIZA chatbot that doesn't require any external dependencies. I found GitHub Pages quite useful as it simplified the deployment process. It made my ELIZA chatbot easily accessible to users who just need to click on a link to access it.

Additionally, I have included a `demo.yaml` file in the repository to demonstrate the basic capabilities of GitHub Actions. This file showcases how to set up and run a simple workflow that checks out the repository code and lists the files in the repository.

GitHub Actions documentation: [GitHub Actions documentation](https://docs.github.com/en/actions).

### How to Use
1. **Open the Chatbot:**
   - Navigate to the [GitHub Pages link](https://eoinconcannon.github.io/emergingTech/eliza/) to access the ELIZA chatbot.

2. **Start a Conversation:**
   - Type your message in the input field and click the "Send" button or press the Enter key to submit your message.

3. **View Responses:**
   - ELIZA's responses will appear immediately in the chat history area.

### Github Pages Link: https://eoinconcannon.github.io/emergingTech/eliza/
Here is the link to my GitHub pages, specifically to the ELIZA chatbot.

## Conclusion
Throughout this assignment, I have explored various aspects of language modeling and chatbot development. By working through the tasks, I gained hands-on experience in text processing, trigram model creation, synthetic text generation, and comparing said synthetic text with real English words. Additionally, I successfully implemented and deployed an ELIZA chatbot using JavaScript, HTML, and CSS, and used GitHub Actions for continuous deployment.

This assignment has not only enhanced my understanding of natural language processing techniques but also provided valuable insights into the practical challenges of building and deploying a chatbot. I also learned more about GitHub Actions and other GitHub features through both from this assignment and the lectures.

Thank you for taking the time to review my work. I hope you find the insights and implementations presented here both informative and engaging.