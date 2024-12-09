
import {HeaderOverlay, HeaderContent} from "../components";

const Header = () => {
  return (
    <header
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503332132010-d1b77a049ddd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark Overlay */}
      <HeaderOverlay />
  
      {/* Header Content */}
      <HeaderContent />
    </header>
  );
};

export default Header;