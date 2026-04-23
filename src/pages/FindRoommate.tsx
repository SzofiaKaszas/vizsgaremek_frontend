import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import type { UserNecesarry } from "@/interfaces";
import { FindRoommateCard } from "./FindRoommateCard";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FindRoommateSlide } from "./FindRoommateSlide";
import { PleaseLogin } from "./PleaseLogin";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function FindRoommate() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const isLoggedIn = !!context.userData;

  const [roommatePref, setRoommatePref] = useState<UserNecesarry[]>([]);
  const [hasRoommatePref, setHasRoommatePref] = useState<boolean | null>(null);
  const [tab, setTab] = useState("grid");

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isLoggedIn) return;

    context.getMatches().then(setRoommatePref);
    context.getHasRoommatePref().then(setHasRoommatePref);
  }, [isLoggedIn, context]);

  useEffect(() => {
    setTab(isMobile ? "list" : "grid");
  }, [isMobile]);

  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to find roommates" />;
  }

  if (hasRoommatePref === false) {
    return (
      <div className="flex justify-center mt-20 px-4">
        <div className="w-full max-w-md rounded-xl border bg-background shadow-sm p-6 text-center space-y-4">
          <p className="text-lg font-medium">
            Set up your profile to start finding roommates
          </p>

          <Button className="primary-btn w-full" onClick={() => navigate("/setupprofile")}>
            Set Up Profile
          </Button>
        </div>
      </div>
    );
  }

  if (hasRoommatePref === null) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-muted-foreground">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 space-y-6">

      {/* HEADER / DASHBOARD BAR */}
      <div className="flex items-center justify-between border rounded-xl p-3 bg-background shadow-sm">
        <div>
          <h2 className="text-xl font-semibold">Find Roommates</h2>
          <p className="text-sm text-muted-foreground">
            Swipe, match and connect with people
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex gap-1">
            <TabsTrigger value="grid">
              <LayoutGrid size={18} />
            </TabsTrigger>
            <TabsTrigger value="list">
              <GalleryHorizontal size={18} />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* CONTENT */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="grid" className="mt-4">
          <FindRoommateCard
            isLoggedIn={isLoggedIn}
            roommatePref={roommatePref}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <FindRoommateSlide
            isLoggedIn={isLoggedIn}
            roommatePref={roommatePref}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* mobile hook unchanged */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}