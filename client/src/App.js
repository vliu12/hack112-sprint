import React, { useState } from "react";
import './App.css';
import CherishDesign from "./components/landing";
// import meditationBackground from './image2.jpg';

function App() {
    const [memory, setMemory] = useState("");  // State for memory input
    const [response, setResponse] = useState("");  // State for the GPT response

    // Handle memory input change
    const handleMemoryChange = (e) => {
        setMemory(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the memory input to the Flask backend
        try {
            const res = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memory })
            });
            const data = await res.json();
            setResponse(data.response || "Sorry, something went wrong.");
        } catch (error) {
            setResponse("Error: Could not connect to the server.");
        }
    };

    return (
        <div
            className="App"
            style={{
                // backgroundImage: `url(${meditationBackground})`,  // Set background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                padding: '20px',
                fontFamily: 'Times New Roman'
            }}
        >

            {/* <div>
                <CherishDesign />
            </div> */}
            <h1>CHERISH</h1>

            {/* Memory input box */}
            <label>
                What did you do today?
                <input
                    type="text"
                    value={memory}
                    onChange={handleMemoryChange}
                    placeholder="I spent time with my family..."
                />
            </label>

            {/* Submit button */}
            <button onClick={handleSubmit}>Go!</button>

            {/* Display GPT response */}
            {response && (
                <div>
                    {/* <h2>GPT Response:</h2> */}
                    <p className="response">{response}</p>
                </div>
            )}
        </div>
    );
}

export default App;
