import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav, Footer } from '../containers';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate


interface FormData {
  roomName: string;
  roomDescription: string;
  roomDifficulty: number;
  roomImage: string;
  roomType: string;
  riddleOneText: string;
  riddleOneAnswer: string;
  riddleOneName: string;
  riddleTwoText: string;
  riddleTwoAnswer: string;
  riddleTwoName: string;
  riddleThreeText: string;
  riddleThreeAnswer: string;
  riddleThreeName: string;
  riddleFourText: string;
  riddleFourAnswer: string;
  riddleFourName: string;
  [key: string]: string | number;
}

const CreateRoom: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const { user: userState } = location.state || {}; // Getting the user object from location state
  const [formData, setFormData] = useState<FormData>({
    roomName: '',
    roomDescription: '',
    roomDifficulty: 0,
    roomImage: '',
    roomType: '',
    riddleOneText: '',
    riddleOneAnswer: '',
    riddleOneName: '',
    riddleTwoText: '',
    riddleTwoAnswer: '',
    riddleTwoName: '',
    riddleThreeText: '',
    riddleThreeAnswer: '',
    riddleThreeName: '',
    riddleFourText: '',
    riddleFourAnswer: '',
    riddleFourName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingRiddles, setLoadingRiddles] = useState(false);
  const [riddleError, setRiddleError] = useState('');
  const [userLoading, setUserLoading] = useState(true); // Add state to track user fetching status

  // Fetch the user data from the backend using the username from location state
  useEffect(() => {
    if (userState?.username) {
      const fetchUserByUsername = async () => {
        try {
          const response = await axios.get('/api/users/getByUsername', {
            params: { username: userState.username },
          });
          console.log('Fetched user:', response.data); // Log the fetched user data
          setUser(response.data); // Set the fetched user data, including the id
          setUserLoading(false); // Set loading to false after the user data is fetched
        } catch (error) {
          console.error('Error fetching user:', error);
          setUserLoading(false); // Set loading to false even if there's an error
        }
      };
      fetchUserByUsername();
    }
  }, [userState?.username]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate room fields
    if (!formData.roomName) newErrors.roomName = 'Room name is required';
    if (!formData.roomDescription) newErrors.roomDescription = 'Room description is required';
    if (!formData.roomDifficulty) newErrors.roomDifficulty = 'Room difficulty is required';
    if (!formData.roomType) newErrors.roomType = 'Room type is required';

    // Validate riddle fields
    if (!formData.riddleOneText || !formData.riddleOneAnswer) newErrors.riddleOne = 'Riddle one must have both text and answer';
    if (!formData.riddleTwoText || !formData.riddleTwoAnswer) newErrors.riddleTwo = 'Riddle two must have both text and answer';
    if (!formData.riddleThreeText || !formData.riddleThreeAnswer) newErrors.riddleThree = 'Riddle three must have both text and answer';
    if (!formData.riddleFourText || !formData.riddleFourAnswer) newErrors.riddleFour = 'Riddle four must have both text and answer';

    return newErrors;
  };

  interface ModalProps {
    message: string;
    onClose: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-lg font-semibold mb-4">{message}</h2>
          <div className="flex flex-col gap-4 mt-6">

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose} // This closes the modal and proceeds
          >
            Ok
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleCreateAnotherRoom} // This clears form and lets user try again
          >
            Create Another Room
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleGoToUserPage} // This redirects the user to their user page
          >
            Go to User Page
          </button>
          </div>
        </div>
      </div>
    );
  };
  
const [modalMessage, setModalMessage] = useState<string | null>(null); // To store the modal message
const [showModal, setShowModal] = useState(false); // To show or hide the modal

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  // Check if the room type is "number" and validate the riddle answer
  if (formData.roomType === 'number' && name.startsWith('riddle') && name.includes('Answer')) {
    // Only allow digits 0-9 for the riddle answer and ensure it is a single digit
    if (/[^0-9]/.test(value) || value.length > 1) {
      setModalMessage('Error: Please go back and enter a single digit between 0-9 for the riddle answer.');
      setShowModal(true); // Show the modal
      return; // Prevent updating the state with invalid input
    }
  }

  // Check if the room type is "alphabet" and validate the riddle answer
  if (formData.roomType === 'letter' && name.startsWith('riddle') && name.includes('Answer')) {
    // Only allow a single alphabet letter (a-z, A-Z)
    if (/[^a-zA-Z]/.test(value) || value.length > 1) {
      setModalMessage('Error: Please enter a single alphabetic character (A-Z or a-z) for the riddle answer.');
      setShowModal(true); // Show the modal
      return; // Prevent updating the state with invalid input
    }
  }

  // Update the form data with the new value if no validation issues
  setFormData({ ...formData, [name]: value });
};

