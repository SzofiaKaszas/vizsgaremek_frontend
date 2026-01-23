import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User } from "../interfaces";
import { AuthContext } from "./authContext";

const API_URL = "http://localhost:3000";

const defaultUserContext = {
  userData: undefined as User | undefined,
};

export const UserContext = createContext(defaultUserContext);

export function UserContextProvider(props: PropsWithChildren) {
  const { currentUserId } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | undefined>(undefined);

  async function getUser() {
    const response = await fetch(API_URL + `/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to load user data");
      return undefined;
    }
    const userData = (await response.json()) as User;
    return userData;
  }

  useEffect(() => {
    if (!currentUserId) {
      setUserData(undefined);
      return;
    } else {
      (async () => {
        const user = await getUser();
        setUserData(user);
      })();
    }
  }, [currentUserId]);

  const contextValue = { userData };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
