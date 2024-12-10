interface ProfileCardProps {
  avatar: string;
  name: string;
  email: string;
  roomsCreated: number;
  roomsCompleted: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ avatar, name, email, roomsCreated, roomsCompleted }) => {
  return (
    <aside className="w-full lg:w-1/3 bg-stone-800 p-6">
      <div className="text-center">
        <img src={avatar} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-stone-100">{name}</h2>
        <p className="text-gray-400 mb-4">{email}</p>
        <div className="mb-4">
          <p className="text-gray-300">Rooms Created: {roomsCreated}</p>
          <p className="text-gray-300">Rooms Completed: {roomsCompleted}</p>
        </div>
        <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit Profile</button>
      </div>
    </aside>
  );
};

export default ProfileCard;