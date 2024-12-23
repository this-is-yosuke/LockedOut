import React, { useState, useEffect } from 'react';
import axios from 'axios';
const RiddleGenerator = () => {
    const [riddles, setRiddles] = useState([]);
    // Function to fetch riddles from Open Trivia Database
    const fetchRiddles = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api.php', {
                params: {
                    amount: 10, // Number of riddles to fetch
                    difficulty: 'medium', // Difficulty level
                    type: 'boolean', // Only true/false questions
                },
            });
            // Set the fetched riddles to state
            setRiddles(response.data.results);
        }
        catch (error) {
            console.error('Error fetching riddles:', error);
        }
    };
    // Call the fetch function on component mount
    useEffect(() => {
        fetchRiddles();
    }, []);
    return (<div>
      <h1>Escape Room Riddles</h1>
      <div>
        {riddles.length === 0 ? (<p>Loading riddles...</p>) : (riddles.map((riddle, index) => (<div key={index}>
              <p><strong>Riddle {index + 1}:</strong> {riddle.question}</p>
              <p><strong>Answer:</strong> {riddle.correct_answer}</p>
            </div>)))}
      </div>
    </div>);
};
export default RiddleGenerator;