const navigate = useNavigate(); 

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  const formDataToSend = {
    title: formData.roomName,
    description: formData.roomDescription,
    type: formData.roomType,
    difficulty: Number(formData.roomDifficulty),
    image: formData.roomImage,
    creatorID: user?.userId,
    riddles: [
      { content: formData.riddleOneText, answer: formData.riddleOneAnswer, name: formData.riddleOneName },
      { content: formData.riddleTwoText, answer: formData.riddleTwoAnswer, name: formData.riddleTwoName },
    ],
  };

  try {
    await axios.post('/api/rooms', formDataToSend);
    setModalMessage('Room created successfully! Would you like to create another one?');
    setShowModal(true);
  } catch (error) {
    console.error('Error creating room:', error);
    setModalMessage('Failed to create room.');
    setShowModal(true);
  }
};

const handleModalClose = () => {
  setShowModal(false);
  setModalMessage(null);
};

const handleCreateAnotherRoom = () => {
  setFormData({
    roomName: '',
    roomDescription: '',
    roomDifficulty: 0,
    roomImage: '',
    roomType: '',
    riddleOneText: '',
    riddleOneAnswer: '',
    riddleOneName: '',
    riddleTwoText: '',
    riddleTwoAnswer: '',
    riddleTwoName: '',
    riddleThreeText: '',
    riddleThreeAnswer: '',
    riddleThreeName: '',
    riddleFourText: '',
    riddleFourAnswer: '',
    riddleFourName: '',
  });
  setShowModal(false); // Close the modal
};

