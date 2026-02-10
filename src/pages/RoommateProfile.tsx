import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
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

export function RoommateProfile() {
  const context = useContext(UserContext);

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-sm p-4">
        <form
          onSubmit={async (e) => {
            handleSubmit(e, context);
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
              placeholder="Im 20. I have a dog. I love skating <3"
            ></Textarea>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="age">Your age:</FieldLabel>
            {/**maybe datepicker as birthday */}
            <Input type="number" name="age" placeholder="20" id="age"></Input>
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

          <Button variant={"default"} type="submit" className="m-1">
            Next
          </Button>
          <Button
            variant={"outline"}
            type="button"
            className="m-1"
            onClick={() => {
              window.location.href = "/main";
            }}
          >
            Do later
          </Button>
        </form>
      </Card>
    </div>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  const userBio = (form.get("userBio") as string) || undefined; //check if normal later
  const age = form.get("age");

  if ((age && isNaN(Number(age))) || (age && Number(age) <= 17)) {
    console.log("Invalid age input");
    return;
  }

  const gender = (form.get("gender") as string) || undefined; //check if normal later
  const language = (form.get("language") as string) || undefined;
  const occupation = (form.get("occupation") as string) || undefined; //check if normal later

  const connectionEmail = (form.get("connectionEmail") as string) || undefined;

  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (connectionEmail && !regex.test(connectionEmail as string)) {
    console.log("Invalid email format");
    return;
  }

  try {
    await context.changeUserData({
      userBio: userBio as string,
      age: age ? Number(age) : undefined,
      gender: gender as string,
      language: language as string,
      occupation: occupation as string,
      connectionEmail: connectionEmail as string,
    });
    alert("Preferences saved successfully");

    window.location.href = "/roommatepreferences";
  } catch (err) {
    alert((err as Error).message);
  }
}
