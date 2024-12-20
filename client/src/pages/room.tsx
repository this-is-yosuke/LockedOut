import React, { useState, useEffect } from 'react';
import { Nav, Footer } from '../containers'; // Your Nav and Footer components
import Lock from '../assets/lock.png'; // Lock image for display
import axios from 'axios';

// Countdown Timer Component
const CountdownTimer: React.FC = () => {
  const targetTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes countdown
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = targetTime - new Date().getTime();
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="text-2xl font-semibold text-stone-100 mb-6">
      Time Remaining: {formatTime(timeLeft)}
    </div>
  );
};

// Escape Room Page
const EscapeRoom: React.FC = () => {
  const [answers, setAnswers] = useState({
    riddle1: '',
    riddle2: '',
    riddle3: '',
    riddle4: '',
  });
  const [riddles, setRiddles] = useState<any[]>([]); // State for riddles
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch riddles from the API
  const fetchRiddles = async (roomID: number) => {
    try {
      const response = await axios.get(`/api/riddles/room/${roomID}`);
      console.log("Fetched riddles response:", response.data); // Log the full response
  
      if (Array.isArray(response.data)) {
        console.log("Riddles found:", response.data);
        setRiddles(response.data); // Set riddles
      } else {
        console.error("No riddles found for room ID", roomID);
        setRiddles([]); // Set empty array if no riddles
      }
  
      setLoading(false); // After data is fetched
    } catch (err) {
      console.error("Error fetching riddles:", err);
      setError('Error fetching riddles');
      setLoading(false); // After error
    }
  };

  // Fetch riddles for room 1 on page load
  useEffect(() => {
    fetchRiddles(1); // Fetch riddles for room 1
  }, []);

  // Handle input changes for the riddles
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // Handle form submission and check answers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for checking answers (you can add answer validation here)
    if (
      answers.riddle1 === 'k' &&
      answers.riddle2 === 't' &&
      answers.riddle3 === 'l' &&
      answers.riddle4 === 'c'
    ) {
      alert('You unlocked the lock!');
    } else {
      alert('Wrong answers. Try again!');
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading riddles...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-stone-900 p-6">
        <div className="mx-auto bg-stone-800 p-3 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-2">
            <div className="lg:col-span-2 space-y-6">
              {/* Riddles Section */}
              <h2 className="text-3xl font-semibold text-stone-100 mb-4">Riddles</h2>
              <div className="space-y-4">
                {riddles && riddles.length > 0 ? (
                  riddles.map((riddle) => (
                    <div key={riddle.id} className="bg-stone-700 p-4 rounded-md">
                      <p className="text-lg text-stone-100">
                        {riddle.position}. {riddle.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No riddles available</div> // Show message if no riddles
                )}
              </div>
            </div>

            {/* Timer and Input for Unlocking */}
            <div className="space-y-6">
              {/* Countdown Timer */}
              <CountdownTimer />

              {/* Lock Image */}
              <div className="text-center">
                <img src={Lock} alt="Lock" className="mx-auto max-h-32" />
              </div>

              {/* Form to Unlock the Lock */}
              <form onSubmit={handleSubmit} className="flex justify-between mt-8">
                <input
                  type="text"
                  name="riddle1"
                  value={answers.riddle1}
                  onChange={handleInputChange}
                  className="w-16 h-16 text-2xl text-center bg-stone-600 text-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  maxLength={1}
                  placeholder="A"
                />
                <input
                  type="text"
                  name="riddle2"
                  value={answers.riddle2}
                  onChange={handleInputChange}
                  className="w-16 h-16 text-2xl text-center bg-stone-600 text-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  maxLength={1}
                  placeholder="B"
                />
                <input
                  type="text"
                  name="riddle3"
                  value={answers.riddle3}
                  onChange={handleInputChange}
                  className="w-16 h-16 text-2xl text-center bg-stone-600 text-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  maxLength={1}
                  placeholder="C"
                />
                <input
                  type="text"
                  name="riddle4"
                  value={answers.riddle4}
                  onChange={handleInputChange}
                  className="w-16 h-16 text-2xl text-center bg-stone-600 text-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  maxLength={1}
                  placeholder="D"
                />
              </form>

              {/* Unlock Button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="py-2 px-6 bg-blue-500 text-white text-lg rounded-md hover:bg-red-600"
                >
                  Unlock the Lock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EscapeRoom;