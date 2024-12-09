import CTAButton from "./CTAbutton";

const HeaderContent = () => {
  return (
    <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white px-4 sm:px-6 lg:px-8">
      <div>
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Escape the Mystery
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
          Can you solve all four riddles before the clock runs out? You must answer correctly to unlock the final lock. Time is ticking!
        </p>

        {/* Call to Action Button */}
        <CTAButton />
      </div>
    </div>
  );
};

export default HeaderContent;