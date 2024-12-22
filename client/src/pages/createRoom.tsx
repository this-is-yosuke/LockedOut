import React, { useState } from 'react';
import axios from 'axios';
import { Nav, Footer } from '../containers';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = {
      title: formData.roomName,
      description: formData.roomDescription,
      type: formData.roomType,
      difficulty: Number(formData.roomDifficulty),
      image: formData.roomImage,
      creatorID: 1,
      riddles: [
        { content: formData.riddleOneText, answer: formData.riddleOneAnswer, name: formData.riddleOneName },
        { content: formData.riddleTwoText, answer: formData.riddleTwoAnswer, name: formData.riddleTwoName },
        { content: formData.riddleThreeText, answer: formData.riddleThreeAnswer, name: formData.riddleThreeName },
        { content: formData.riddleFourText, answer: formData.riddleFourAnswer, name: formData.riddleFourName },
      ],
    };

    try {
      const response = await axios.post('http://localhost:3001/api/rooms', formDataToSend);
      console.log('Room creation response:', response);
      alert('Room created successfully');
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room and riddles');
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
      <Footer />
    </>
  );
};

export default CreateRoom;