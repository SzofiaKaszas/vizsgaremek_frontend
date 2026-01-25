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

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Main },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/roomatepreferences", Component: Register },
      { path: "/housepreferences", Component: Register },
      { path: "/main", Component: Main },
      { path: "/roomatefind", Component: Login },
      { path: "/roomate", Component: Login },
      { path: "/houselistingfind", Component: FindHouse },
      { path: "/houselisting", Component: Login },
      { path: "/addhouselisting", Component: Login },
      { path: "/managehouselising", Component: Login },
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
