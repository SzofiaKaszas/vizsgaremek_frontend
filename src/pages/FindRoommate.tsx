/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";
import type { User } from "@/interfaces";
import { FindRoommateCard } from "./FindRoommateCard";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FindRoommateSlide } from "./FindRoommateSlide";

export function FindRoommate() {
  const [roommatePref, setRoommatePref] = useState<User[]>([]);
  const isMobile = useIsMobile();
  const tab = isMobile ? "list" : "grid";

  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);
  const isLoggedIn = context.userData ? true : false;

  useEffect(() => {
    if (!isLoggedIn) return;

    context.getMatches().then((prefs) => setRoommatePref(prefs));
  }, [isLoggedIn, context]);

  return (
    <Tabs value={tab} className="relative">
      <div className="flex w-full justify-end">
        <TabsList className="absolute ml-auto flex bg-transparent p-0 border border-slate rounded-md overflow-hidden !shadow-none">
          <TabsTrigger
            value="grid"
            className="bg-transparent data-[state=active]:bg-silver data-[state=active]:text-black hover:bg-transparent !shadow-none"
          >
            <LayoutGrid />
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="bg-transparent data-[state=active]:bg-silver data-[state=active]:text-black hover:bg-transparent !shadow-none"
          >
            <GalleryHorizontal />
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="grid">
        <FindRoommateCard isLoggedIn={isLoggedIn} roommatePref={roommatePref} />
      </TabsContent>
      <TabsContent value="list">
        <FindRoommateSlide
          isLoggedIn={isLoggedIn}
          roommatePref={roommatePref}
        />
      </TabsContent>
    </Tabs>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
