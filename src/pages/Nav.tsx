import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavBar() {
  const { currentUserId } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex items-center justify-between p-2 md:p-3">
        {/**mobile */}
        <Sheet>
          <SheetTrigger asChild className="sm:hidden">
            <Button className="sm:hidden" variant={"outline"}>
              <Menu size={30} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Mobile navigation</SheetDescription>
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
            </div>
          </SheetContent>
        </Sheet>

        {/**desktop */}
        <NavigationMenu className="hidden sm:flex gap-3">
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
        </NavigationMenu>

        {currentUserId !== undefined && (
                <>
                  <NavLink to="/profile">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
                </NavLink>
                </>
              )}
      </div>
    </nav>
  );
}
