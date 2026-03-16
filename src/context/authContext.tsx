/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { AuthContextType, User, UserToken } from "../interfaces";
import { errorCheckUser } from "./errorCheck";

// Base URL for all backend requests
const API_URL = "http://localhost:3000";

// Default values so React has an initial context shape
const defaultAuthContext: AuthContextType = {
  currentUserId: undefined as number | undefined,
  login: async (_email: string, _password: string) => [] as UserToken[],
  logout: async () => {},
  register: async (_user: Omit<User, "idUser">) => [] as User[],
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(defaultAuthContext);
// Creates the actual context object used by components (up)

export function AuthContextProvider(props: PropsWithChildren) {
  // Stores the JWT token in memory
  const [_token, setToken] = useState("");

  // Stores the logged‑in user's ID
  const [userid, setUser] = useState<number>();

  // Loads user ID from backend using the stored token
  async function loadUserData(token: string) {
    if (!token) {
      console.warn("No token provided for loading user data");
      return;
    }

    const response = await fetch(API_URL + "/user/getid", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // send token to backend
      },
    });

    // If token is invalid or expired → force logout
    if (!response.ok) {
      console.error("Failed to load user data, logging out");
      setToken("");
      localStorage.removeItem("token");
      return;
    }
    // Backend returns the user ID directly
    const userData = (await response.json()) as number;
    // Save user ID into state
    setUser(userData);
  }

  // Runs once on page load
  useEffect(() => {
    // Check if user was previously logged in
    const storedToken = localStorage.getItem("token");

    // If token exists → try loading user data
    if (storedToken) {
      (async () => {
        await loadUserData(storedToken);
      })();
    }
  }, []);

  const contextValue = {
    currentUserId: userid, // Exposed to components
    async login(email: string, password: string): Promise<UserToken[]> {
      // Sends login request to backend
      const response = await fetch(API_URL + "/user-token/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // login credentials
      });

      if (!response.ok) {
        // If backend returns error → throw readable message
        errorCheckUser(response);
      }

      // Backend returns: { token: "..." }
      const tokenObj = await response.json();
      // Save token in state
      setToken(tokenObj.token);
      // Persist token so user stays logged in on refresh
      localStorage.setItem("token", tokenObj.token);

      // Load user ID after successful login
      await loadUserData(tokenObj.token);
      return tokenObj as UserToken[];
    },

    logout() {
      // Clears all authentication data
      setToken("");
      setUser(undefined);
      localStorage.removeItem("token");
    },

    async register(user: Omit<User, "idUser">): Promise<User[]> {
      // Sends registration request to backend
      const response = await fetch(API_URL + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // user data without ID
      });

      // Handle backend errors
      if (!response.ok) {
        errorCheckUser(response);
      }

      let newUser;
      try {
        // Backend returns the created user
        newUser = await response.json();
      } catch {
        // If backend didn't return JSON
        throw new Error("Server did not return JSON");
      }
      return newUser as User[];
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Makes auth functions + user ID available to all children */}
      {props.children}
    </AuthContext.Provider>
  );
}
