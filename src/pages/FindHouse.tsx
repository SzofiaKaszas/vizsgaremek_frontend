/*import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryHorizontal, House, LayoutGrid } from "lucide-react";*/

export function FindHouse() {
  /*
  const [roommatePref, setRoommatePref] = useState<User[]>([]);
    const isMobile = useIsMobile();
    const tab = isMobile ? "list" : "grid";
  
    const { currentUserId } = useContext(AuthContext);
    const context = useContext(UserContext);
    const isLoggedIn = context.userData ? true : false;
  
    useEffect(() => {
      if (!isLoggedIn) return;
  
      context.getRoommatePref().then((prefs) => setRoommatePref(prefs));
    }, [isLoggedIn, context]);
*/
  return (
    /*<Tabs value={tab} onValueChange={setTab} className="relative">
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
        <FindHouseCard isLoggedIn={isLoggedIn} housePref={housePref} />
      </TabsContent>
      <TabsContent value="list">
        <FindHouseSlide isLoggedIn={isLoggedIn} housePref={housePref} />
      </TabsContent>
    </Tabs>*/
    <div className="flex justify-center mt-10">
      <h1 className="text-2xl font-bold text-center">Dolgozunk rajta</h1>
    </div>
  );
}
/*
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
  }*/