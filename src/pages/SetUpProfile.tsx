import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RoommateProfile } from "./RoommateProfile";
import { RoommatePrefrences } from "./RoommatePrefrences";
import { HousePrefrences } from "./HousePrefrences";

export function SetUpProfile() {
  const [step, setStep] = useState("account");

  /**might not be the best way to do it */
  const goNext = () => {
    switch(true){
        case step === "account":
            setStep("accPref")
            return;
        case step === "accPref":
            setStep("housePref");
            return;
    }
  };

  return (
    <Tabs value={step} onValueChange={setStep} className="w-[400px]">
  <TabsList className="flex flex-col items-center bg-transparent p-0 gap-4">

    <div className="flex items-center gap-6">
      <TabsTrigger
        value="account"
        disabled
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-default opacity-60"
      >
        1
      </TabsTrigger>

      <TabsTrigger
        value="accPref"
        disabled
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-default opacity-60"
      >
        2
      </TabsTrigger>
      <TabsTrigger
        value="housePref"
        disabled
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-default opacity-60"
      >
        3
      </TabsTrigger>
    </div>
  </TabsList>

  <TabsContent value="account">
    <RoommateProfile />
    <button
      onClick={goNext}
      className="mt-4 px-4 py-2 bg-black text-white rounded-md"
    >
      Next Step
    </button>
  </TabsContent>

  <TabsContent value="accPref">
    <RoommatePrefrences/>
    <button
      onClick={goNext}
      className="mt-4 px-4 py-2 bg-black text-white rounded-md"
    >
      Next Step
    </button>
  </TabsContent>

  <TabsContent value="housePref">
    <HousePrefrences/>
    {/**TODO: onclick */}
    <button 
      className="mt-4 px-4 py-2 bg-black text-white rounded-md"
    >
      Finish
    </button>
  </TabsContent>
</Tabs>



  );
}
