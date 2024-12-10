const How = () => {
    return (
      <>
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* How it Works Text Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">How It Works</h2>
              <p className="text-lg sm:text-xl text-stone-200 max-w-3xl mx-auto">
                You’re on a solo mission to solve 4 challenging riddles and unlock a lock! Our escape rooms are crafted to test your intellect, creativity, and problem-solving abilities. You'll have 30 minutes to crack the riddles, find hidden clues, and unlock the final lock before time runs out.
              </p>
            </div>
  
            {/* Three-Part Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center p-6 bg-stone-800 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">
                  {/* Icon (replace with your choice) */}
                  <svg
                    className="w-12 h-12 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 2l6 6-6 6m12-12l-6 6 6 6"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-200 mb-2">Choose Your Room</h3>
                <p className="text-stone-400">
                  Select from our range of themed rooms, each offering a unique challenge and immersive experience.
                </p>
              </div>
  
              {/* Step 2 */}
              <div className="text-center p-6 bg-stone-800 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">
                  {/* Icon (replace with your choice) */}
                  <svg
                    className="w-12 h-12 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-200 mb-2">Solve the Puzzles</h3>
                <p className="text-stone-400">
                  Work together as a team to decipher clues, solve puzzles, and unlock the mysteries of the room.
                </p>
              </div>
  
              {/* Step 3 */}
              <div className="text-center p-6 bg-stone-800 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">
                  {/* Icon (replace with your choice) */}
                  <svg
                    className="w-12 h-12 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m-3 0l-3-3m3-3V3"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-200 mb-2">Escape in Time</h3>
                <p className="text-stone-400">
                  Use your time wisely! You have 30 minutes to unlock the lock. Can you do it before time runs out?
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default How;