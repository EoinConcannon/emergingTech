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

### Task Two
In task two, I had to use the trigram model I created in the previous task to generate a 10,000 character string that would represent a fake language.

### Task Three
In task three, I had to take the fake language I generated in the previous task and compare it to real English words in the `words.txt` file.

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
This output indicates that the file object has been created and opened in write mode, but it does not confirm that the data has been written to the file. To ensure that the trigram model is correctly exported to the JSON file, you should verify the contents of the file after the `json.dump` operation. You can do this by reading the file back and printing its contents:

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

This additional step ensures that the data has been correctly written to the JSON file and allows you to inspect the contents for accuracy. We successfully exported the language model to JSON.

## Project
The project for this module is to create an ELIZA chatbot and to deploy it using Github Actions.
This project will be made using HTML, CSS for a user interface. JavaScript and/or WebAssembly for the chatbot logic.

I got chatGPT to generate the user interface

I chose to use JavaScript over WebAssembly as JavaScript is usually the 2nd best for chatbot creation behind Python.

I made ELIZA's response immediate as it is similar to how the original ELIZA works.

### Github Pages Link: https://eoinconcannon.github.io/emergingTech/eliza/
Here is the link to my GitHub pages, specifically to the ELIZA chatbot.
