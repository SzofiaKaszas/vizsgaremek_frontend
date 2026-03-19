import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";
import { HouseContext } from "@/context/houseContext";
import type { HouseListing } from "@/interfaces";
import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import { HouseListingCard } from "./HouseListingCard";

//Component to write out users own House Listings (if he has)
export function YourHouseListing() {
  //list for the users own house listings
  const [listings, setListings] = useState<HouseListing[]>([]);

  //
  const usercontext = useContext(UserContext);
  const housecontext = useContext(HouseContext);

  //checking wether the user is logged in based on if he's data is loaded in
  const isLoggedIn = usercontext.userData ? true : false;

  //useEffect to get the listings -- only once or when its changed
  useEffect(() => {
    if (!isLoggedIn) return;

    housecontext.getHouseListings().then((listings) => setListings(listings));
  });

  //checking wether the user is logged in
  return isLoggedIn === true ? (
    <>
      {/**if clicking on plus redirecting to the page/form  to add a new houselisting*/}
      <div className="plus-button-wrapper">
        <Button
          className={"plus-button"}
          onClick={() => (window.location.href = "/addhouselisting")}
        >
          <span>
            <Plus size={35} />
          </span>
        </Button>
      </div>
      {/**if user has no house listing yet then show that -- if not then map the list and make HouseListingCards to write the data out */}
      {listings.length === 0 ? (
        <p>You have no house listings yet.</p>
      ) : (
        /*sending a data of a listing to the HouseListingCard component*/
        listings.map((listing) => <HouseListingCard houseListing={listing} />)
      )}
    </>
  ) : (
    //if user is not logged in load PleaseLogin component with the right message
    <PleaseLogin text="Please login to view your house listings" />
  );
}
