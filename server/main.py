import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Create Flask app
app = Flask(__name__)

# Enable CORS for all domains (use it cautiously in production)
CORS(app)

# Set your OpenAI API key securely using environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")  # Use an environment variable for security

# Function to call OpenAI API
def answerUser(input):
    # Create the prompt
    prompt = f"The user you are communicating with has Alzheimer's. Write a response to '{input}' that asks the user for more details, as if having a conversation."

    # Call OpenAI API (GPT-3.5 or GPT-4)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can also use "gpt-4" if you have access
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract the response text from the API response
        response_text = response['choices'][0]['message']['content']
        return response_text
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Sorry, I couldn't generate a response right now."

# Define the route for the chat endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get the user input (memory) from the frontend request
        user_input = request.json.get('memory')
        if not user_input:
            return jsonify({"error": "No memory provided"}), 400  # Return error if no memory is provided

        # Get the response from the answerUser function
        response = answerUser(user_input)

        # Return the response as JSON
        return jsonify({'response': response})

    except Exception as e:
        print(f"Error in chat route: {e}")
        return jsonify({"error": "Something went wrong with the chat route"}), 500

# Start the Flask app in debug mode
if __name__ == '__main__':
    app.run(debug=True)
