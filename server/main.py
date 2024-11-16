import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key (make sure to keep it secure)
openai.api_key = "your-api-key-here"

def answerUser(input):
    # Create the prompt
    prompt = f"The user you are communicating with has Alzheimer's. Write a response to '{input}' that asks the user for more details, as if having a conversation."

    try:
        # Call the OpenAI API using the new interface
        response = openai.Completion.create(
            model="gpt-3.5-turbo",  # You can also use "gpt-4" if needed
            prompt=prompt,
        )

        # Extract the response text from the API response
        response_text = response['choices'][0]['text'].strip()
        return response_text
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Sorry, there was an error with processing your request."

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('memory')  # Get memory input from React frontend

    response = answerUser(user_input)
    print(response)

    return jsonify({'response': response})
    

if __name__ == '__main__':
    app.run(debug=True)
