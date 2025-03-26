import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";







const Header = () => {

  const { isLoggedIn } = useAppContext();
    
  return ( 
    
  
  <div className="bg-dgreen py-4">
    
    <div className="container mx-auto flex justify-center gap-9">
        
            
    <Link to="/"><img src="innquire-logo.png" width="60" /></Link>
        
        <span className="flex space-x-2">
          {isLoggedIn ? ( 
            <>
            <Link 
            className="flex items-center text-white px-3 font-bold rounded hover:bg-shadow"
            to="/my-bookings">My Bookings</Link>
            <Link 
            className="flex items-center text-white px-3 font-bold rounded hover:bg-shadow"
            to="/my-hotels">My Hotels</Link>
            < SignOutButton />
            </> ): (
               <Link to="/sign-in" className="flex items-center text-white px-3 font-bold rounded hover:bg-shadow">
            Sign-In
            </Link>
            )
        }
         
        </span>
    </div>
  </div>
  
  );
};

export default Header;