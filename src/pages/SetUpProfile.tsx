import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RoommateProfile } from "./RoommateProfile";
import { RoommatePrefrences } from "./RoommatePrefrences";
import { HousePrefrences } from "./HousePrefrences";
import { Card } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";

export function SetUpProfile() {
  const [step, setStep] = useState("account");

  const steps = ["account", "accPref", "housePref"];

  function isCompleted(currentStep: string, step: string) {
    return steps.indexOf(step) < steps.indexOf(currentStep);
  }

  const progress = (steps.indexOf(step) / (steps.length - 1)) * 100;

  function circleClass(stepName: string) {
  if (step === stepName) {
    return "bg-blue-500 text-white";
  }

  if (isCompleted(step, stepName)) {
    return "bg-blue-600 text-white";
  }

  return "bg-gray-300 text-gray-600";
}
  /**might not be the best way to do it */
  const goNext = () => {
    switch (true) {
      case step === "account":
        setStep("accPref");
        return;
      case step === "accPref":
        setStep("housePref");
        return;
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-sm p-4">
        <Tabs value={step} onValueChange={setStep} className="w-full ">
          <TabsList className="w-full flex justify-center bg-transparent p-0">
            <div className="relative flex items-center gap-10 sm:gap-20">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />

              {steps.map((s, i) => (
                <TabsTrigger
                  key={s}
                  value={s}
                  disabled={step !== s}
                  className={`
          relative z-10
          w-10 h-10 sm:w-12 sm:h-12
          flex items-center justify-center rounded-full
          text-sm sm:text-base
          data-[disabled]:opacity-100 data-[disabled]:cursor-default
          data-[state=active]:bg-blue-500 data-[state=active]:text-white
          ${circleClass(s)}
        `}
                >
                  {i + 1}
                </TabsTrigger>
              ))}
              {/** 
              <TabsTrigger
                value="account"
                disabled={step !== "account"}
                className={`
    w-12 h-12 flex items-center justify-center rounded-full relative z-10 data-[disabled]:opacity-100
    ${isCompleted(step, "account") ? "bg-blue-600 text-white" : ""}
    data-[state=active]:bg-blue-500 data-[state=active]:text-white
    data-[disabled]:opacity-100 data-[disabled]:cursor-default
    ${!isCompleted(step, "account") && step !== "account" ? "bg-gray-300 text-gray-600" : ""}
  `}
              >
                1
              </TabsTrigger>
              <TabsTrigger
                value="accPref"
                disabled={step !== "accPref"}
                className={`
    w-12 h-12 flex items-center justify-center rounded-full relative z-10 data-[disabled]:opacity-100
    ${isCompleted(step, "accPref") ? "bg-green-600 text-white" : ""}
    data-[state=active]:bg-blue-500 data-[state=active]:text-white
    ${!isCompleted(step, "accPref") && step !== "accPref" ? "bg-gray-300 text-gray-600" : ""}
  `}
              >
                2
              </TabsTrigger>
              <TabsTrigger
                value="housePref"
                disabled={step !== "housePref"}
                className={`
    w-12 h-12 flex items-center justify-center rounded-full relative z-10 data-[disabled]:opacity-100
    ${isCompleted(step, "housePref") ? "bg-green-600 text-white" : ""}
    data-[state=active]:bg-blue-500 data-[state=active]:text-white
    ${!isCompleted(step, "housePref") && step !== "housePref" ? "bg-gray-300 text-gray-600" : ""}
  `}
              >
                3
              </TabsTrigger>*/}
            </div>
          </TabsList>

          <FieldSeparator />
          <TabsContent value="account">
            <RoommateProfile goNext={goNext} />
          </TabsContent>

          <TabsContent value="accPref">
            <RoommatePrefrences goNext={goNext} />
          </TabsContent>

          <TabsContent value="housePref">
            <HousePrefrences />
            {/**TODO: onclick */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
