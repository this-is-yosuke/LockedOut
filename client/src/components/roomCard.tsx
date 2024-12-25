interface RoomCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  onClick?: () => void; // Add the onClick prop to handle click events
}

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
}) => {
  return (
    <div className="bg-stone-700 rounded-lg p-4 shadow-md hover:bg-gray-600">
      <h4 className="text-lg font-semibold text-stone-100 mb-2">{title}</h4>
      <p className="text-sm text-stone-400 mb-2">{description}</p>
      <button
        className={`w-full py-2 ${buttonColor} text-white rounded-md hover:bg-opacity-80`}
        onClick={onClick} // Attach the onClick handler to the button
      >
        {buttonText}
      </button>
    </div>
  );
};

export default RoomCard;