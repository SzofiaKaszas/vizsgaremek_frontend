/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  RoommatePref,
  User,
  UserContextType,
  UserNecesarry,
} from "../interfaces";
import { AuthContext } from "./authContext";
import { errorCheckUser, errorCheckUserEdit } from "./errorCheck";

const API_URL = "http://localhost:3000";
//TODO: get error from backend
const defaultUserContext: UserContextType = {
  userData: undefined as User | undefined,
  getUserById: async (_id: number) => undefined as unknown as User,
  changeUserData: async (_newData: Partial<User>) => {},
  getHasRoommatePref: async (): Promise<boolean> => false,
  addRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  editRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  getMatches: async () => [] as UserNecesarry[],
  changeRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  addLiked: async (_id: number) => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(defaultUserContext);

/**TODO: check links cus they change -- ones that have id in them */
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
      errorCheckUser(response);
      return undefined;
    }

    const userData = (await response.json()) as User;
    return userData;
  }

  useEffect(() => {
    if (!currentUserId) {
      (async () => {
        setUserData(undefined);
      })();
      return;
    } else {
      (async () => {
        const user = await getUser();
        setUserData(user);
      })();
    }
  }, [currentUserId]);

  const contextValue = {
    userData: userData,
    async getUserById(id: number): Promise<User> {
      const response = await fetch(API_URL + `/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckUser(response);
        return undefined as unknown as User;
      }

      const roommateData = (await response.json()) as User;
      return roommateData;
    },

    async changeUserData(newData: Partial<User>): Promise<void> {
      const response = await fetch(API_URL + `/user/${userData?.idUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        errorCheckUserEdit(response);
        return;
      }
      const updatedUser = (await response.json()) as User;
      setUserData(updatedUser);
    },

    async getHasRoommatePref(): Promise<boolean> {
      try {
        const response = await fetch(
          API_URL + `/roommates-prefrences/${userData?.idUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          },
        );

        if (!response.ok) {
          return false; // backend error, no preferences
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          return false;
        }

        return true;
      } catch (err) {
        console.error("getHasRoommatePref crashed:", err);
        return false;
      }
    },

    async addRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      const response = await fetch(API_URL + `/roommates-prefrences/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        errorCheckUser(response);
        return;
      }
    },

    async editRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      console.log("Editing roommate preferences with data:", userData?.idUser);
      const response = await fetch(
        API_URL + `/roommates-prefrences/${userData?.idUser}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(newData),
        },
      );

      if (!response.ok) {
        errorCheckUserEdit(response);
        return;
      }
    },

    async getMatches(): Promise<UserNecesarry[]> {
      const response = await fetch(
        API_URL + "/roommates-prefrences/getmatches",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        },
      );

      if (!response.ok) {
        errorCheckUser(response);
        return [];
      }

      let prefrenceList;
      try {
        prefrenceList = await response.json();
        console.log(prefrenceList);
      } catch {
        throw new Error("Server did not return JSON");
      }
      return prefrenceList as UserNecesarry[];
    },

    async changeRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      const response = await fetch(
        API_URL + `/roommates-prefrences/${userData?.idUser}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(newData),
        },
      );

      if (!response.ok) {
        errorCheckUserEdit(response);
        return;
      }
      const updatedUser = (await response.json()) as User;
      setUserData(updatedUser);
    },

    async addLiked(id: number): Promise<void> {
      const response = await fetch(API_URL + `like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckUser(response);
        return;
      }
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
