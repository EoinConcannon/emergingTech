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
    - 3.1 [GitHub Pages Link](https://eoinconcannon.github.io/emergingTech/eliza/)


## Module Overview
This module introduces methods for identifying and implementing emerging technologies. The assessment consists of two major components:
- Tasks: Focused on building a trigram-based language model and analyzing generated text.
- Project: A client-side implementation of the ELIZA chatbot, deployed to GitHub Pages.

## Tasks
### Task One
In task one, I was tasked with getting five books from Gutenberg.org, a digital library offering free old eBooks. These books serve as the groundwork for our language model. This is probably the most important/interesting requirement of the tasks as depending on what you chose can have an influence on the type of words that are generated. For example, I chose Friedrich Nietzsche's book "Beyond Good and Evil" (published in 1886) and Miguel de Cervantes's book "Don Quixote" (published in 1605), my choosing of these books will show influences of German and Spanish, however I can see rare letters in English like `x` appearing more often as a result.

Once I got my five books, I had to process each book by removing unwanted characters and sections. First, I converted all characters in the book to uppercase using `.upper()`. I then had to remove all unwanted characters (characters that are not ASCII letters, fullstops and spaces)  Lastly, I split the text using `mainText = text.split('***')`, which splits the text creating a list where lines containing `***` will create a new list item with. Gutenberg uses `***` to indicate where the original contents of the book begin and end. This means that split will create a list containing three items, the second item is the one that I will be using, `mainText[2]`.

I created a trigram model by combining all processed texts.

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

        # Split the text to remove preamble and postamble
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

### Task Two
In task two, I had to use the trigram model I created in the previous task to generate a 10,000 character string that would represent a fake language.

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
In task three, I had to take the fake language I generated in the previous task and compare it to real English words in the `words.txt` file. I got chatGPT to generate this for me. It took the `words.txt` file and put its contents into a set called `words`, the set at this stage contains a single large string that was the contents of `words.txt`. Then the command `.split()` was used to split this string into individual words. This set was then compared to the fake language I generated and a precentage of how similar it was to English is displayed. Each time you rerun the entire `trigrams.ipynb` the percentage of accuracy will change as the language is being regenerated every time. My language model seems to have a conist percentage of around 35%-40% which I found suprising with how old my books were and also two of them being translated books from other languages.
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
The project for this module is to create an ELIZA chatbot and to deploy it using Github Actions.
This project will be made using HTML, CSS for a user interface. JavaScript and/or WebAssembly for the chatbot logic.

I got chatGPT to generate the user interface

I chose to use JavaScript over WebAssembly as JavaScript is usually the 2nd best for chatbot creation behind Python.

I made ELIZA's response immediate as it is similar to how the original ELIZA works.

### Github Pages Link: https://eoinconcannon.github.io/emergingTech/eliza/
Here is the link to my GitHub pages, specifically to the ELIZA chatbot.
