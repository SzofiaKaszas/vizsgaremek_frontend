import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";
import { HouseContext } from "@/context/houseContext";
import type { HouseListing } from "@/interfaces";
import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import { HouseListingCard } from "./HouseListingCard";

export function YourHouseListing() {
  const [listings, setListings] = useState<HouseListing[]>([]); 

  const usercontext = useContext(UserContext);
  const housecontext = useContext(HouseContext);

  const isLoggedIn = usercontext.userData ? true : false;
  
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
