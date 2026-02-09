import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function NavBar() {
  const { currentUserId } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  return (
    <NavigationMenu>
      <NavigationMenuLink asChild>
        <NavLink to="/main">Main</NavLink>
      </NavigationMenuLink>
      {userData?.role === "admin" && (
        <NavigationMenuLink asChild>
          <NavLink to="/admin">Admin</NavLink>
        </NavigationMenuLink>
      )}

      {(userData?.lookingForPeople === true || userData === undefined) && (
        <NavigationMenuLink asChild>
          <NavLink to="/findroomate">Roomate Find</NavLink>
        </NavigationMenuLink>
      )}

      {(userData?.lookingForHouse === true || userData === undefined) && (
        <NavigationMenuLink asChild>
          <NavLink to="/findhouse">House Listing Find</NavLink>
        </NavigationMenuLink>
      )}

      {(userData?.hasHouse === true || userData === undefined) && (
        <NavigationMenuLink asChild>
          <NavLink to="/managehouselising">Your House Listings</NavLink>
        </NavigationMenuLink>
      )}

      {currentUserId === undefined && (
        <NavigationMenuLink asChild>
          <NavLink to="/login">Login</NavLink>
        </NavigationMenuLink>
      )}

      {currentUserId !== undefined && (
        <>
          <NavigationMenuLink asChild>
            <NavLink to="/logout">Logout</NavLink>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <NavLink to="/profile">Profile</NavLink>
          </NavigationMenuLink>
        </>
      )}
    </NavigationMenu>
  );
}
