import React, { useState, useEffect } from 'react';

const Memories = () => {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        // Fetch the memories from Flask API
        fetch('http://localhost:5000/api/get-memories') // Flask server address
            .then(response => response.json())
            .then(data => {
                setMemories(data.memories); // Set fetched memories in state
            })
            .catch(error => console.error('Error fetching memories:', error));
    }, []);

    return (
        <div>
            <h1>Your Memories</h1>
            <ul>
                {memories.length === 0 ? (
                    <p>No memories found.</p>
                ) : (
                    memories.map((memory, index) => (
                        <li key={index}>
                            <div style={{ background: '#f8f8f8', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>
                                {memory}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Memories;
