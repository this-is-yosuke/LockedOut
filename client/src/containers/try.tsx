import { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for room data
interface Room {
  id: number;
  roomName: string;
  roomDescription: string;
  roomImage: string;
  roomDifficulty: number;
  winRate: number;
  creator: string;
}

const Try = () => {
  const [room, setRoom] = useState<Room | null>(null);  // Now using a single room, so type is `Room | null`
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch the room data (assuming room ID is 1)
  const fetchRoomById = async (id: number) => {
    console.log("room loading");
    try {
      const response = await axios.get(`/api/room/${id}`);
      setRoom(response.data); // Set the fetched room into state
      setLoading(false); // Done loading
    } catch (error) {
      console.error('Error fetching room:', error);
      setLoading(false);
    }
  };

  // Fetch the room when the component mounts
  useEffect(() => {
    fetchRoomById(0); // Assuming room ID is 1
  }, []); // Empty dependency array to run once when component mounts

  if (loading) {
    return <div>Loading room...</div>; // Show loading state while fetching data
  }

  // If no room is found, display a message
  if (!room) {
    return <div>No room found!</div>;
  }

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
            src={room.roomImage || 'https://via.placeholder.com/600x400'} // Use room image if available
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