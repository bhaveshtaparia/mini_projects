import csv
import difflib  # Library for text similarity

# Load your dataset from a CSV file
def load_dataset(csv_file):
    dataset = []
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            dataset.append(row)
    return dataset

# Define the name of the CSV file
csv_file = "chat.csv"

# Load the dataset
dataset = load_dataset(csv_file)

# Define a default response
default_response = "I'm sorry, I don't understand. Can you please rephrase your question or choose from the following options:\n1. Tell me a joke\n2. What's the weather like today\n3. Goodbye"

# Define a similarity threshold (adjust as needed)
similarity_threshold = 0.6

# Function to find the most similar response
def find_similar_response(user_input, dataset):
    max_similarity = 0
    best_response = default_response
    for entry in dataset:
        similarity = difflib.SequenceMatcher(None, user_input, entry['User_Message']).ratio()
        if similarity > max_similarity and similarity >= similarity_threshold:
            max_similarity = similarity
            best_response = entry['Bot_Response']
    return best_response

# Chat with the bot
print("Chatbot: Hello! How can I assist you?")
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        print("Chatbot: Goodbye!")
        break

    best_response = find_similar_response(user_input, dataset)

    if best_response == default_response:
        print("Chatbot:", default_response)
    else:
        print("Chatbot:", best_response)
