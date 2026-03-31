/* eslint-disable @typescript-eslint/no-unused-vars */

import type { HouseContextType, HouseListing, HousePref, RateHouse } from "@/interfaces";
import { useContext, type PropsWithChildren, createContext } from "react";
import { UserContext } from "./userContext";
import { errorCheckHouse } from "./errorCheck";

// Base URL for all backend requests
const API_URL = "http://localhost:3000";

// Default values so React has an initial context shape
const defaultUserContext: HouseContextType = {
  getHouseListings: async () => [] as HouseListing[],
  addHouseListing: async (_newData: Omit<HouseListing, "idHouse">) => {},
  editHouseListing: async (
    _idHouse: number,
    _newData: Partial<HouseListing>,
  ) => {},
  deleteHouseListing: async (_idHouse: number) => {},
  getHasHousePref: async (): Promise<boolean> => false,
  changeHousePref: async (_newData: Partial<HousePref>) => {},
  addHousePref: async (_newData: Omit<HousePref, "idHouse">) => {},
  getMatches: async () => [] as HouseListing[],
  addLiked: async (_id: number) => {},
  getLikes: async () => [] as HouseListing[],
  rateHouse: async (_id, _data) => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const HouseContext = createContext(defaultUserContext);
// Creates the actual context object used by components (up)

/**TODO: check links cus they change -- ones that have id in them */
export function HouseContextProvider(props: PropsWithChildren) {
  // Access user data (like idUser) from UserContext
  const context = useContext(UserContext);

  const contextValue: HouseContextType = {
    async getHouseListings(): Promise<HouseListing[]> {
      // Fetch all house listings for the logged‑in user
      const response = await fetch(
        API_URL + `/house-listing/${context.userData?.idUser}/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
          },
        },
      );
      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return [];
      }

      const houseListings = (await response.json()) as HouseListing[];
      return houseListings;
    },
    async addHouseListing(
      newData: Omit<HouseListing, "idHouse">,
    ): Promise<void> {
      const response = await fetch(API_URL + `/house-listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
        },
        body: JSON.stringify(newData),
      });

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },
    async editHouseListing(
      idHouse: number,
      newData: Partial<HouseListing>,
    ): Promise<void> {
      const response = await fetch(API_URL + `/house-listing/${idHouse}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
        },
        body: JSON.stringify(newData),
      });

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },

    async deleteHouseListing(idHouse: number): Promise<void> {
      const response = await fetch(API_URL + `/house-listing/${idHouse}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
        },
      });

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },
    async getHasHousePref(): Promise<boolean> {
      const response = await fetch(
        API_URL + `/house-search-prefrences/${context.userData?.idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
          },
        },
      );

      if (!response.ok) {
        return false;
      }
      return true;
    },
    async changeHousePref(newData: Partial<HousePref>): Promise<void> {
      const response = await fetch(
        API_URL + `/house-search-prefrences/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
          },
          body: JSON.stringify(newData),
        },
      );

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },
    async addHousePref(
      newData: Omit<HousePref, "houseSearchIdUser">,
    ): Promise<void> {
      const response = await fetch(API_URL + `/house-search-prefrences/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
        },
        body: JSON.stringify(newData),
      });

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },
    async getMatches(): Promise<HouseListing[]> {
      const response = await fetch(
        API_URL + "/house-search-prefrences/gethousematches",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // send token
          },
        },
      );

      // If backend returns error → throw readable message
      if (!response.ok) {
        errorCheckHouse(response);
        return [];
      }

      let prefrenceList;
      try {
        prefrenceList = await response.json();
        console.log(prefrenceList);
      } catch {
        throw new Error("Server did not return JSON");
      }
      return prefrenceList as HouseListing[];
    },

    async addLiked(id: number): Promise<void> {
      const response = await fetch(API_URL + `/house-listing/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckHouse(response);
        return;
      }
    },

    async getLikes(): Promise<HouseListing[]> {
      const response = await fetch(API_URL + "/house-listing/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        errorCheckHouse(response);
        return [];
      }

      let likedList;
      try {
        likedList = await response.json();
        console.log(likedList);
      } catch {
        throw new Error("Server did not return JSON");
      }
      return likedList as HouseListing[];
    },

    async rateHouse(id: number, data: Partial<RateHouse>): Promise<void> {
      const response = await fetch(API_URL + `/house-listing/rate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        errorCheckHouse(response);
      }

      console.log("siker");
    },
  };

  return (
    <HouseContext.Provider value={contextValue}>
      {props.children}
    </HouseContext.Provider>
  );
}
