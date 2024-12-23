import Lock from '../assets/lock.png';
const NavLogo = () => {
    return (<div className="flex items-center">
      <img className="h-6 w-6 text-white mr-2" src={Lock}/>
      <div className="text-2xl font-semibold">Locked Out</div>
    </div>);
};
export default NavLogo;
