import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";

export function NavBar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (currentUser === undefined) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <nav>
      <NavLink to="/main">Main</NavLink>
      <NavLink to="/roomatefind">Roomate Find</NavLink>
      <NavLink to="/houselistingfind">House Listing Find</NavLink>
      {!isUserLoggedIn && <NavLink to="/login">Login</NavLink>}
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}
