import React, { useState } from "react";
import './App.css';
import cherishlogo from './CHERISH..png';
import background from './background1.png';
import cherishicon from './Subtract.png';
import rectangle from './rectangle.png';
import navdesign from './rectangle.png';

function App() {
    const [memory, setMemory] = useState("");  // State for memory input
    const [response, setResponse] = useState("");  // State for the GPT response
    const [memories, setMemories] = useState([]);  // This will store all the memories
    const [cohesiveMemory, setCohesiveMemory] = useState("");  // State for cohesive memory
    const [memoryCreated, setMemoryCreated] = useState(false);  // State to trigger pop-up

    // Handle memory input change
    const handleMemoryChange = (e) => {
        setMemory(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse("");

        // Add the memory to the list of memories
        setMemories((prevMemories) => {
            const updatedMemories = [...prevMemories, memory];
            // Check if there are 5 memories, and if so, create a cohesive memory
            if (updatedMemories.length >= 5) {
                // Create a cohesive memory by joining the memories into a short string
                const newCohesiveMemory = updatedMemories.slice(0, 5).join(" ").slice(0, 100); // Condense the first 5 memories (you can adjust the length)
                setCohesiveMemory(newCohesiveMemory);  // Set the cohesive memory
                setMemoryCreated(true);  // Trigger the "Memory Created!" pop-up
                setMemories([]);  // Clear memories after creating one
                setMemory("");  // Clear the input field
            }
            return updatedMemories;
        });

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

    const handleClosePopup = () => {
        setMemoryCreated(false);
    };

    return (
        <div className="App" style={{ backgroundImage: `url(${background})` }}>
            <img id="cherishLogo" src={cherishlogo} alt="Cherish logo" />
            <img id="cherishID" src={cherishicon} alt="Cherish icon" />
            <img id="rectangle" src={rectangle} alt="Rectangle design" />
            <img id="navdesign" src={navdesign} alt="Nav design" />

            <form onSubmit={handleSubmit}>
                <label className="label">
                    What did you do today?
                    <input
                        type="text"
                        value={memory}
                        onChange={handleMemoryChange}
                        placeholder="Type here!"
                        className="input-text"
                    />
                </label>
                <button type="submit">Go!</button>
            </form>

            {/* Conditional rendering for the cohesive memory pop-up */}
            {memoryCreated && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Memory Created!</p>
                        <p>{cohesiveMemory}</p> {/* Displaying cohesive memory */}
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}

            {response && (
                <div>
                    <p className="response">{response}</p>
                </div>
            )}
        </div>
    );
}

export default App;