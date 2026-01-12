import { NavLink } from "react-router";

export function NavBar() {
  return (
    <nav>
      <NavLink to="/main">Main</NavLink>
      <NavLink to="/roomatefind">Roomate Find</NavLink>
      <NavLink to="/houselistingfind">House Listing Find</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}
