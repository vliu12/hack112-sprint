import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key (make sure to keep it secure)
openai.api_key = "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"

def answerUser(input):
    # Create the prompt
    prompt = f"The user you are communicating with has Alzheimer's. Write a response to '{input}' that asks the user for more details, as if having a conversation."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        
        # Extract the response text
        answer = response.choices[0].message.content
        return answer

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
