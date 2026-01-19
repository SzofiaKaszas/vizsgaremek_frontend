import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User } from "../interfaces";

const API_URL = "http://localhost:3000";

//make interface for context
const defaultAuthContext = {
  currentUser: undefined as User | undefined,
  login(email: string, password: string) {},
  logout() {},
  register(
    //make interface for register function
    firstName: string,
    lastName: string,
    connectionEmail: string,
    phoneNumber: string,
    hasHouse: boolean,
    lookingForPeople: boolean,
    password: string,
    email: string
  ) {},
};

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
      loadUserData(storedToken);
    }
  }, []);

  const contextValue = {
    currentUser: user,
    async login(email: string, password: string) {
      const response = await fetch(API_URL + "/user-login/login", {
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
      connectionEmail: string,
      phoneNumber: string,
      hasHouse: boolean,
      lookingForPeople: boolean,
      password: string,
      email: string
    ) {
      const response = await fetch(API_URL + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          connectionEmail,
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
