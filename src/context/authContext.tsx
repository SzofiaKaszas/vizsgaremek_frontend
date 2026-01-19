/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, AuthContextType } from "../interfaces";

//make interface for context
const defaultAuthContext: AuthContextType = {
  currentUser: undefined as User | undefined,

  login: async (email: string, password: string) => {},
  logout: () => {},
  register: async (user: Omit<User, "idUser">) => ({
    idUser: 0,
    firstName: "",
    lastName: "",
    connectionEmail: "",
    phoneNumber: "",
    password: "",
    email: "",
    hasHouse: false,
    lookingForPeople: false,
  }),
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(defaultAuthContext);

const API_URL_BASE = "http://localhost:3000";

export function AuthContextProvider(props: PropsWithChildren) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);

  async function loadUserData(token: string) {
    if (!token) {
      console.warn("No token provided for loading user data");
      return;
    }

    //fetch user data
    const response = await fetch(API_URL_BASE + "/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //handle errors lo
    if (!response.ok) {
      console.error("Failed to load user data, logging out");
      setToken("");
      localStorage.removeItem("token");
      return;
    }
    const userData = (await response.json()) as User;
    setUser(userData);

    console.log(userData);
  }

  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    loadUserData(storedToken);
  }

  const contextValue = {
    currentUser: user,

    //#region Auth functions

    async login(email: string, password: string) {
      const response = await fetch(API_URL_BASE + "/user-login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        //check for 403
        throw new Error("Login failed");
      }
      const tokenObj = await response.json();
      setToken(tokenObj.token);
      localStorage.setItem("token", tokenObj.token);

      await loadUserData(tokenObj.token);
      console.log("Login response:", tokenObj);
    },
    logout() {
      setToken("");
      setUser(undefined);
      localStorage.removeItem("token");
    },
<<<<<<< HEAD
    async register(
      firstName: string,
      lastName: string,
      connectionEmail: string,
      phoneNumber: string,
      hasHouse: boolean,
      lookingForPeople: boolean,
      password: string,
      email: string
    ) {
      const response = await fetch(API_URL + "/user/register", {
=======
    async register(user: Omit<User, "idUser">) {
      const response = await fetch(API_URL_BASE + "/user/register", {
>>>>>>> 8e8509bb69f899faa1f2ccb190ff3056638bdd00
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const newUser = await response.json();
      console.log("Registration response:", newUser);
<<<<<<< HEAD
=======
      return user as User;
>>>>>>> 8e8509bb69f899faa1f2ccb190ff3056638bdd00
    },

    //#endregion
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
