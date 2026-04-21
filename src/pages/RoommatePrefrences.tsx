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

/**TODO: If already has roommate pref, show the data in inputs */
export function RoommatePrefrences({ goNext }: GoNextProp) {
  const context = useContext(UserContext);

  /*for navigation with react router*/
  const navigate = useNavigate();

  const [ages, setAges] = useState<[number | undefined, number | undefined]>([
    25, 50,
  ]);

  /**Variable for gender and language combobox */
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [hasRoommatePref, setHasRoommatePref] = useState(false);
  const MIN_AGE = 18;
  const MAX_AGE = 100;

  /**useEffect to get default values for the form -- if user already set it but wants to change it */
  useEffect(() => {
    async function fetchData() {
      const hasRoommatePreff = await context.getHasRoommatePref();
      setHasRoommatePref(hasRoommatePref);

      if (hasRoommatePreff) {
        const roommatePref = await context.getRoommatePref();
        if (!roommatePref) {
          alert("Error fetching roommate preferences");
          return;
        }
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
        className="form-scope"
        onSubmit={async (e) => {
          handleSubmit(e, context, ages, goNext, navigate);
        }}
      >
        <CardTitle className="text-center text-xl font-bold p-2">
          Roommate Preferences
        </CardTitle>
        <Field className="age-slider-scope m-2">
          <FieldLabel>
            Your age prefrence (roommate): {ages[0]} – {ages[1]}
          </FieldLabel>
          <Slider
            defaultValue={[25, 50]}
            min={MIN_AGE}
            max={MAX_AGE}
            step={1}
            className="mx-auto w-full max-w-xs"
            value={ages}
            onValueChange={(value) => {
              setAges(value as [number, number]);
            }}
          />
          <FieldDescription
            id="ageErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="gender">Preffered Gender:</FieldLabel>
          <Combobox
            items={GendersForPref}
            name="gender"
            value={gender}
            onValueChange={(value) => setGender(value ?? "")}
          >
            <ComboboxInput placeholder="Select a gender" id="gender" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription
            id="genderErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
          <input type="hidden" name="gender" />
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="language">Preferred language:</FieldLabel>
          <Combobox
            items={Languages}
            name="language"
            value={language}
            onValueChange={(value) => setLanguage(value ?? "")}
          >
            <ComboboxInput placeholder="Select a language" id="language" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription
            id="languageErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
          <input type="hidden" name="language" />
        </Field>

        <div className="my-button-scope">
          <Button variant={"default"} type="submit" className="primary-btn m-1">
            Next
          </Button>
          {
            /*hasRoommatePref ?*/ <Button
              variant={"outline"}
              type="button"
              className="sec-btn m-1"
              onClick={() => {
                goNext();
              }}
            >
              Skip
            </Button> /*: (
          <></>
        )*/
          }
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
