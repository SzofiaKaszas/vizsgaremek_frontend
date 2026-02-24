/* eslint-disable @typescript-eslint/no-unused-vars */
/*
TODO: make house context -> move gethousepref here, make gethouselistings of a person - addhouselisting - edithouselisting - deletehouselisting 
*/

import type { HouseContextType, HouseListing, HousePref } from "@/interfaces";
import { useContext, type PropsWithChildren, createContext } from "react";
import { AuthContext } from "./authContext";

const API_URL = "http://localhost:3000";
const { currentUserId } = useContext(AuthContext);

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
  addHousePref: async (_newData: Omit<HousePref, "houseSearchIdUser">) => {},
};

export const HouseContext = createContext(defaultUserContext);

export function HouseContextProvider(props: PropsWithChildren) {
  const contextValue = {
    async getHouseListings(): Promise<HouseListing[]> {
      const response = await fetch(
        API_URL + `/house-listings/${currentUserId}`,
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
            return [];
          default:
            console.error("Failed to load house listings");
            return [];
        }
      }

      const houseListings = (await response.json()) as HouseListing[];
      return houseListings;
    },
    async addHouseListing(
      newData: Omit<HouseListing, "idHouse">,
    ): Promise<void> {
      const response = await fetch(API_URL + `/house-listings/add`, {
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
    async editHouseListing(
      idHouse: number,
      newData: Partial<HouseListing>,
    ): Promise<void> {
      const response = await fetch(API_URL + `/house-listings/${idHouse}`, {
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

    async deleteHouseListing(idHouse: number): Promise<void> {
      const response = await fetch(API_URL + `/house-listings/${idHouse}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
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
    async getHasHousePref(): Promise<boolean> {
      const response = await fetch(
        API_URL + `/house-search-prefrences/${currentUserId}`,
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
    async changeHousePref(newData: Partial<HousePref>): Promise<void> {
      const response = await fetch(
        API_URL + `/house-search-prefrences/${currentUserId}`,
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
    },
    async addHousePref(
      newData: Omit<HousePref, "houseSearchIdUser">,
    ): Promise<void> {
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
    <HouseContext.Provider value={contextValue}>
      {props.children}
    </HouseContext.Provider>
  );
}
