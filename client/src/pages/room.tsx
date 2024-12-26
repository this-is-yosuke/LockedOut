import React, { useState, useEffect } from 'react';
import { Nav, Footer } from '../containers'; // Your Nav and Footer components
import Lock from '../assets/lock.png'; // Lock image for display
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for capturing roomID from URL
import { useUser } from '../contexts'; // Import the useUser hook

interface TimeUpModalProps {
  onClose: () => void;
}

const TimeUpModal: React.FC<TimeUpModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-md">
      <h2 className="text-xl font-semibold">Time's Up!</h2>
      <p className="mt-4">Sorry, the time for this room has expired. Please try again.</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Close
      </button>
    </div>
  </div>
);

interface CountdownTimerProps {
  onTimeUp: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // Start with 60 seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Trigger the onTimeUp callback when the timer reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear interval when component is unmounted
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-center">
      <p className="text-xl text-white">Time Left: {timeLeft}s</p>
    </div>
  );
};



const EscapeRoom: React.FC = () => {
  const { user } = useUser(); // Access user data from context
  const { roomId }: { roomId?: string } = useParams();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [riddles, setRiddles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null); // State to store user data from API
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false); // Track if time is up
  const navigate = useNavigate(); // For redirection

  // Fetch user data from the backend using the username
  useEffect(() => {
    if (user?.token && user?.username) {
      console.log('Fetching data for user:', user.username, 'token is', user.token);
  
      axios
        .get('/api/users/getByUsername', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username: user.username, // Pass the username as a query parameter
          },
        })
        .then((response) => {
          console.log('User data fetched successfully:', response.data);
          setUserData(response.data);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err); // No need to cast the error
        });
    } else {
      console.log('No token or username available, skipping user data fetch');
    }
  }, [user?.token, user?.username]);

  // Fetch riddles when roomId is available
  useEffect(() => {
    if (roomId) {
      fetchRiddles(roomId);
    }
  }, [roomId]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure the answers are correct before submission
    const isCorrect = riddles.every((riddle, index) => {
      const answer = answers[`riddle${index + 1}`]?.toLowerCase();
      return answer === riddle.answer.toLowerCase();
    });
  
    // Ensure roomId is a valid integer and userId is correct
    const roomIdString = roomId || '';
    const roomIdInt = parseInt(roomIdString, 10); // Convert roomId to integer
  
    // Ensure userId is set properly (userData or user.username)
    const userId = userData?.userId || user?.username;
  
    // Debugging: log the values you're sending
    console.log("Submitting attempt data...");
    console.log("roomId:", roomIdInt);
    console.log("userId:", userId);
    console.log("isCorrect:", isCorrect);
    
    // Check for valid roomId
    if (isNaN(roomIdInt)) {
      alert("Invalid Room ID");
      return;
    }
  
    // Ensure userId is set and valid
    if (!userId) {
      alert("User ID is missing or invalid.");
      return;
    }
  
    const attemptData = {
      userId: userId, // Ensure userId is passed correctly
      roomId: roomIdInt, // Ensure roomId is passed as integer
      attemptNumber: 1,
      isSuccessful: isCorrect,
      duration: 30, // Placeholder for duration
    };
  
    // Debugging: log the full data object before submitting
    console.log("Attempt Data: ", attemptData);
  
    try {
      // Send attempt data to backend
      const response = await axios.post('http://localhost:3001/api/attempt', attemptData);
      console.log('Attempt data submitted:', response.data);
      
      if (isCorrect) {
        alert('You unlocked the lock!');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after success
        }, 1000); // Optional delay before redirect
      } else {
        alert('Wrong answers. Try again!');
      }
    } catch (err) {
      // Handle validation error from the server
      if (axios.isAxiosError(err)) {
        console.error('Validation error from server:', err.response?.data || err.message);
        alert(`Error: ${err.response?.data?.message || err.message}`);
      } else {
        console.error('Unknown error:', err);
        alert('Unknown error occurred');
      }
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    alert('Time is up!'); // Optional: Show a message when time is up
  };

  // Conditional rendering while loading
  if (loading) {
    return <div>Loading riddles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
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