import { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for room data
interface Room {
  id: number;
  roomName: string;
  roomDescription: string;
  roomImage: string | null;
  roomDifficulty: number;
  winRate: number;
  creator: string;
}

const Try = () => {
  const [room, setRoom] = useState<Room | null>(null); // State to store room data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State to store error message if any

  // Function to fetch the room data by ID (assuming ID is 1)
  const fetchRoomById = async (id: number) => {
    console.log("Trying to fetch room with ID:", id);
    try {
      // Updated API endpoint to match your backend route
      console.log(`Making GET request to /api/rooms/${id}`);
      const response = await axios.get(`/api/rooms/${id}`);
      
      console.log("Received response:", response);
      // Map the response data to match your interface structure
      const fetchedRoom = {
        id: response.data.id,
        roomName: response.data.title, // Mapping backend title to frontend roomName
        roomDescription: response.data.description, // Mapping backend description to frontend roomDescription
        roomImage: null, // Assuming you don't have an image field in backend
        roomDifficulty: response.data.difficulty, // Mapping backend difficulty to frontend roomDifficulty
        winRate: 50, // Placeholder winRate as it's not provided in the backend
        creator: 'Unknown', // Placeholder creator
      };
      
      setRoom(fetchedRoom); // Set room data into state
      setLoading(false); // Set loading to false after data is fetched
      console.log("Room data set to state:", fetchedRoom);
    } catch (error: any) {
      console.error('Error fetching room:', error);
      setError('Error fetching room data'); // Set error message
      setLoading(false); // Set loading to false after error
      console.log("Error occurred while fetching room data:", error.message);
    }
  };

  useEffect(() => {
    console.log("Component mounted, calling fetchRoomById with ID 1");
    fetchRoomById(1); // Call the fetch function with room ID 1 when the component mounts
  }, []); // Empty dependency array ensures it runs once when component mounts

  if (loading) {
    console.log("Loading room data...");
    return <div>Loading room...</div>; // Display loading state while fetching data
  }

  if (error) {
    console.log("Error state:", error);
    return <div>{error}</div>; // Display error message if fetching fails
  }

  if (!room) {
    console.log("No room data found");
    return <div>No room found!</div>; // Display error if room is not found
  }

  console.log("Rendering room:", room);

  return (
    <section className="py-16 bg-stone-950" id="try">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">Try Out a Room</h2>
          <p className="text-lg sm:text-xl text-stone-200 max-w-3xl mx-auto">
            Choose from our exciting escape rooms and test your skills. Each room offers a unique challenge designed to keep you on your toes.
          </p>
        </div>

        {/* Room Card */}
        <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={room.roomImage || 'https://via.placeholder.com/600x400'} // Use placeholder if image is missing
            alt={room.roomName}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-stone-100 mb-2">{room.roomName}</h3>
            <p className="text-stone-300 mb-4">{room.roomDescription}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <div>
                <strong>Win Rate:</strong> {room.winRate}%
              </div>
              <div>
                <strong>Creator:</strong> {room.creator}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <strong className="mr-1">Difficulty:</strong>
                <span className="text-yellow-500">{"⭐".repeat(room.roomDifficulty)}</span> {/* Display difficulty stars */}
              </div>
              <a href="#" className="text-red-600 hover:text-red-700 font-semibold">Try Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Try;