import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";
import { HouseContext } from "@/context/houseContext";
import type { HouseListing } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HouseListingCard } from "./HouseListingCard";

export function YourHouseListing() {
  const [listings, setListings] = useState<HouseListing[]>([]);

  const usercontext = useContext(UserContext);
  const housecontext = useContext(HouseContext);

  const isLoggedIn = Boolean(usercontext.userData);

  useEffect(() => {
    if (!isLoggedIn) return;

    housecontext.getHouseListings().then(setListings);
  }, [isLoggedIn, housecontext]);

  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to view your house listings" />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* HEADER ACTION */}
      <div className="flex justify-end">
        <Button
          onClick={() => (window.location.href = "/addhouselisting")}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
        >
          <Plus size={22} />
        </Button>
      </div>

      {/* EMPTY STATE */}
      {listings.length === 0 ? (
        <p className="text-center text-muted-foreground font-medium mt-10">
          You have no house listings yet.
        </p>
      ) : (
        /* GRID */
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