import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function NavBar() {
  const { currentUserId } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between p-2 md:p-3">
        {/**mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button className="md:hidden" variant={"outline"}>
              <Menu size={30} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 mt-6">
              <NavLink to="/main">Main</NavLink>

              {userData?.role === "admin" && (
                <NavLink to="/admin">Admin</NavLink>
              )}

              {(userData?.lookingForPeople || userData === undefined) && (
                <NavLink to="/findroomate">Roommate Find</NavLink>
              )}

              {(userData?.lookingForHouse || userData === undefined) && (
                <NavLink to="/findhouse">House Listing Find</NavLink>
              )}

              {(userData?.hasHouse || userData === undefined) && (
                <NavLink to="/managehouselising">Your House Listings</NavLink>
              )}

              {currentUserId === undefined && (
                <NavLink to="/login">Login</NavLink>
              )}

              {currentUserId !== undefined && (
                <>
                  <NavLink to="/logout">Logout</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/**desktop */}
        <NavigationMenu className="hidden md:flex gap-3">
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
      </div>
    </nav>
  );
}
