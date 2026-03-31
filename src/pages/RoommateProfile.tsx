import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Genders } from "@/assets/genders";
import type { GoNextProp } from "@/interfaces";

export function RoommateProfile({ goNext }: GoNextProp) {
  const context = useContext(UserContext);

  //TODO: error handling
  return (
    <form
      className="form-scope"
      onSubmit={async (e) => {
        handleSubmit(e, context, goNext);
      }}
    >
      <CardTitle className="text-center text-xl font-bold p-2">
        Your Profile
      </CardTitle>

      <Field className="m-2">
        <FieldLabel htmlFor="userBio">Description about you:</FieldLabel>
        <Textarea
          name="userBio"
          id="userBio"
          placeholder="Im 20. I have a dog. I love skateboarding <3"
        ></Textarea>
      </Field>

      <Field className="m-2">
        <FieldLabel>Language you speak:</FieldLabel>
        <Combobox items={Genders}>
          <ComboboxInput placeholder="Select a gender" />
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
        <FieldLabel>Language you speak:</FieldLabel>
        <Combobox items={Languages}>
          <ComboboxInput placeholder="Select a language" />
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
        <FieldLabel htmlFor="occupation">Your Occupation:</FieldLabel>
        <Input
          type="text"
          name="occupation"
          id="occupation"
          placeholder="teacher"
        />
      </Field>

      <FieldDescription
        id="backendErr"
        className="text-red-600 text-sm mt-1"
      ></FieldDescription>

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
  goNext: () => void,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const userBio = (form.get("userBio") as string) || undefined; //check if normal later
  const gender = (form.get("gender") as string) || undefined; //check if normal later
  const language = (form.get("language") as string) || undefined;
  const occupation = (form.get("occupation") as string) || undefined; //check if normal later
  const connectionEmail = (form.get("connectionEmail") as string) || undefined;

  document.getElementById("emailErr")!.innerHTML = "";

  /* Validate email format if a connection email is provided */
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (connectionEmail && !regex.test(connectionEmail as string)) {
    document.getElementById("emailErr")?.append("Invalid Email");
    return;
  }

  /** Attempt to update user data */
  try {
    await context.changeUserData({
      userBio: userBio as string,
      gender: gender as string,
      language: language as string,
      occupation: occupation as string,
      connectionEmail: connectionEmail as string,
    });
    alert("Preferences saved successfully");

    goNext();
  } catch (error) {
    console.error("Registration error:", error);
    document.getElementById("backendErr")!.innerHTML = (error as Error).message;
  }
}
