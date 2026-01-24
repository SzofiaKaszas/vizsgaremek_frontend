import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";

export function NavBar() {
  const { currentUserId, logout } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  return (
    <nav className="navbar">
      <NavLink to="/main">Main</NavLink>
      {userData?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      {userData?.lookingForPeople === true && <NavLink to="/roomatefind">Roomate Find</NavLink>}
      {userData?.lookingForHouse === true && <NavLink to="/houselistingfind">House Listing Find</NavLink>}
      {userData?.hasHouse === true && <NavLink to="/managehouselising">Your House Listings</NavLink>}
      {currentUserId === undefined && <NavLink to="/login">Login</NavLink>}
      {currentUserId !== undefined && (
        <>
          <a
            className="nav-link"
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
