import { useContext, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RoommateProfile } from "./RoommateProfile";
import { RoommatePrefrences } from "./RoommatePrefrences";
import { HousePrefrences } from "./HousePrefrences";
import { Card } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { UserContext } from "@/context/userContext";

export function SetUpProfile() {
  const [step, setStep] = useState("account");
  const { userData } = useContext(UserContext);

  const steps = useMemo(() => {
    const base = ["account"];

    if (userData?.lookingForPeople) {
      base.push("accPref");
    }

    if (userData?.lookingForHouse) {
      base.push("housePref");
    }

    return base;
  }, [userData]);

  const stepIndex = steps.indexOf(step);

  function isCompleted(currentStep: string, targetStep: string) {
    return steps.indexOf(targetStep) < steps.indexOf(currentStep);
  }

  const progress =
    steps.length > 1 && stepIndex >= 0
      ? (stepIndex / (steps.length - 1)) * 100
      : 0;

  function circleClass(stepName: string) {
    if (step === stepName) {
      return "bg-accent text-white";
    }

    if (isCompleted(step, stepName)) {
      return "bg-accent-hover text-white";
    }

    return "bg-gray-300 text-gray-600";
  }

  const goNext = () => {
    const idx = steps.indexOf(step);

    // safety fix (prevents -1 bug)
    if (idx < 0) return;

    const nextStep = steps[idx + 1];

    if (nextStep) {
      setStep(nextStep);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <Card className="form-card w-full max-w-sm p-4">

        <Tabs value={step} onValueChange={setStep} className="w-full">

          <TabsList className="stepper w-full flex justify-center bg-transparent p-0">
            <div className="relative flex items-center gap-10 sm:gap-20">

              <div className="stepper-line" />

              <div
                className="stepper-progress"
                style={{ width: `${progress}%` }}
              />

              {steps.map((s, i) => (
                <TabsTrigger
                  key={s}
                  value={s}
                  disabled={step !== s}
                  className={`
                    step-circle
                    relative z-10

                    w-8 h-8 sm:w-9 sm:h-9
                    flex items-center justify-center rounded-full
                    text-xs sm:text-sm

                    data-[disabled]:opacity-100
                    data-[disabled]:cursor-default

                    data-[state=active]:bg-accent
                    data-[state=active]:text-white

                    ${circleClass(s)}
                  `}
                >
                  {i + 1}
                </TabsTrigger>
              ))}

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
          </TabsContent>

        </Tabs>

      </Card>
    </div>
  );
}