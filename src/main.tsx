import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login.tsx";
import { Main } from "./pages/Main.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { Register } from "./pages/Register.tsx";
import { Profile } from "./pages/Profile.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { EditProfile } from "./pages/EditProfile.tsx";
import { FindHouse } from "./pages/FindHouse.tsx";
import { FindRoommate } from "./pages/FindRoommate.tsx";
import { YourHouseListing } from "./pages/YourHouseListing.tsx";
import { RoommatePrefrences } from "./pages/RoommatePrefrences.tsx";
import { RoommateProfile } from "./pages/RoommateProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Main },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/roommateprofile", Component: RoommateProfile }, // to set own users' profile
      { path: "/roommatepreferences", Component: RoommatePrefrences }, // to set own preferences
      { path: "/housepreferences", Component: Register }, // to set house preferences
      { path: "/main", Component: Main },
      { path: "/findroomate", Component: FindRoommate }, //to find roommates
      { path: "/roomate", Component: Login }, //to see roommates profiles
      { path: "/findhouse", Component: FindHouse }, //to find houses
      { path: "/houselisting", Component: Login }, //to see house one listing
      { path: "/addhouselisting", Component: Login }, //to add own house listing
      { path: "/managehouselising", Component: YourHouseListing }, //to manage own house listings
      { path: "/profile", Component: Profile }, // to see own profile
      { path: "/editprofile", Component: EditProfile }, // to edit own profile
      { path: "/admin", Component: EditProfile }, // admin page ?? 
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider> 
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
