import { Link } from "react-router-dom";

const CTAButton: React.FC = () => {
    return (
      <Link
        to='/register'
        className='bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-md inline-block transition duration-300'>
          PLAY NOW
        </Link>
    );
  };
  
  export default CTAButton;