import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";

export function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <NavLink to="/main">Main</NavLink>
      <NavLink to="/roomatefind">Roomate Find</NavLink>
      <NavLink to="/houselistingfind">House Listing Find</NavLink>
      {currentUser === undefined && <NavLink to="/login">Login</NavLink>}
      {currentUser !== undefined && (
        <>
          <a className="nav-link"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </a>
          <NavLink to="/profile">Profile</NavLink>
        </>
      )}
    </nav>
  );
}
