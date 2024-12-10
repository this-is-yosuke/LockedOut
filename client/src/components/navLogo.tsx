
const NavLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <svg className="h-6 w-6 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17v2m-6 0v-6a6 6 0 0 1 12 0v6m-6-6V7a3 3 0 1 0-6 0v4"></path>
      </svg>
      <div className="text-2xl font-semibold">Locked Out</div>
    </div>
  );
};

export default NavLogo;