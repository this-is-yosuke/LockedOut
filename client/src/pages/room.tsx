import React, { useState, useEffect } from 'react';
import { Nav, Footer } from '../containers'; // Your Nav and Footer components
import Lock from '../assets/lock.png'; // Lock image for display
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for capturing roomID from URL

// Countdown Timer Component
const CountdownTimer: React.FC<{ onTimeUp: () => void }> = ({ onTimeUp }) => {
  const targetTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes countdown
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = targetTime - new Date().getTime();
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(interval);
        onTimeUp(); // Trigger the callback when time is up
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeUp]);

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

// Modal Component for Time Up
const TimeUpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Time's Up!</h2>
      <p className="text-lg mb-6">You've run out of time, you will be redirected to the home page.</p>
      <button
        onClick={onClose}
        className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  </div>
);

// Escape Room Page
const EscapeRoom: React.FC = () => {
  const { roomId } = useParams(); // Capture roomId from URL using useParams
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [riddles, setRiddles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false); // Track if time is up
  const navigate = useNavigate(); // For redirection

  // Fetch riddles based on roomId
  const fetchRiddles = async (roomID: string) => {
    try {
      const response = await axios.get(`/api/riddles/room/${roomID}`);
      if (Array.isArray(response.data)) {
        setRiddles(response.data);
      } else {
        setRiddles([]); // If no riddles found for the room, set an empty array
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching riddles');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchRiddles(roomId); // Fetch riddles when roomId changes
    }
  }, [roomId]); // Re-fetch riddles if roomId changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = riddles.every((riddle, index) => {
      const answer = answers[`riddle${index + 1}`]?.toLowerCase();
      return answer === riddle.answer.toLowerCase();
    });

    if (isCorrect) {
      alert('You unlocked the lock!');
      setTimeout(() => {
        navigate('/'); // Redirect to home page after success
      }, 1000); // Optional delay before redirect
    } else {
      alert('Wrong answers. Try again!');
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true); // Time is up, show modal
    setTimeout(() => {
      navigate('/'); // Redirect to home page after some delay
    }, 2000); // Wait 2 seconds before redirect
  };

  if (loading) {
    return <div>Loading riddles...</div>;
  }

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
                  <div>No riddles available</div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <CountdownTimer onTimeUp={handleTimeUp} /> {/* Countdown timer */}

              <div className="text-center">
                <img src={Lock} alt="Lock" className="mx-auto max-h-32" />
              </div>

              <form onSubmit={handleSubmit} className="flex justify-between mt-8">
                {riddles.map((riddle, index) => (
                  <input
                    key={riddle.id}
                    type="text"
                    name={`riddle${index + 1}`}
                    value={answers[`riddle${index + 1}`] || ''}
                    onChange={handleInputChange}
                    className="w-16 h-16 text-2xl text-center bg-stone-600 text-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                    maxLength={1}
                    placeholder={riddle.position.toString()}
                  />
                ))}
              </form>

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

      {/* Show Time Up Modal if time is up */}
      {isTimeUp && <TimeUpModal onClose={() => navigate('/')} />}
    </>
  );
};

export default EscapeRoom;