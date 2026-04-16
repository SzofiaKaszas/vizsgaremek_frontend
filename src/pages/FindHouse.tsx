import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryHorizontal, LayoutGrid } from "lucide-react";
import { FindHouseCard } from "./FindHouseCard";
import type { HouseListing } from "@/interfaces";
import { UserContext } from "@/context/userContext";
import { HouseContext } from "@/context/houseContext";
import { PleaseLogin } from "./PleaseLogin";
export function FindHouse() {
  const [housePref, setHousePref] = useState<HouseListing[]>([]);
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(isMobile ? "list" : "grid");

  const context = useContext(UserContext);
  const houseContext = useContext(HouseContext);
  const isLoggedIn = context.userData ? true : false;

  useEffect(() => {
    if (!isLoggedIn) return;

    houseContext.getMatches().then((prefs) => setHousePref(prefs));
  }, [isLoggedIn, context]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(isMobile ? "list" : "grid");
  }, [isMobile]);

  return isLoggedIn ? (
    <>
      <Tabs value={tab} onValueChange={setTab} className="find-scope relative">
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
          <FindHouseCard isLoggedIn={isLoggedIn} housePref={housePref} />
        </TabsContent>
        <TabsContent value="list">
          <div className="flex justify-center mt-10">
            <h1 className="text-2xl font-bold text-center">Dolgozunk rajta m  </h1>
          </div>



          <LayoutGrid />
        </TabsContent>
      </Tabs>
    </>
  ) : (
    <PleaseLogin text="Please login to find house"></PleaseLogin>
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