const handleGoToUserPage = () => {
  navigate(`/user/${user?.username}`); // Navigate to the user's page
};

  const fetchRiddle = async (riddleNumber: number) => {
    setLoadingRiddles(true);
    try {
      const response = await axios.get('https://riddles-api.vercel.app/random');
      const riddle = response.data;

      if (riddle && riddle.riddle && riddle.answer) {
        const newFormData = { ...formData };
        if (riddleNumber === 1) {
          newFormData.riddleOneText = riddle.riddle;
          newFormData.riddleOneAnswer = riddle.answer;
        } else if (riddleNumber === 2) {
          newFormData.riddleTwoText = riddle.riddle;
          newFormData.riddleTwoAnswer = riddle.answer;
        } else if (riddleNumber === 3) {
          newFormData.riddleThreeText = riddle.riddle;
          newFormData.riddleThreeAnswer = riddle.answer;
        } else if (riddleNumber === 4) {
          newFormData.riddleFourText = riddle.riddle;
          newFormData.riddleFourAnswer = riddle.answer;
        }
        setFormData(newFormData);
        setRiddleError('');
      } else {
        setRiddleError('No riddles found in response.');
      }
    } catch (error) {
      setRiddleError('Error fetching riddle.');
    } finally {
      setLoadingRiddles(false);
    }
  };


  return (
    <>
      <Nav />
      {userLoading ? (
  <div className="text-center">
    <p>Loading user data...</p> {/* Show a message or loading spinner */}
  </div>
) : (
  <>
      <section className="flex items-center justify-center min-h-screen m-6">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          <div className="w-full p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Create a New Room</h2>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {/* Room Name Field */}
                <div className="mb-4">
                  <label htmlFor="roomName" className="block text-lg mb-2 text-stone-200">Room Name</label>
                  <input
                    type="text"
                    id="roomName"
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the room name"
                    required
                  />
                  {errors.roomName && <p className="text-red-500">{errors.roomName}</p>}
                </div>

                {/* Room Description Field */}
                <div className="mb-4">
                  <label htmlFor="roomDescription" className="block text-lg mb-2 text-stone-200">Room Description</label>
                  <textarea
                    id="roomDescription"
                    name="roomDescription"
                    value={formData.roomDescription}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the room description"
                    rows={4}
                    required
                  />
                  {errors.roomDescription && <p className="text-red-500">{errors.roomDescription}</p>}
                </div>

                {/* Room Image Field */}
                <div className="mb-4">
                  <label htmlFor="roomImage" className="block text-lg mb-2 text-stone-200">Room Image (URL)</label>
                  <input
                    type="text"
                    id="roomImage"
                    name="roomImage"
                    value={formData.roomImage}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the image URL"
                  />
                  {errors.roomImage && <p className="text-red-500">{errors.roomImage}</p>}
                </div>

                {/* Room Difficulty */}
                <div className="mb-4">
                  <label htmlFor="roomDifficulty" className="block text-lg mb-2 text-stone-200">Room Difficulty (1 easy - 5 Difficult)</label>
                  <select
                    id="roomDifficulty"
                    name="roomDifficulty"
                    value={formData.roomDifficulty}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Room Difficulty</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {errors.roomDifficulty && <p className="text-red-500">{errors.roomDifficulty}</p>}
                </div>

                {/* Room Type */}
                <div className="mb-4">
                  <label htmlFor="roomType" className="block text-lg mb-2 text-stone-200">Room Type</label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="number">Number</option>
                    <option value="letter">Letter</option>
                  </select>
                  {errors.roomType && <p className="text-red-500">{errors.roomType}</p>}
                </div>
              </fieldset>

              <hr className="m-8" />
              <fieldset>

                
                {/* Riddle Name 1 */}
                <div className="mb-4">
                  <label htmlFor="riddleOneName" className="block text-lg mb-2 text-stone-200">Riddle One Name</label>
                  <input
                    type="text"
                    id="riddleOneName"
                    name="riddleOneName"
                    value={formData.riddleOneName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the name of the first riddle"
                    required
                  />
                </div>


                {/* Riddle 1 */}
                <div className="mb-4">
                  <label htmlFor="riddleOneText" className="block text-lg mb-2 text-stone-200">Riddle One</label>
                  <textarea
                    id="riddleOneText"
                    name="riddleOneText"
                    value={formData.riddleOneText}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the first riddle"
                    rows={2}
                    required
                  />
                </div>

                {/* Riddle Answer 1 */}
                <div className="mb-4">
                  <label htmlFor="riddleOneAnswer" className="block text-lg mb-2 text-stone-200">Riddle One Answer</label>
                  <input
                    type="text"
                    id="riddleOneAnswer"
                    name="riddleOneAnswer"
                    value={formData.riddleOneAnswer}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Answer"
                    required
                  />
                    {errors.riddleOneAnswer && <p className="text-red-500">{errors.riddleOneAnswer}</p>}
                </div>

                {/* Fetch Riddle Button 1 */}
                <button
                  type="button"
                  onClick={() => fetchRiddle(1)}
                  className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                  disabled={loadingRiddles}
                >
                  {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
                </button>
              </fieldset>

              <hr className="m-8" />

                              {/* Riddle Name 2 */}
                              <div className="mb-4">
                  <label htmlFor="riddleTwoName" className="block text-lg mb-2 text-stone-200">Riddle Two Name</label>
                  <input
                    type="text"
                    id="riddleTwoName"
                    name="riddleTwoName"
                    value={formData.riddleTwoName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the name of the second riddle"
                    required
                  />
                </div>

              {/* Riddle 2 */}
              <fieldset>
                <div className="mb-4">
                  <label htmlFor="riddleTwoText" className="block text-lg mb-2 text-stone-200">Riddle Two</label>
                  <textarea
                    id="riddleTwoText"
                    name="riddleTwoText"
                    value={formData.riddleTwoText}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the second riddle"
                    rows={2}
                    required
                  />
                </div>

                {/* Riddle Answer 2 */}
                <div className="mb-4">
                  <label htmlFor="riddleTwoAnswer" className="block text-lg mb-2 text-stone-200">Riddle Two Answer</label>
                  <input
                    type="text"
                    id="riddleTwoAnswer"
                    name="riddleTwoAnswer"
                    value={formData.riddleTwoAnswer}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Answer"
                    required
                  />
                    {errors.riddleTwoAnswer && <p className="text-red-500">{errors.riddleTwoAnswer}</p>}
                </div>

                {/* Fetch Riddle Button 2 */}
                <button
                  type="button"
                  onClick={() => fetchRiddle(2)}
                  className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                  disabled={loadingRiddles}
                >
                  {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
                </button>
              </fieldset>

              <hr className="m-8" />


                              {/* Riddle Name 3 */}
                              <div className="mb-4">
                  <label htmlFor="riddleThreeName" className="block text-lg mb-2 text-stone-200">Riddle Three Name</label>
                  <input
                    type="text"
                    id="riddleThreeName"
                    name="riddleThreeName"
                    value={formData.riddleThreeName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the name of the third riddle"
                    required
                  />
                </div>



              {/* Riddle 3 */}
              <fieldset>
                <div className="mb-4">
                  <label htmlFor="riddleThreeText" className="block text-lg mb-2 text-stone-200">Riddle Three</label>
                  <textarea
                    id="riddleThreeText"
                    name="riddleThreeText"
                    value={formData.riddleThreeText}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the third riddle"
                    rows={2}
                    required
                  />
                </div>

                {/* Riddle Answer 3 */}
                <div className="mb-4">
                  <label htmlFor="riddleThreeAnswer" className="block text-lg mb-2 text-stone-200">Riddle Three Answer</label>
                  <input
                    type="text"
                    id="riddleThreeAnswer"
                    name="riddleThreeAnswer"
                    value={formData.riddleThreeAnswer}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Answer"
                    required
                  />
                    {errors.riddleThreeAnswer && <p className="text-red-500">{errors.riddleThreeAnswer}</p>}
                </div>

                {/* Fetch Riddle Button 3 */}
                <button
                  type="button"
                  onClick={() => fetchRiddle(3)}
                  className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                  disabled={loadingRiddles}
                >
                  {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
                </button>
              </fieldset>

              <hr className="m-8" />

                {/* Riddle Name 4 */}
                <div className="mb-4">
                  <label htmlFor="riddleFourName" className="block text-lg mb-2 text-stone-200">Riddle Four Name</label>
                  <input
                    type="text"
                    id="riddleFourName"
                    name="riddleFourName"
                    value={formData.riddleFourName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the name of the fourth riddle"
                    required
                  />
                </div>

              {/* Riddle 4 */}
              <fieldset>
                <div className="mb-4">
                  <label htmlFor="riddleFourText" className="block text-lg mb-2 text-stone-200">Riddle Four</label>
                  <textarea
                    id="riddleFourText"
                    name="riddleFourText"
                    value={formData.riddleFourText}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the fourth riddle"
                    rows={2}
                    required
                  />
                </div>

                {/* Riddle Answer 4 */}
                <div className="mb-4">
                  <label htmlFor="riddleFourAnswer" className="block text-lg mb-2 text-stone-200">Riddle Four Answer</label>
                  <input
                    type="text"
                    id="riddleFourAnswer"
                    name="riddleFourAnswer"
                    value={formData.riddleFourAnswer}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Answer"
                    required
                  />
                    {errors.riddleFourAnswer && <p className="text-red-500">{errors.riddleFourAnswer}</p>}
                </div>

                {/* Fetch Riddle Button 4 */}
                <button
                  type="button"
                  onClick={() => fetchRiddle(4)}
                  className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                  disabled={loadingRiddles}
                >
                  {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
                </button>
                {riddleError && <p className="text-red-500">{riddleError}</p>}

              </fieldset>

              <hr className="m-8" />

              {/* Submit Button */}
              <div className="mt-8 text-center">
              <button type="submit" className="w-auto p-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4">
  Create Room
</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />    {/* Conditionally render the modal */}
      </>
)}
{showModal && (
  <Modal
    message={modalMessage || ''}
    onClose={handleModalClose} // Pass handleModalClose as the onClose prop
  />
)}
    </>
  );
};

export default CreateRoom;