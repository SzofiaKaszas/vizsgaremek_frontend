import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavBar() {
  const { currentUserId } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  
  return (
    <nav className="out-nav">
      <div className="mx-auto flex items-center justify-between p-2">
        {/**mobile */}
        <div className="mobile-nav">
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button className="sm:hidden" variant={"outline"}>
                <Menu size={30} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation
              </SheetDescription>
              <div className="flex flex-col gap-4 mt-6">
                <NavLink className={"navigation-menu_link"} to="/main">
                  Main
                </NavLink>

                {userData?.role === "admin" && (
                  <NavLink className={"navigation-menu_link"} to="/admin">
                    Admin
                  </NavLink>
                )}

                {(userData?.lookingForPeople || userData === undefined) && (
                  <NavLink className={"navigation-menu_link"} to="/findroomate">
                    Roommate Find
                  </NavLink>
                )}

                {(userData?.lookingForHouse || userData === undefined) && (
                  <NavLink className={"navigation-menu_link"} to="/findhouse">
                    House Listing Find
                  </NavLink>
                )}

                {userData != undefined && (
                  <NavLink className={"navigation-menu_link"} to="/likes">
                    Likes
                  </NavLink>
                )}

                {(userData?.hasHouse || userData === undefined) && (
                  <NavLink
                    className={"navigation-menu_link"}
                    to="/managehouselising"
                  >
                    Your House Listings
                  </NavLink>
                )}

                {currentUserId === undefined && (
                  <NavLink className={"navigation-menu_link"} to="/login">
                    Login
                  </NavLink>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/**desktop */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu className="hidden sm:flex gap-3">
            <NavigationMenuLink asChild>
              <NavLink className={"navigation-menu_link"} to="/main">
                Main
              </NavLink>
            </NavigationMenuLink>
            {userData?.role === "admin" && (
              <NavigationMenuLink asChild>
                <NavLink className={"navigation-menu_link"} to="/admin">
                  Admin
                </NavLink>
              </NavigationMenuLink>
            )}

            {(userData?.lookingForPeople || userData === undefined) && (
              <NavigationMenuLink asChild>
                <NavLink className={"navigation-menu_link"} to="/findroomate">
                  Roomate Find
                </NavLink>
              </NavigationMenuLink>
            )}

            {(userData?.lookingForHouse || userData === undefined) && (
              <NavigationMenuLink asChild>
                <NavLink className={"navigation-menu_link"} to="/findhouse">
                  House Listing Find
                </NavLink>
              </NavigationMenuLink>
            )}

            {
              /*userData?.lookingForHouse === true || userData?.lookingForPeople === true ||*/ userData !=
                undefined && (
                <NavigationMenuLink asChild>
                  <NavLink className={"navigation-menu_link"} to="/likes">
                    Likes
                  </NavLink>
                </NavigationMenuLink>
              )
            }

            {(userData?.hasHouse || userData === undefined) && (
              <NavigationMenuLink asChild>
                <NavLink
                  className={"navigation-menu_link"}
                  to="/managehouselising"
                >
                  Your House Listings
                </NavLink>
              </NavigationMenuLink>
            )}

            {currentUserId === undefined && (
              <NavigationMenuLink asChild>
                <NavLink className={"navigation-menu_link"} to="/login">
                  Login
                </NavLink>
              </NavigationMenuLink>
            )}
          </NavigationMenu>
        </div>
        {currentUserId !== undefined && (
          <>
            <NavLink className={"navigation-menu_link"} to="/profile">
              <Avatar className="avatar">
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
