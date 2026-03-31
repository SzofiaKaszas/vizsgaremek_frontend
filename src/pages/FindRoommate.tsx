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
  const [roommatePref, setRoommatePref] = useState<UserNecesarry[]>([]);
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(isMobile ? "list" : "grid");
  const [hasRoommatePref, setHasRoommatePref] = useState<boolean | null>(null);

  const context = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = context.userData ? true : false;

  useEffect(() => {
    if (!isLoggedIn) return;

    context.getMatches().then((prefs) => setRoommatePref(prefs));
    context.getHasRoommatePref().then((res) => {
      setHasRoommatePref(res);
    });
  }, [isLoggedIn, context]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(isMobile ? "list" : "grid");
  }, [isMobile]);

  // Not logged in
  if (!isLoggedIn) {
    return <PleaseLogin text="Please login to find roommates" />;
  }

  // Logged in but no roommate preference
  if (hasRoommatePref === false) {
    return (
      <div className="flex justify-center-safe content-center w-fit max-w-sm p-2 mx-auto mt-20">
        <div className="my-button-scope">
          <Field className="text center flex-auto">
            <p>Set up profile to find roommates</p>
            <Button
              className="primary-btn"
              onClick={() => navigate("/setupprofile")}
            >
              Set Up Profile
            </Button>
          </Field>
        </div>
      </div>
    );
  }

  // Still loading preference
  if (hasRoommatePref === null) {
    return <div>Loading...</div>;
  }

  return (
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
