import { Nav } from '../containers'; // Ensure the correct path for Nav
import { ProfileCard, RoomCard, SectionTitle } from '../components/';
import axios from 'axios';
import { Footer } from '../containers';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts'; // Import the useUser hook

const User: React.FC = () => {
  const { user } = useUser(); // Access user data from context
  const [userData, setUserData] = useState<any>(null); // State to store user data from API

  // Log user object to verify if it's correctly loaded from context
  console.log("User from context:", user);

  // Fetch user data when the component mounts
  useEffect(() => {
    if (user?.token && user?.username) {
      console.log("Fetching data for user:", user.username, "token is", user.token); // Log the user we're fetching data for
  
      axios.get('/api/users/getByUsername', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          username: user.username, // Pass the username as a query parameter if needed
        },
      })
        .then((response) => {
          console.log("User data fetched successfully:", response.data); // Log the fetched user data
          setUserData(response.data); // Store fetched user data
        })
        .catch((err) => {
          console.error("Error fetching user data:", err.response?.data || err.message || err); // Log error details
        });
    } else {
      console.log("No token or username available, skipping user data fetch"); // Log if no token or username is available
    }
  }, [user?.token, user?.username]); // Dependency array to re-fetch if user changes

  // Log when userData is being rendered
  console.log("Rendering user data:", userData);

  // Conditional rendering based on userData
  if (!userData) {
    return (
      <div className="text-gray-500">Loading user data...</div>
    );
  }

  // Extract relevant user data
  const { username, email, roomsCreated, rooms } = userData;
  const roomsCreatedCount = roomsCreated ? roomsCreated.length : 0; // Count the rooms created by the user
  const roomsCompletedCount = rooms ? rooms.length : 0; // Count the rooms completed by the user

  return (
    <>
      <Nav />
      <section className="flex items-start justify-center min-h-screen py-12 px-4">
        <div className="flex flex-col lg:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-6xl">

          {/* Left Side: User Info */}
          <ProfileCard 
            avatar="https://via.placeholder.com/150"  // You can replace this with user's avatar if available
            name={username}  // Dynamically render the user's name
            email={email}    // Dynamically render the user's email
            roomsCreated={roomsCreatedCount} // Dynamically render the count of rooms created
            roomsCompleted={roomsCompletedCount} // Dynamically render the count of rooms completed
          />

          {/* Right Side: User's Escape Rooms */}
          <main className="w-full lg:w-2/3 bg-stone-900 p-6">
            <h2 className="text-3xl font-semibold text-stone-100 mb-6">Your Escape Rooms</h2>

            {/* Created Rooms Section */}
            <div className="mb-6">
              <SectionTitle title="Rooms You Created" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomsCreated && roomsCreated.map((room: any) => (
                  <RoomCard 
                    key={room.id}  // Unique key for each room
                    title={room.title}  // Room title
                    description={room.description}  // Room description
                    buttonText="View Details"
                    buttonColor="bg-red-500"
                  />
                ))}
              </div>
            </div>

            {/* Completed Rooms Section */}
            <div>
              <SectionTitle title="Rooms You've Completed" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms && rooms.map((room: any) => (
                  <RoomCard 
                    key={room.id}  // Unique key for each room
                    title={room.title}  // Room title
                    description={room.description}  // Room description
                    buttonText="View Details"
                    buttonColor="bg-green-500"
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