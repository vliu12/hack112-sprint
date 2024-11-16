import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

memories = []
conversationHistory = []
bigMemories = []


# Set your OpenAI API key (make sure to keep it secure)
openai.api_key = "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"

def answerUser(input):

    conversationHistory.append({"role": "user", "content": input})


    prompt_content = (
    "The user you are communicating with has Alzheimer's. Based on the input: "
    f"'{input}', craft a kind, engaging, and stimulating response. The current conversation history is {conversationHistory}. The questions you're asking after should be the one of that same memory. Ask the user a "
    "specific question related to the topic to encourage detailed recollection. "
    "Keep the tone empathetic and conversational. Ensure the questions are specific but don't ask the same questions, just "
    "enough to guide the user toward a cohesive memory. If the response seems off-topic, "
    "gently redirect with a different phrasing or approach. Limit the response to 12 words."
    "when you return cohesive memories, do not exceed 25 words."
    )


    try:
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages= [{"role": "user", "content": prompt_content}],
        )

        # Extract the response text from OpenAI
        answer = openai_response.choices[0].message.content
        return answer

    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Sorry, there was an error processing your request."


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

def getBigMemory(memories):
    prompt = f"using what you know from the users memories of one event, which are {memories}, create one cohesive memory similar to that of a journal entry, but don't mention anything about memory failing, that is no more than 80 words which will allow the user to fondly remember this memory. The user has Alzheimer's."

    try:
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )

        # Extract the response text from OpenAI
        answer = openai_response.choices[0].message.content
        return answer

    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Sorry, there was an error processing your request." 

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('memory')  # Get memory input from React frontend

    memories.append(user_input)
    print(memories)

    if len(memories) % 5 == 0:
            bigMemory = getBigMemory(memories)
            print("Cohesive Memory:", bigMemory)

            # Optionally, save the big memory to the list as a special entry
            bigMemories.append(f"Cohesive Memory: {bigMemory}")
            print(bigMemories)

            memories.clear()
            conversationHistory.clear()  # Reset the conversation history as well
            return jsonify({'response': bigMemory})

    response = answerUser(user_input)
    print(response)

    return jsonify({'response': response})

@app.route('/api/get-memories', methods=['GET'])
def get_memories():
    return jsonify({'memories': memories})


if __name__ == '__main__':
    app.run(debug=True)
