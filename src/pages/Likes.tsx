import { HouseContext } from "@/context/houseContext";
import { UserContext } from "@/context/userContext";
import type { HouseListing, UserNecesarry } from "@/interfaces";
import { useContext, useEffect, useState } from "react";

export function Likes() {
  const [likedUsers, setLikedUsers] = useState<UserNecesarry[]>([]);
  const [likedHouses, setLikedHouses] = useState<HouseListing[]>([]);

  const userContext = useContext(UserContext);
  const houseContext = useContext(HouseContext);

  const isLoggedIn = userContext.userData ? true : false;
  useEffect(() => {
    if (!isLoggedIn) return;

    userContext.getLikes().then((likes) => setLikedUsers(likes));
    houseContext.getLikes().then((likes) => setLikedHouses(likes));
    console.log(likedHouses)
    console.log(likedUsers)
  }, [isLoggedIn, userContext]);

  return <></>;
}
