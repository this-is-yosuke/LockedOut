import { Nav, Footer } from '../containers';
import { Lock } from '../assets';
import { useState } from 'react';

const CreateRoom: React.FC = () => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomDescription: '',
    roomImage: '',
    riddleOneText: '',
    riddleOneAnswer: '',
    riddleTwoText: '',
    riddleTwoAnswer: '',
    riddleThreeText: '',
    riddleThreeAnswer: '',
    riddleFourText: '',
    riddleFourAnswer: '',
    roomType: '',
  });

  const [errors, setErrors] = useState({} as Record<string, string>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate inputs
    let valid = true;
    let newErrors = {} as Record<string, string>;

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

    setErrors(newErrors);

    if (valid) {
      // Handle form submission, authentication, etc.
      console.log('Form submitted', formData);
    }
  };

  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-screen m-6">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">

          {/* Create Room Form Section */}
          <div className="w-full p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Create a New Room</h2>
            <form onSubmit={handleSubmit}>
              {/* Room Name Field */}
              <div className="mb-4">
                <label htmlFor="roomName" className="block text-lg mb-2 text-stone-200">
                  Room Name
                </label>
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
                <label htmlFor="roomDescription" className="block text-lg mb-2 text-stone-200">
                  Room Description
                </label>
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
                <label htmlFor="roomImage" className="block text-lg mb-2 text-stone-200">
                  Room Image URL
                </label>
                <input
                  type="text"
                  id="roomImage"
                  name="roomImage"
                  value={formData.roomImage}
                  onChange={handleChange}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the room image URL"
                />
              </div>
                <hr />
              {/* Riddle One Text Field */}
              <div className="mb-4">
                <label htmlFor="riddleOneText" className="block text-lg mb-2 text-stone-200">
                  Riddle One Text
                </label>
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

              {/* Riddle One Answer Field */}
              <div className="mb-4">
                <label htmlFor="riddleOneAnswer" className="block text-lg mb-2 text-stone-200">
                  Riddle One Answer
                </label>
                <input
                  type="text"
                  id="riddleOneAnswer"
                  name="riddleOneAnswer"
                  value={formData.riddleOneAnswer}
                  onChange={handleChange}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the answer to the first riddle"
                  required
                />
              </div>

                <hr />
              {/* Riddle Two Text Field */}
              <div className="mb-4">
                <label htmlFor="riddleTwoText" className="block text-lg mb-2 text-stone-200">
                  Riddle Two Text
                </label>
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

              {/* Riddle Two Answer Field */}
              <div className="mb-4">
                <label htmlFor="riddleTwoAnswer" className="block text-lg mb-2 text-stone-200">
                  Riddle Two Answer
                </label>
                <input
                  type="text"
                  id="riddleTwoAnswer"
                  name="riddleTwoAnswer"
                  value={formData.riddleTwoAnswer}
                  onChange={handleChange}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the answer to the second riddle"
                  required
                />
              </div>

                <hr />
              {/* Riddle Three Text Field */}
              <div className="mb-4">
                <label htmlFor="riddleThreeText" className="block text-lg mb-2 text-stone-200">
                  Riddle Three Text
                </label>
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

              {/* Riddle Three Answer Field */}
              <div className="mb-4">
                <label htmlFor="riddleThreeAnswer" className="block text-lg mb-2 text-stone-200">
                  Riddle Three Answer
                </label>
                <input
                  type="text"
                  id="riddleThreeAnswer"
                  name="riddleThreeAnswer"
                  value={formData.riddleThreeAnswer}
                  onChange={handleChange}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the answer to the third riddle"
                  required
                />
              </div>

            <hr />
{/* Riddle Four Text Field */}
<div className="mb-4">
  <label htmlFor="riddleFourText" className="block text-lg mb-2 text-stone-200">
    Riddle Four Text
  </label>
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

{/* Riddle Four Answer Field */}
<div className="mb-4">
  <label htmlFor="riddleFourAnswer" className="block text-lg mb-2 text-stone-200">
    Riddle Four Answer
  </label>
  <input
    type="text"
    id="riddleFourAnswer"
    name="riddleFourAnswer"
    value={formData.riddleFourAnswer}
    onChange={handleChange}
    className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter the answer to the fourth riddle"
    required
  />
</div>

{/* Room Type Field */}
<div className="mb-4">
  <label htmlFor="roomType" className="block text-lg mb-2 text-stone-200">
    Room Type
  </label>
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

{/* Submit Button */}
<button
  type="submit"
  className="w-full p-3 bg-red-500 rounded-lg text-white text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  Create Room
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
