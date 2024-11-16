import React, { useState } from "react";
import './App.css';
// import CherishDesign from "./components/landing";
import cherishlogo from './CHERISH..png'
import background from './background1.png';
import cherishicon from './Subtract.png'
import rectangle from './rectangle.png'
import navdesign from './rectangle.png'
import memories from '../memoriespage.js'
import Navbar from '../Navbar'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    const [memory, setMemory] = useState("");  // State for memory input
    const [response, setResponse] = useState("");  // State for the GPT response
    const [memories, setMemories] = useState([]);  // This will store all the memories
    const [memoryCreated, setMemoryCreated] = useState(false);  // State to trigger the "Memory Created!" pop-up
    // Handle memory input change
    const handleMemoryChange = (e) => {
        setMemory(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setResponse("");

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
                backgroundImage: `url(${background})`,  // Set background image
            }}
        >
        
        {/* <Navbar /> Add Navbar here */}


        <img id="cherishLogo" src={cherishlogo} alt="cherish logo" />
        <img id="cherishID" src={cherishicon} alt="cherish icon" />
        <img id="rectangle" src={rectangle} alt="rectangle" />
        <img id="navdesign" src={navdesign} alt="navdesign" />
 



            {/* <div>
                <CherishDesign />
            </div> */}
            {/* <h1>CHERISH</h1> */}

            {/* Memory input box */}
            <label className = "label">
                What did you do today?
                <input
                    type="text"
                    value={memory}
                    onChange={handleMemoryChange}
                    placeholder="Type here!"
                    className = "input-text"
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
