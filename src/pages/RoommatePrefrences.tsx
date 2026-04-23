import { useContext, useEffect } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { GendersForPref } from "@/assets/genders";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GoNextProp } from "@/interfaces";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate, type NavigateFunction } from "react-router";

export function RoommatePrefrences({ goNext }: GoNextProp) {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [ages, setAges] = useState<[number | undefined, number | undefined]>([
    25, 50,
  ]);

  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [hasRoommatePref, setHasRoommatePref] = useState(false);

  const MIN_AGE = 18;
  const MAX_AGE = 100;

  useEffect(() => {
    async function fetchData() {
      const hasRoommatePreff = await context.getHasRoommatePref();
      setHasRoommatePref(hasRoommatePref);

      if (hasRoommatePreff) {
        const roommatePref = await context.getRoommatePref();
        if (!roommatePref) return;

        setAges([roommatePref.minAge, roommatePref.maxAge]);
        setGender(roommatePref.gender ?? "");
        setLanguage(roommatePref.language ?? "");
      }
    }

    fetchData();
  }, [context.userData]);

  return (
    <>
      <Toaster position="top-center" />

      <form
        className="
          px-2 sm:px-3
          space-y-5
        "
        onSubmit={async (e) => {
          handleSubmit(e, context, ages, goNext, navigate);
        }}
      >

        {/* HEADER */}
        <div className="text-center space-y-1">
          <CardTitle className="text-lg font-semibold">
            Roommate Preferences
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Who would you like to live with?
          </p>
        </div>

        {/* AGE RANGE CARD */}
        <Field>
          <FieldLabel>Age range</FieldLabel>

          <div className="
            rounded-2xl
            border border-muted
            bg-muted/20
            p-3
            space-y-3
          ">

            {/* TOP INFO */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Min</span>
              <span className="font-medium text-accent">
                {ages[0]}
              </span>
              <span className="text-muted-foreground">Max</span>
              <span className="font-medium text-accent">
                {ages[1]}
              </span>
            </div>
            <div className="age-slider-scope">
              {/* SLIDER */}
              <Slider
                defaultValue={[25, 50]}
                min={MIN_AGE}
                max={MAX_AGE}
                step={1}
                value={ages}
                onValueChange={(value) => {
                  setAges(value as [number, number]);
                }}
                className="w-full"
              />
            </div></div>

          <FieldDescription
            id="ageErr"
            className="text-red-500 text-xs mt-1"
          />
        </Field>

        {/* GENDER */}
        <Field className="space-y-1">
          <FieldLabel htmlFor="gender">Preferred Gender</FieldLabel>

          <Combobox
            items={GendersForPref}
            name="gender"
            value={gender}
            onValueChange={(value) => setGender(value ?? "")}
          >
            <ComboboxInput id="gender" placeholder="Select gender" />
            <ComboboxContent>
              <ComboboxEmpty>No results</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <FieldDescription id="genderErr" className="text-red-500 text-xs" />
          <input type="hidden" name="gender" />
        </Field>

        {/* LANGUAGE */}
        <Field className="space-y-1">
          <FieldLabel htmlFor="language">Language</FieldLabel>

          <Combobox
            items={Languages}
            name="language"
            value={language}
            onValueChange={(value) => setLanguage(value ?? "")}
          >
            <ComboboxInput id="language" placeholder="Select language" />
            <ComboboxContent>
              <ComboboxEmpty>No results</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <FieldDescription id="languageErr" className="text-red-500 text-xs" />
          <input type="hidden" name="language" />
        </Field>

        {/* BUTTONS */}
        <div className="pt-2 space-y-2">
          <Button
            type="submit"
            className="w-full bg-accent text-white rounded-xl py-2"
          >
            Next
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-accent text-accent rounded-xl py-2"
            onClick={() => goNext()}
          >
            Skip
          </Button>
        </div>

      </form>
    </>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
  ages: [number, number],
  goNext: () => void,
  navigate: NavigateFunction
) {
  /**Prevent page refreshing */
  e.preventDefault();
  /**Get form data */
  const form = new FormData(e.currentTarget);

  /**Blur the active element to lose focus */
  (document.activeElement as HTMLElement)?.blur();

  /*get data */
  const minAge = ages[0];
  const maxAge = ages[1];
  const gender = (form.get("gender") as string) || null;
  const language = (form.get("language") as string) || null;

  document.getElementById("ageErr")!.innerHTML = "";
  document.getElementById("genderErr")!.innerHTML = "";
  document.getElementById("languageErr")!.innerHTML = "";

  /**Validate ages */
  switch (true) {
    case minAge === undefined || maxAge === undefined:
      return;
    case isNaN(minAge) || isNaN(maxAge):
      document.getElementById("ageErr")!.innerHTML = "Ages must be numbers";
      return;
    case minAge < 18:
      document.getElementById("ageErr")!.innerHTML = "Minimum age must be at least 18";
      return;
    case maxAge > 100:
      document.getElementById("ageErr")!.innerHTML = "Maximum age must be at most 100";
      return;
    case minAge > maxAge:
      document.getElementById("ageErr")!.innerHTML = "Minimum age cannot be greater than maximum age";
      return;
  }

  /* Create roommate preferences object */
  const pref = {
    minAge: minAge ? Number(minAge) : null,
    maxAge: maxAge ? Number(maxAge) : null,
    gender: gender,
    language: language,
  };

  const hasRoommatePref = await context.getHasRoommatePref();
  /* If no validation errors, add or edit roommate preferences */
  if (hasRoommatePref == false) {
    /* No roommate preferences, add new one*/
    try {
      await context.addRoommatePref(pref);
      toast.success("Preferences saved successfully");
      setTimeout(() => {
        if (context.userData?.lookingForHouse) {
          goNext();
        } else {
          navigate("/main");
        }
      }, 800);
    } catch (err) {
      toast.error((err as Error).message);
    }
  } else {
    /** Edit existing roommate preferences */
    try {
      await context.editRoommatePref(pref);
      toast.success("Preferences saved successfully");
      setTimeout(() => {
        if (context.userData?.lookingForHouse) {
          goNext();
        } else {
          navigate("/main");
        }
      }, 800);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }
}
