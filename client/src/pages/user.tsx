import { Nav } from '../containers'; // Ensure the correct path for Nav
import { ProfileCard, RoomCard, SectionTitle } from '../components/';

const User: React.FC = () => {
  return (
    <>
      <Nav />
      <section className="flex items-start justify-center min-h-screen py-12 px-4">
        <div className="flex flex-col lg:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-6xl">

          {/* Left Side: User Info */}
          <ProfileCard 
            avatar="https://via.placeholder.com/150"
            name="John Doe"
            email="john.doe@example.com"
            roomsCreated={5}
            roomsCompleted={3}
          />

          {/* Right Side: User's Escape Rooms */}
          <main className="w-full lg:w-2/3 bg-stone-900 p-6">
            <h2 className="text-3xl font-semibold text-stone-100 mb-6">Your Escape Rooms</h2>

            {/* Created Rooms Section */}
            <div className="mb-6">
              <SectionTitle title="Rooms You Created" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <RoomCard 
                  title="Escape the Dungeon"
                  description="A thrilling dungeon escape adventure with puzzles and mysteries."
                  buttonText="View Details"
                  buttonColor="bg-red-500"
                />
                {/* More created rooms... */}
              </div>
            </div>

            {/* Completed Rooms Section */}
            <div>
              <SectionTitle title="Rooms You've Completed" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <RoomCard 
                  title="Haunted House"
                  description="A spooky escape room full of paranormal activity."
                  buttonText="View Details"
                  buttonColor="bg-green-500"
                />
                {/* More completed rooms... */}
              </div>
            </div>
          </main>

        </div>
      </section>
    </>
  );
};

export default User;