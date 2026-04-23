/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import type {
  RateHouse,
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

  getUserById: async (_id: number) => undefined as unknown as User,
  changeUserData: async (_newData: Partial<User>) => { },

  getHasRoommatePref: async () => false,
  getRoommatePref: async () => undefined as unknown as RoommatePref,
  addRoommatePref: async (_newData: Partial<RoommatePref>) => { },
  editRoommatePref: async (_newData: Partial<RoommatePref>) => { },
  changeRoommatePref: async (_newData: Partial<RoommatePref>) => { },

  getMatches: async () => [] as UserNecesarry[],
  addLiked: async (_id: number) => { },
  getLikes: async () => [] as User[],
  likesMatches: async () => [] as User[],
  likedUser: async () => [] as User[],
  rateUser: async (_id: number, _data: Partial<RateUser>) => { },

  createAdmin: async (_newData: Partial<User>) => { },
  adminList: async () => [] as User[],
  pendingRoommateRatings: async () => [] as RateUser[],
  pendingHouseRatingList: async () => [] as RateHouse[],
  approveRoommateRating: async (_id:number) => { },
  approveHouseRating: async (_id:number) => { },

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
      errorCheckUser(response);
    }

    return (await response.json()) as User;
  }

  useEffect(() => {
    if (!currentUserId) {
      setUserData(undefined);
      return;
    }

    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, [currentUserId]);

  const contextValue: UserContextType = {
    userData,

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

    async likesMatches(): Promise<User[]> {
      const response = await fetch(API_URL + "/user/likes-matches", {
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

    async likedUser(): Promise<User[]> {
      const response = await fetch(API_URL + "/user/likes-received", {
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

    async createAdmin(newData: Partial<User>): Promise<void> {
      await fetch(API_URL + `/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newData),
      });
    },

    async adminList(): Promise<User[]> {
      const response = await fetch(API_URL + "/admin/adminList", {
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

    async pendingRoommateRatings(): Promise<RateUser[]> {
      const response = await fetch(API_URL + "/admin/roommateRatingList", {
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

      return (await response.json()) as RateUser[];
    },

    async pendingHouseRatingList(): Promise<RateHouse[]> {
      const response = await fetch(API_URL + "/admin/houseRatingList", {
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

      return (await response.json()) as RateHouse[];
    },

    async approveRoommateRating(id: number): Promise<void> {
      await fetch(API_URL + `/admin/aproveRoommateRating/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
    },

    async approveHouseRating(id: number): Promise<void> {
      await fetch(API_URL + `/admin/aproveHouseRating/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
