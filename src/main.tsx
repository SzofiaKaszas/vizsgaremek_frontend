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
import { Logout } from "./pages/Logout.tsx";
import { SetUpProfile } from "./pages/SetUpProfile.tsx";
import { HouseContextProvider } from "./context/houseContext.tsx";
import { AddHouseListing } from "./pages/AddHouseListing.tsx";
import { Likes } from "./pages/Likes.tsx";
import { Admin } from "./pages/Admin.tsx";

//routing
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Main },
      { path: "/login", Component: Login },
      { path: "/logout", Component: Logout },
      { path: "/register", Component: Register },
      { path: "/setupprofile", Component:  SetUpProfile}, // to set up our own profile
      { path: "/main", Component: Main },
      { path: "/findroomate", Component: FindRoommate }, //to find roommates
      { path: "/roomate", Component: Login }, //to see roommates profiles
      { path: "/findhouse", Component: FindHouse }, //to find houses
      { path: "/houselisting", Component: Login }, //to see house one listing
      { path: "/likes", Component: Likes }, // to see who/what the user liked
      { path: "/addhouselisting", Component:  AddHouseListing }, //to add own house listing
      { path: "/managehouselising", Component: YourHouseListing }, //to manage own house listings
      { path: "/profile", Component: Profile }, // to see own profile
      { path: "/editprofile", Component: EditProfile }, // to edit own profile
      { path: "/admin", Component: Admin }, // admin page ?? 
    ],
  },
]);

//Context and routing
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider> 
      <UserContextProvider>
        <HouseContextProvider>
        <RouterProvider router={router} />
        </HouseContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
