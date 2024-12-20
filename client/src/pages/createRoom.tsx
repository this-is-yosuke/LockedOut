import { Nav, Footer } from '../containers';
import { useState } from 'react';
import axios from 'axios';

interface FormData {
  roomName: string;
  roomDescription: string;
  roomDifficulty: number;
  roomImage: string;
  roomType: string;
  riddleOneText: string;
  riddleOneAnswer: string;
  riddleTwoText: string;
  riddleTwoAnswer: string;
  riddleThreeText: string;
  riddleThreeAnswer: string;
  riddleFourText: string;
  riddleFourAnswer: string;
  [key: string]: string | number;
}

const CreateRoom: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    roomName: '',
    roomDescription: '',
    roomDifficulty: 0,
    roomImage: '',
    roomType: '',
    riddleOneText: '',
    riddleOneAnswer: '',
    riddleTwoText: '',
    riddleTwoAnswer: '',
    riddleThreeText: '',
    riddleThreeAnswer: '',
    riddleFourText: '',
    riddleFourAnswer: '',
  });

  const [errors, setErrors] = useState({} as Record<string, string>);
  const [loadingRiddles, setLoadingRiddles] = useState(false); // to show a loading state
  const [riddleError, setRiddleError] = useState('');

  // Function to fetch a riddle from the API and update the correct field
  const fetchRiddle = async (riddleNumber: number) => {
    setLoadingRiddles(true); // Set loading state to true when fetching
    try {
      const response = await axios.get('https://riddles-api.vercel.app/random');
      const riddle = response.data;

      if (riddle && riddle.riddle && riddle.answer) {
        const newFormData = { ...formData };

        // Dynamically assign riddle and answer based on the riddleNumber
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
        setRiddleError(''); // Clear any previous error
      } else {
        setRiddleError('No riddles found in response.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRiddleError(error.message);
      } else {
        setRiddleError('An unexpected error occurred.');
      }
    } finally {
      setLoadingRiddles(false); // Set loading state to false once done
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let valid = true;
    let newErrors = {} as Record<string, string>;
  
    // Validate form data...
    if (!formData.roomName) {
      valid = false;
      newErrors.roomName = 'Room name is required';
    }
  
    if (!formData.roomDescription) {
      valid = false;
      newErrors.roomDescription = 'Room description is required';
    }
  
    if (!formData.roomType) {
      valid = false;
      newErrors.roomType = 'Room type is required';
    }
  
    // Validate riddles' answers...
    // You have your validation logic here...
  
    setErrors(newErrors);
  
    if (valid) {
      // Send the form data to the backend
      try {
        await axios.post('https://your-backend-api.com/rooms', {
          title: formData.roomName,
          description: formData.roomDescription,
          type: formData.roomType,
          difficulty: formData.roomDifficulty,
          image: formData.roomImage,  // Assuming you added an image URL to form data
          riddles: [
            { text: formData.riddleOneText, answer: formData.riddleOneAnswer },
            { text: formData.riddleTwoText, answer: formData.riddleTwoAnswer },
            { text: formData.riddleThreeText, answer: formData.riddleThreeAnswer },
            { text: formData.riddleFourText, answer: formData.riddleFourAnswer },
          ],
        });
        // You can show a success message here or navigate the user
        alert('Room created successfully');
      } catch (error) {
        console.error('Error creating room:', error);
        alert('Failed to create room');
      }
    }
  };

  return (
    <>
      <Nav />
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

             {/* Room Type Field */}
             <div className="mb-4">
                <label htmlFor="roomDifficulty" className="block text-lg mb-2 text-stone-200">Room Difficulty(1 easy - 5 Difficult)</label>
                <select
                  id="roomDifficulty"
                  name="roomDifficulty"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Room Difficulty</option>
                  <option value="number">1</option>
                  <option value="letter">2</option>
                  <option value="word">3</option>
                  <option value="word">4</option>
                  <option value="word">5</option>
                </select>
                {errors.roomType && <p className="text-red-500">{errors.roomType}</p>}
              </div>


              {/* Room Type Field */}
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
                  <option value="word">Word</option>
                </select>
                {errors.roomType && <p className="text-red-500">{errors.roomType}</p>}
              </div>
              </fieldset>

              <hr className="m-8" />
              <fieldset>
              {/* Riddle 1 */}
              <div className="mb-4">
                <label htmlFor="riddleOneText" className="block text-lg mb-2 text-stone-200">Riddle One </label>
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
                {riddleError && <p className="text-red-500">{riddleError}</p>}
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
                onClick={() => fetchRiddle(1)} // Call fetchRiddle for riddle 1
                className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                disabled={loadingRiddles}
              >
                {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
              </button>
              </fieldset>
              <hr className="m-8" />

              <fieldset>
              {/* Riddle 2 */}
              <div className="mb-4">
                <label htmlFor="riddleTwoText" className="block text-lg mb-2 text-stone-200">Riddle Two </label>
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
                {riddleError && <p className="text-red-500">{riddleError}</p>}
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
                onClick={() => fetchRiddle(2)} // Call fetchRiddle for riddle 2
                className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                disabled={loadingRiddles}
              >
                {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
              </button>
              </fieldset>
              <hr className="m-8" />

              <fieldset>
              {/* Riddle 3 */}
              <div className="mb-4">
                <label htmlFor="riddleThreeText" className="block text-lg mb-2 text-stone-200">Riddle Three </label>
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
                {riddleError && <p className="text-red-500">{riddleError}</p>}
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
                onClick={() => fetchRiddle(3)} // Call fetchRiddle for riddle 3
                className="w-auto p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                disabled={loadingRiddles}
              >
                {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
              </button>

              </fieldset>
              <hr className="m-8" />

              <fieldset>
              {/* Riddle 4 */}
              <div className="mb-4">
                <label htmlFor="riddleFourText" className="block text-lg mb-2 text-stone-200">Riddle Four </label>
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
                {riddleError && <p className="text-red-500">{riddleError}</p>}
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
                onClick={() => fetchRiddle(4)} // Call fetchRiddle for riddle 4
                className="w-auto p-4 p-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md mt-4"
                disabled={loadingRiddles}
              >
                {loadingRiddles ? 'Loading...' : 'Generate Riddle'}
              </button>
              </fieldset>
              <hr className="m-8" />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md"
                disabled={loadingRiddles} // Disable button while loading riddles
              >
                {loadingRiddles ? 'Loading...' : 'Create Room'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateRoom;