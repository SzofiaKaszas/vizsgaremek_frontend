import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { HouseContext } from "@/context/houseContext";
import type { User, HouseListing } from "@/interfaces";
import { LikeUserCard } from "./LikedUserCard";
import { LikedHouseCard } from "./LikedHouseCard";

export function Likes() {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [likedHouses, setLikedHouses] = useState<HouseListing[]>([]);

  const userContext = useContext(UserContext);
  const houseContext = useContext(HouseContext);

  const isLoggedIn = Boolean(userContext.userData);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function loadLikes() {
      const users = await userContext.getLikes();
      const houses = await houseContext.getLikes();

      setLikedUsers(users);
      setLikedHouses(houses);
    }

    loadLikes();
  }, [isLoggedIn]);

  return (
    <div className="w-full flex flex-col gap-10 px-4 py-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Liked Roommates</h2>
        <LikeUserCard 
          isLoggedIn={isLoggedIn} 
          likedUsers={likedUsers} 
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Liked Houses</h2>
        <LikedHouseCard 
          isLoggedIn={isLoggedIn} 
          likedHouses={likedHouses} 
        />
      </section>
    </div>
  );
}
