import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { HouseContext } from "@/context/houseContext";
import type { User, HouseListing } from "@/interfaces";
import { LikeUserCard } from "./LikedUserCard";
import { LikedHouseCard } from "./LikedHouseCard";
import { PleaseLogin } from "./PleaseLogin";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function Likes() {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [likedHouses, setLikedHouses] = useState<HouseListing[]>([]);
  const [tab, setTab] = useState("users");

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

  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to view your likes" />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 space-y-6">

      {/* HEADER */}
      <div className="rounded-xl border bg-background shadow-sm p-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">Your Likes</h2>
          <p className="text-sm text-muted-foreground">
            Manage your liked roommates and houses
          </p>
        </div>

        {/* SWITCH */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-muted p-1 rounded-lg">
            <TabsTrigger value="users">
              Roommates
            </TabsTrigger>
            <TabsTrigger value="houses">
              Houses
            </TabsTrigger>
          </TabsList>
        </Tabs>

      </div>

      {/* CONTENT */}
      <Tabs value={tab} onValueChange={setTab}>

        <TabsContent value="users" className="mt-4">
          <LikeUserCard
            isLoggedIn={isLoggedIn}
            likedUsers={likedUsers}
          />
        </TabsContent>

        <TabsContent value="houses" className="mt-4">
          <LikedHouseCard
            isLoggedIn={isLoggedIn}
            likedHouses={likedHouses}
          />
        </TabsContent>

      </Tabs>

    </div>
  );
}