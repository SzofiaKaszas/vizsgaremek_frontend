import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**ha van houselistingje up akkor is mutassa a navon a cuccot ha nincs berakva az hogy akar hazat eladni */
export function NavBar() {
  const { currentUserId } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [_, setForceUpdate] = useState(0);

  const navItems = [
    { to: "/main", label: "Main" },
    userData?.role === "admin" && { to: "/admin", label: "Admin" },
    (userData?.lookingForPeople || userData === undefined) && {
      to: "/findroomate",
      label: "Roommates",
    },
    (userData?.lookingForHouse || userData === undefined) && {
      to: "/findhouse",
      label: "Houses",
    },
    userData && { to: "/likes", label: "Likes" },
    (userData?.hasHouse || userData === undefined) && {
      to: "/managehouselising",
      label: "Listings",
    },
    currentUserId === undefined && { to: "/login", label: "Login" },
  ].filter(Boolean) as { to: string; label: string }[];

  const profileImage =
  userData?.images?.[0]?.url || undefined;
  if(userData?.images.length != 0){
    /*userData.images.forEach(element => {
      if(element.IsProfile){
        profileImage = element.url;
      }
    });*/
  }

  useEffect(() => {
  const sync = () => {
    setForceUpdate((x) => x + 1);
  };

  window.addEventListener("auth-change", sync);

  return () => window.removeEventListener("auth-change", sync);
}, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">

        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="relative w-8 h-8 flex items-center justify-center">

                <span
                  className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "rotate-45" : "-translate-y-2"
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "opacity-0" : ""
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "-rotate-45" : "translate-y-2"
                    }`}
                />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-white/95 backdrop-blur-xl border-r border-slate-200 p-0"
            >
              <div className="pt-8 pb-[env(safe-area-inset-bottom)] px-6 flex flex-col">

                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `py-4 text-base font-medium border-b border-slate-200 transition
                      ${isActive
                        ? "text-purple-600 scale-[1.03]"
                        : "text-slate-700 hover:text-purple-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 flex justify-center sm:justify-start">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Kezzy
          </span>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden sm:flex items-center gap-6 mr-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {({ isActive }) => (
                  <span
                    className={`relative text-[15px] font-semibold transition pb-1 cursor-pointer
        ${isActive
                        ? "text-purple-600 scale-105"
                        : "text-slate-600 hover:text-purple-600"
                      }`}
                  >
                    {item.label}

                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-purple-500 transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {currentUserId && (
            <NavLink to="/profile">
              <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-purple-500 transition">
                <AvatarImage src={profileImage} />
                <AvatarFallback>
                  P
                </AvatarFallback>
              </Avatar>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}