import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
const Try = () => {
    const [rooms, setRooms] = useState([]); // State to store multiple rooms
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State to store error message if any
    const navigate = useNavigate(); // Initialize useNavigate hook
    // Function to fetch room data by ID
    const fetchRoomById = async (id) => {
        console.log("Trying to fetch room with ID:", id);
        try {
            const response = await axios.get(`/api/rooms/${id}`);
            const fetchedRoom = {
                id: response.data.id,
                roomName: response.data.title,
                roomDescription: response.data.description,
                roomImage: response.data.image,
                roomDifficulty: response.data.difficulty,
                winRate: 50, // Placeholder winRate
            };
            setRooms((prevRooms) => [...prevRooms, fetchedRoom]);
            console.log("Room data added to state:", fetchedRoom);
        }
        catch (error) {
            console.error('Error fetching room:', error);
            setError('Error fetching room data');
            setLoading(false);
        }
    };
    // Function to generate random room IDs and fetch corresponding rooms
    const fetchRandomRooms = async () => {
        setLoading(true);
        setRooms([]); // Reset rooms array
        const randomIds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
        for (let id of randomIds) {
            await fetchRoomById(id);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchRandomRooms();
    }, []);
    // Handle navigation when "Try Now" button is clicked
    const handleTryNow = (id) => {
        navigate(`/room/${id}`); // Navigate to the room page with the specific room id
    };
    // Loading state
    if (loading) {
        return <div>Loading rooms...</div>;
    }
    // Error state
    if (error) {
        return <div>{error}</div>;
    }
    // When no rooms found
    if (rooms.length === 0) {
        return <div>No rooms found!</div>;
    }
    return (<section className="py-16 bg-stone-950" id="try">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">Try Out Some Rooms</h2>
          <p className="text-lg sm:text-xl text-stone-200 max-w-3xl mx-auto">
            Choose from our exciting escape rooms and test your skills. Each room offers a unique challenge designed to keep you on your toes.
          </p>
        </div>

        {/* Render Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (<div key={room.id} className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
              <img src={room.roomImage || 'https://via.placeholder.com/600x400'} alt={room.roomName} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-100 mb-2">{room.roomName}</h3>
                <p className="text-stone-300 mb-4">{room.roomDescription}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <strong>Win Rate:</strong> {room.winRate}%
                  </div>
                  <div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <strong className="mr-1">Difficulty:</strong>
                    <span className="text-yellow-500">{"⭐".repeat(room.roomDifficulty)}</span>
                  </div>
                  <button onClick={() => handleTryNow(room.id)} // Call the handleTryNow function with the room's id
         className="text-red-600 hover:text-red-700 font-semibold">
                    Try Now
                  </button>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
};
export default Try;
