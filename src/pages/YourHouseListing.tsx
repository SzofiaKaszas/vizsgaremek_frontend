import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";
import { HouseContext } from "@/context/houseContext";
import type { HouseListing } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HouseListingCard } from "./HouseListingCard";
import { useNavigate } from "react-router";

/*page to see your own houselistings*/ 
export function YourHouseListing() {
  /**all of the houselistings */
  const [listings, setListings] = useState<HouseListing[]>([]);

  /**contexts */
  const usercontext = useContext(UserContext);
  const housecontext = useContext(HouseContext);

  const navigate = useNavigate();
  const isLoggedIn = Boolean(usercontext.userData);

  useEffect(() => {
    if (!isLoggedIn) return;

    /*load in the listings into the list*/
    housecontext.getHouseListings().then(setListings);
  }, [isLoggedIn, housecontext]);

  /*check if logged in if not show login text*/
  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to view your house listings" />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-end">
        {/**Plus button to navigate to addhouselisting where you can add a house for rent*/}
        <Button
          onClick={() => {navigate("/addhouselisting")}}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
        >
          <Plus size={22} />
        </Button>
      </div>
      {/**show this text if no listings are found */}
      {listings.length === 0 ? (
        <p className="text-center text-muted-foreground font-medium mt-10">
          You have no house listings yet.
        </p>
      ) : (
        /**write listings out wiht HouseListingCard component */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <HouseListingCard
              key={listing.idHouse}
              houseListing={listing}
            />
          ))}
        </div>
      )}

    </div>
  );
}