// User.tsx
import { Nav } from '../containers'; // Ensure the correct path for Nav
import { ProfileCard, RoomCard, SectionTitle } from '../components/';
import axios from 'axios';
import { Footer } from '../containers';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts'; // Import the useUser hook
import { Lock, Plus } from '../assets';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const User: React.FC = () => {
  const { user } = useUser(); // Access user data from context
  const [userData, setUserData] = useState<any>(null); // State to store user data from API
  const navigate = useNavigate(); // Initialize useNavigate

  console.log('User from context:', user); // Debug log for user context

  // Fetch user data when the component mounts
  useEffect(() => {
    if (user?.token && user?.username) {
      console.log('Fetching data for user:', user.username, 'token is', user.token);

      axios
        .get('/api/users/getByUsername', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username: user.username, // Pass the username as a query parameter if needed
          },
        })
        .then((response) => {
          console.log('User data fetched successfully:', response.data);
          setUserData(response.data);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err.response?.data || err.message || err);
        });
    } else {
      console.log('No token or username available, skipping user data fetch');
    }
  }, [user?.token, user?.username]);

  console.log('Rendering user data:', userData); // Debug log for rendered user data

  const handleCreateRoomClick = () => {
    navigate('/createroom', { state: { user } });
  };

  // Conditional rendering while loading
  if (!userData) {
    return <div className="text-gray-500">Loading user data...</div>;
  }

  // Map "roomsCreated/Creator" to "roomsCreated" for easier usage
  const { username, email, rooms = [], roomsCreated: roomsCreatedRaw = [] } = userData;
  const roomsCreated = userData['roomsCreated/Creator'] || roomsCreatedRaw; // Ensure compatibility
  const roomsCreatedCount = roomsCreated.length; // Count the rooms created by the user
  const roomsCompletedCount = rooms.length; // Count the rooms completed by the user

  return (
    <>
      <Nav />
      <section className="flex items-start justify-center min-h-screen py-12 px-4">
        <div className="flex flex-col lg:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-6xl">

          {/* Left Side: User Info */}
          <ProfileCard
            avatar={Lock} // You can replace this with the user's avatar if available
            name={username} // Dynamically render the user's name
            email={email} // Dynamically render the user's email
            roomsCreated={roomsCreatedCount} // Dynamically render the count of rooms created
            roomsCompleted={roomsCompletedCount} // Dynamically render the count of rooms completed
          />

          {/* Right Side: User's Escape Rooms */}
          <main className="w-full lg:w-2/3 bg-stone-900 p-6">
            <div className="mb-6 flex justify-end">
              <a
                onClick={handleCreateRoomClick}
                className="text-lg text-blue-100 hover:underline cursor-pointer"
              >
                <img src={Plus} className="w-6 h-6 mr-2 inline-block" /> Create A Room
              </a>
            </div>
            <h2 className="text-3xl font-semibold text-stone-100 mb-6">Your Escape Rooms</h2>

            {/* Created Rooms Section */}
            <div className="mb-6">
              <SectionTitle title="Rooms You Created" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomsCreated.map((room: any) => (
                  <RoomCard
                    key={room.id} // Unique key for each room
                    title={room.title} // Room title
                    description={room.description} // Room description
                    buttonText="View Room" // Button text now says "View Room"
                    buttonColor="bg-red-500"
                    onClick={() => navigate(`/room/${room.id}`)} // Navigates to the room detail page
                  />
                ))}
              </div>
            </div>

            {/* Completed Rooms Section */}
            <div>
              <SectionTitle title="Rooms You've Completed" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room: any) => (
                  <RoomCard
                    key={room.id} // Unique key for each room
                    title={room.title} // Room title
                    description={room.description} // Room description
                    buttonText="View Room" // Button text now says "View Room"
                    buttonColor="bg-green-500"
                    onClick={() => navigate(`/room/${room.id}`)} // Navigates to the room detail page
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default User;