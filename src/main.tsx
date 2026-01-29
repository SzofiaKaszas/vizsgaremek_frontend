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
      { path: "/roommateprofile", Component: RoommateProfile },
      { path: "/roommatepreferences", Component: RoommatePrefrences },
      { path: "/housepreferences", Component: Register },
      { path: "/main", Component: Main },
      { path: "/findroomate", Component: FindRoommate },
      { path: "/roomate", Component: Login },
      { path: "/findhouse", Component: FindHouse },
      { path: "/houselisting", Component: Login },
      { path: "/addhouselisting", Component: Login },
      { path: "/managehouselising", Component: YourHouseListing },
      { path: "/profile", Component: Profile },
      { path: "/editprofile", Component: EditProfile },
      { path: "/admin", Component: EditProfile },
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
