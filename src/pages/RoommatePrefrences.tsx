import { useContext } from "react";
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

/**TODO: If already has roommate pref, show the data in inputs */
export function RoommatePrefrences({ goNext }: GoNextProp) {
  const context = useContext(UserContext);
  const [ages, setAges] = useState<[number, number]>([25, 40]);

  const MIN_AGE = 18;
  const MAX_AGE = 100;

  return (
    <form
      className="form-scope"
      onSubmit={async (e) => {
        handleSubmit(e, context, ages, goNext);
      }}
    >
      <CardTitle className="text-center text-xl font-bold p-2">
        Your Prefrences
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
        <FieldLabel htmlFor="gender">Your Gender:</FieldLabel>
        <Combobox
          items={GendersForPref}
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
        <FieldLabel htmlFor="language">Language you speak:</FieldLabel>
        <Combobox
          items={Languages}
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
        <Button
          variant={"outline"}
          type="button"
          className="sec-btn m-1"
          onClick={() => {
            goNext();
          }}
        >
          Skip
        </Button>
      </div>
    </form>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
  ages: [number, number],
  goNext: () => void,
) {
  /**Prevent page refreshing */
  e.preventDefault();
  /**Get form data */
  const form = new FormData(e.currentTarget);

  /**Blur the active element to lose focus */
  (document.activeElement as HTMLElement)?.blur();

  /**Check wether we need to add or edit roommate preferences */
  const hasRoommatePref = await context.getHasRoommatePref();

  /*get data */
  const minAge = ages[0];
  const maxAge = ages[1];
  const gender = (form.get("gender") as string) || undefined;
  const language = (form.get("language") as string) || undefined;

  document.getElementById("ageErr")!.innerHTML = "";
  document.getElementById("genderErr")!.innerHTML = "";
  document.getElementById("languageErr")!.innerHTML = "";

  /**Validate ages */
  switch (true) {
    case minAge === undefined || maxAge === undefined:
      return;
    case isNaN(minAge) || isNaN(maxAge):
      alert("Ages must be numbers");
      return;
    case minAge < 18:
      alert("Minimum age must be at least 18");
      return;
    case maxAge > 100:
      alert("Maximum age must be at most 100");
      return;
    case minAge > maxAge:
      alert("Minimum age cannot be greater than maximum age");
      return;
  }

  /* Create roommate preferences object */
  const pref = {
    minAge: minAge ? Number(minAge) : undefined,
    maxAge: maxAge ? Number(maxAge) : undefined,
    gender: gender,
    language: language,
  };

  /* If no validation errors, add or edit roommate preferences */
  if (hasRoommatePref == false) {
    /* No roommate preferences, add new one*/
    try {
      await context.addRoommatePref(pref);
      alert("Preferences saved successfully");
      if (context.userData?.lookingForHouse) {
        goNext();
      } else {
        window.location.href = "/main";
      }
    } catch (err) {
      alert((err as Error).message);
    }
  } else {
    /** Edit existing roommate preferences */
    try {
      await context.editRoommatePref(pref);
      alert("Preferences saved successfully");
      if (context.userData?.lookingForHouse) {
        goNext();
      } else {
        window.location.href = "/main";
      }
    } catch (err) {
      alert((err as Error).message);
    }
  }
}
