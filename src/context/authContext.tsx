/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { AuthContextType, User } from "../interfaces";

const API_URL = "http://localhost:3000";

const defaultAuthContext: AuthContextType = {
  currentUser: undefined as User | undefined,
  login(email: string, password: string) {},
  logout() {},
  register() //make interface for register function

  {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(defaultAuthContext);

export function AuthContextProvider(props: PropsWithChildren) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);

  async function loadUserData(token: string) {
    if (!token) {
      console.warn("No token provided for loading user data");
      return;
    }

    const response = await fetch(API_URL + "/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      (async () => {
        await loadUserData(storedToken);
      })();
    }
  }, []);

  const contextValue = {
    currentUser: user,
    async login(email: string, password: string) {
      const response = await fetch(API_URL + "/user/login", {
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

    async register(
      firstName: string,
      lastName: string,
      phoneNumber: string,
      hasHouse: boolean,
      lookingForPeople: boolean,
      password: string,
      email: string,
    ) {
      const response = await fetch(API_URL + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          hasHouse,
          lookingForPeople,
          password,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const newUser = await response.json();
      console.log("Registration response:", newUser);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
