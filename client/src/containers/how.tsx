import React from 'react';
import {HowItWorksSection, Step} from '../components'

const How: React.FC = () => {
  return (
    <section className="bg-stone-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How it Works Text Section */}
        <HowItWorksSection />

        {/* Three-Part Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Step 1 */}
          <Step 
            iconPath="M6 2l6 6-6 6m12-12l-6 6 6 6" 
            title="Choose Your Room" 
            description="Select from our range of themed rooms, each offering a unique challenge and immersive experience." 
          />

          {/* Step 2 */}
          <Step 
            iconPath="M9 5l7 7-7 7" 
            title="Solve the Puzzles" 
            description="Work together as a team to decipher clues, solve puzzles, and unlock the mysteries of the room." 
          />

          {/* Step 3 */}
          <Step 
            iconPath="M12 8v4l3 3m-3 0l-3-3m3-3V3" 
            title="Escape in Time" 
            description="Use your time wisely! You have 30 minutes to unlock the lock. Can you do it before time runs out?" 
          />
        </div>
      </div>
    </section>
  );
};

export default How;