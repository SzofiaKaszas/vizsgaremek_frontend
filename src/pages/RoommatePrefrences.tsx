import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { GendersForPref } from "@/assets/genders";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GoNextProp } from "@/interfaces";

export function RoommatePrefrences({ goNext }: GoNextProp) {
  const context = useContext(UserContext);
  const [ages, setAges] = useState<[number, number]>([25, 40]);

  const MIN_AGE = 18;
  const MAX_AGE = 80;

  return (
        <form
          onSubmit={async (e) => {
            handleSubmit(e, context, ages, goNext);
          }}
        >
          <CardTitle className="text-center text-xl font-bold p-2">
            Your Prefrences
          </CardTitle>
          <Field className="m-2">
            <FieldLabel>
              Age range: {ages[0]} – {ages[1]}
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
          </Field>
          <Field className="m-2">
            <FieldLabel htmlFor="gender">Language you speak:</FieldLabel>
            <Combobox items={GendersForPref}>
              <ComboboxInput placeholder="Select a gender" name="gender" id="gender"/>
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
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="language">Language you speak:</FieldLabel>
            <Combobox items={Languages}>
              <ComboboxInput placeholder="Select a language" name="language" id="language"/>
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
          </Field>

          <div className="my-button-scope">
          <Button variant={"default"} type="submit" className="m-1">
            Next
          </Button>
          <Button
            variant={"outline"}
            type="button"
            className="m-1"
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
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  const minAge = ages[0];
  const maxAge = ages[1];

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

  const gender = form.get("gender") as string;
  const language = form.get("language") as string;

  try {
    await context.addRoommatePref({
      minAge: minAge ? Number(minAge) : undefined,
      maxAge: maxAge ? Number(maxAge) : undefined,
      gender: gender,
      language: language,
    });
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
