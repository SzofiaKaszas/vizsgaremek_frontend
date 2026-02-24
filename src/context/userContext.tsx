/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  HousePref,
  RoommatePref,
  User,
  UserContextType,
} from "../interfaces";
import { AuthContext } from "./authContext";

const API_URL = "http://localhost:3000";

const defaultUserContext: UserContextType = {
  userData: undefined as User | undefined,
  changeUserData: async (_newData: Partial<User>) => {},
  getHasRoommatePref: async () : Promise<boolean> => false,
  addRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  editRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  getMatches: async () => [] as User[],
  changeRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  addHousePref: async (_newData: Partial<HousePref>) => {}, /**TODO: move to houseContext */
};

// eslint-disable-next-line react-refresh/only-export-components
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
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }
      const updatedUser = (await response.json()) as User;
      setUserData(updatedUser);
    },

    async getHasRoommatePref(): Promise<boolean> {
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
        switch (response.status) {
          case 403:
            console.error("Invalid credentials");
            return false;
          default:
            console.error("Failed to load roommate preferences");
            return false;
        }
      }

      return true;
    },

    async addRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      const response = await fetch(
        API_URL + `/roommates-prefrences/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(newData),
        },
      );
      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }
    },

    async editRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      console.log("Editing roommate preferences with data:", userData?.idUser);
      const response = await fetch(API_URL + `/roommates-prefrences/${userData?.idUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }
    },

    async getMatches(): Promise<User[]> {
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
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }

      let prefrenceList;
      try {
        prefrenceList = await response.json();
      } catch {
        throw new Error("Server did not return JSON");
      }
      return prefrenceList as User[];
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
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }
      const updatedUser = (await response.json()) as User;
      setUserData(updatedUser);
    },

    async addHousePref(newData: Partial<HousePref>): Promise<void> {
      const response = await fetch(API_URL + `/house-search-prefrences/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("Invalid credentials");
          default:
            throw new Error("Something went wrong");
        }
      }
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
