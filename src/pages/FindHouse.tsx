import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryHorizontal, LayoutGrid } from "lucide-react";
import { FindHouseCard } from "./FindHouseCard";
import type { HouseListing } from "@/interfaces";
import { UserContext } from "@/context/userContext";
import { HouseContext } from "@/context/houseContext";
import { PleaseLogin } from "./PleaseLogin";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { FindHouseSlide } from "./FindHouseSlide";

export function FindHouse() {
  const userContext = useContext(UserContext);
  const houseContext = useContext(HouseContext);
  const navigate = useNavigate();

  const isLoggedIn = !!userContext.userData;

  const [housePref, setHousePref] = useState<HouseListing[]>([]);
  const [hasHousePref, setHasHousePref] = useState<boolean | null>(null);
  const [tab, setTab] = useState("grid");

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isLoggedIn) return;

    houseContext.getMatches().then(setHousePref);
    houseContext.getHasHousePref().then(setHasHousePref);
  }, [isLoggedIn, houseContext]);

  useEffect(() => {
    setTab(isMobile ? "list" : "grid");
  }, [isMobile]);

  // ❌ not logged in
  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to find houses" />;
  }

  // ❌ no setup
  if (hasHousePref === false) {
    return (
      <div className="flex justify-center mt-20 px-4">
        <div className="w-full max-w-md rounded-xl border bg-background shadow-sm p-6 text-center space-y-4">
          <p className="text-lg font-medium">
            Set up your profile to start finding houses
          </p>

          <Button
            className="primary-btn w-full"
            onClick={() => navigate("/setupprofile")}
          >
            Set Up Profile
          </Button>
        </div>
      </div>
    );
  }

  // ⏳ loading
  if (hasHousePref === null) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-muted-foreground">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 space-y-6">

      {/* HEADER (same as roommate) */}
      <div className="flex items-center justify-between border rounded-xl p-3 bg-background shadow-sm">

        <div>
          <h2 className="text-xl font-semibold">Find Houses</h2>
          <p className="text-sm text-muted-foreground">
            Discover listings and match with places
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

     
      <Tabs value={tab} onValueChange={setTab}>

        <TabsContent value="grid" className="mt-4">
          <FindHouseCard
            isLoggedIn={isLoggedIn}
            housePref={housePref}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <FindHouseSlide
            isLoggedIn={isLoggedIn}
            housePref={housePref}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
}

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