import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

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

@app.route('/prompt-generator', methods=['POST'])
def generatePrompt():
    promptList = [
        "What did you do today?",
        "What made you smile or laugh today?",
        "Did you learn something new? What was it?",
        "Who did you spend time with today? How did it make you feel?",
        "What is one thing you accomplished today that you're proud of?",
        "What was the best part of your day?",
        "Did anything surprise you today?",
        "How did you feel overall today?",
        "What’s one thing you’d like to remember about today?",
        "Did you try something different or unusual today?",
        "What are you thankful for today?",
        "Who helped you or made your day better?",
        "What’s one thing that brought you comfort or joy today?",
        "Did you see something beautiful today? Describe it.",
        "Take a photo of something that represents your day. Why did you choose this?",
        "Describe a conversation you had today. What stood out to you?",
        "What song, book, or movie did you enjoy today?",
        "Did you notice anything special about the weather or nature today?",
        "What’s one thing you want to do tomorrow?",
        "What is a long-term goal you're working towards? Did you take a step closer today?",
        "Share a favorite memory with someone today. What did they say?",
        "Ask someone a question about their day. What did you learn?",
        "What is something you love about yourself?",
        "What was the most delicious thing you ate today?",
        "If you could describe today in one word, what would it be?",
        "Did you help someone today? How?",
        "What is one thing you wish went differently today?",
        "What made you feel calm or relaxed today?",
        "What place did you visit today? How did it feel?",
        "Did you have any interesting dreams last night? What were they about?",
        "What’s something that made you think today?",
        "What’s a skill or hobby you worked on today?",
        "What are you looking forward to tomorrow?",
        "Who is someone you thought about today? Why?",
        "What’s one thing you would tell your past self about today?",
        "What memory from today would you like to keep forever?",
        "If today was a color, what color would it be and why?",
        "Did you learn something new about yourself today?",
        "What would you name today if it were a chapter in your life story?"
    ]
    
    index = random.randint(0, len(promptList) - 1) 
    return jsonify({"prompt": promptList[index]})



@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('memory')  # Get memory input from React frontend

    response = answerUser(user_input)
    print(response)

    return jsonify({'response': response})
    

if __name__ == '__main__':
    app.run(debug=True)
