import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import type { UserNecesarry } from "@/interfaces";
import { FindRoommateCard } from "./FindRoommateCard";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FindRoommateSlide } from "./FindRoommateSlide";
import { PleaseLogin } from "./PleaseLogin";

export function FindRoommate() {
  const [roommatePref, setRoommatePref] = useState<UserNecesarry[]>([]);
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(isMobile ? "list" : "grid");

  const context = useContext(UserContext);
  const isLoggedIn = context.userData ? true : false;

  useEffect(() => {
    if (!isLoggedIn) return;

    context.getMatches().then((prefs) => setRoommatePref(prefs));
  }, [isLoggedIn, context]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(isMobile ? "list" : "grid");
  }, [isMobile]);

  return isLoggedIn ? (
    <Tabs value={tab} onValueChange={setTab} className="find-scope">
      <div className="tabs-wrapper flex w-full justify-end">
        <TabsList className="tabs-list">
          <TabsTrigger value="grid" className="tabs-trigger">
            <LayoutGrid />
          </TabsTrigger>

          <TabsTrigger value="list" className="tabs-trigger">
            <GalleryHorizontal />
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="grid">
        <FindRoommateCard
          isLoggedIn={isLoggedIn}
          roommatePref={roommatePref}
        />
      </TabsContent>
      <TabsContent value="list">
        <FindRoommateSlide
          isLoggedIn={isLoggedIn}
          roommatePref={roommatePref}
        />
      </TabsContent>
    </Tabs>
  ) : (
    <PleaseLogin text={"Please login to find roommates"}></PleaseLogin>
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
