/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";
import { HouseContext } from "@/context/houseContext";
import type { HouseListing } from "@/interfaces";
import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import { HouseListingCard } from "./HouseListingCard";

export function YourHouseListing() {
  const [listings, setListings] = useState<HouseListing[]>([]); 

  const { currentUserId } = useContext(AuthContext);
  const usercontext = useContext(UserContext);

  const isLoggedIn = usercontext.userData ? true : false;

  const housecontext = useContext(HouseContext);
  
  useEffect(() => {
    if (!isLoggedIn) return;

    housecontext.getHouseListings().then((listings) => setListings(listings));
  })

  return isLoggedIn === true ? (
  <>
  <Button onClick={() => (window.location.href = "/addhouselisting")}>
    <Plus />
  </Button>

    {listings.length === 0 ? (
      <p>You have no house listings yet.</p>
    ) : (
      listings.map((listing) => (
        <HouseListingCard houseListing={listing}/>
      ))
    )}
  </>
) : (
  <PleaseLogin text="Please login to view your house listings" />
);
}
