// Home.js
import React, { useState } from "react";

const Home = () => {
    const [memory, setMemory] = useState("");
    const [response, setResponse] = useState("");

    const handleMemoryChange = (e) => {
        setMemory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse("");

        try {
            const res = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memory }),
            });
            const data = await res.json();
            setResponse(data.response || "Sorry, something went wrong.");
        } catch (error) {
            setResponse("Error: Could not connect to the server.");
        }
    };

    return (
        <div>
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

            <button onClick={handleSubmit}>Go!</button>

            {response && (
                <div>
                    <p className="response">{response}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
