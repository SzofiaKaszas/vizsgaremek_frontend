/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import type {
  RateUser,
  RoommatePref,
  User,
  UserContextType,
  UserNecesarry,
} from "../interfaces";

import { AuthContext } from "./authContext";
import { errorCheckUser, errorCheckUserEdit } from "./errorCheck";

const API_URL = "http://localhost:3000";

const defaultUserContext: UserContextType = {
  userData: undefined as unknown as User,

  hasCompletedStepOne: false,
  hasCompletedStepTwo: false,
  hasCompletedStepThree: false,

  setHasCompletedStepOne: () => {},
  setHasCompletedStepTwo: () => {},
  setHasCompletedStepThree: () => {},

  getUserById: async (_id: number) => undefined as unknown as User,
  changeUserData: async (_newData: Partial<User>) => {},
  getHasRoommatePref: async () => false,
  getRoommatePref: async () => undefined as unknown as RoommatePref,
  addRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  editRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  getMatches: async () => [] as UserNecesarry[],
  changeRoommatePref: async (_newData: Partial<RoommatePref>) => {},
  addLiked: async (_id: number) => {},
  getLikes: async () => [] as User[],
  rateUser: async (_id: number, _data: Partial<RateUser>) => {},
};

export const UserContext = createContext(defaultUserContext);

export function UserContextProvider(props: PropsWithChildren) {
  const { currentUserId } = useContext(AuthContext);

  const [userData, setUserData] = useState<User | undefined>(undefined);

  const [hasCompletedStepOne, setHasCompletedStepOne] = useState(false);
  const [hasCompletedStepTwo, setHasCompletedStepTwo] = useState(false);
  const [hasCompletedStepThree, setHasCompletedStepThree] = useState(false);

  async function getUser() {
    const response = await fetch(API_URL + `/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    if (!response.ok) {
      errorCheckUser(response);
    }

    return (await response.json()) as User;
  }

  useEffect(() => {
    if (!currentUserId) {
      setUserData(undefined);

      setHasCompletedStepOne(false);
      setHasCompletedStepTwo(false);
      setHasCompletedStepThree(false);

      return;
    }

    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, [currentUserId]);

  useEffect(() => {
    console.log("STEP STATE:", hasCompletedStepOne);
  }, [hasCompletedStepOne]);

  const contextValue: UserContextType = {
    userData,

    hasCompletedStepOne,
    hasCompletedStepTwo,
    hasCompletedStepThree,

    setHasCompletedStepOne,
    setHasCompletedStepTwo,
    setHasCompletedStepThree,

    async getUserById(id: number): Promise<User> {
      const response = await fetch(API_URL + `/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckUser(response);
      }

      return (await response.json()) as User;
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

        if (!response.ok) return false;

        const data = await response.json();
        return !!data && Object.keys(data).length > 0;
      } catch {
        return false;
      }
    },

    async getRoommatePref(): Promise<RoommatePref | undefined> {
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
          errorCheckUserEdit(response);
          return;
        }

        return (await response.json()) as RoommatePref;
      } catch {
        return;
      }
    },

    async addRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      await fetch(API_URL + `/roommates-prefrences/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });
    },

    async editRoommatePref(newData: Partial<RoommatePref>): Promise<void> {
      await fetch(API_URL + `/roommates-prefrences/${userData?.idUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });
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

      return (await response.json()) as UserNecesarry[];
    },

    async addLiked(id: number): Promise<void> {
      await fetch(API_URL + `/user/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
    },

    async getLikes(): Promise<User[]> {
      const response = await fetch(API_URL + "/user/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckUser(response);
        return [];
      }

      return (await response.json()) as User[];
    },

    async rateUser(id: number, data: Partial<RateUser>): Promise<void> {
      const response = await fetch(API_URL + `/user/rate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        errorCheckUser(response);
      }
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
