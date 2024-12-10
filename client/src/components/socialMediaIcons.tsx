const SocialMediaIcons = () => {
    return (
      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2 2l2-2M5 6l2 2l2-2m2 12l2-2l2 2m2-12l2 2l2-2M3 18l2-2l2 2"></path>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12l-7 7l-7-7"></path>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v14h18V5H3zm6 12l4-4l4 4V7l-4 4l-4-4v10z"></path>
          </svg>
        </a>
      </div>
    );
  };
  
  export default SocialMediaIcons;