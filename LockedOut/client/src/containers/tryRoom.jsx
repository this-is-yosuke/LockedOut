import React from 'react'

const TryRoom = () => {
  return (
    <>
      {/* Section Title */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">Try Out a Room</h2>
            <p className="text-lg sm:text-xl text-stone-200 max-w-3xl mx-auto">
              Choose from our exciting escape rooms and test your skills. Each room offers a unique challenge designed to keep you on your toes.
            </p>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Room Card 1 */}
            <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Room 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-100 mb-2">Mystery Mansion</h3>
                <p className="text-stone-300 mb-4">A haunted mansion filled with secrets, puzzles, and traps. Can you escape before the clock runs out?</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <strong>Win Rate:</strong> 75%
                  </div>
                  <div>
                    <strong>Creator:</strong> John Doe
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <strong className="mr-1">Difficulty:</strong>
                    <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  </div>
                  <a href="#" className="text-red-600 hover:text-red-700 font-semibold">Try Now</a>
                </div>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Room 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-100 mb-2">The Pirate's Treasure</h3>
                <p className="text-stone-300 mb-4">Find hidden treasure on a pirate ship! Solve puzzles and navigate through the ship’s mysteries.</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <strong>Win Rate:</strong> 65%
                  </div>
                  <div>
                    <strong>Creator:</strong> Jane Smith
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <strong className="mr-1">Difficulty:</strong>
                    <span className="text-yellow-500">⭐⭐⭐</span>
                  </div>
                  <a href="#" className="text-red-600 hover:text-red-700 font-semibold">Try Now</a>
                </div>
              </div>
            </div>

            {/* Room Card 3 */}
            <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Room 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-100 mb-2">Escape the Lab</h3>
                <p className="text-stone-300 mb-4">A high-tech laboratory with secrets to uncover. Solve complex puzzles and escape before time runs out.</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <strong>Win Rate:</strong> 80%
                  </div>
                  <div>
                    <strong>Creator:</strong> Mike Johnson
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <strong className="mr-1">Difficulty:</strong>
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  </div>
                  <a href="#" className="text-red-600 hover:text-red-700 font-semibold">Try Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TryRoom;