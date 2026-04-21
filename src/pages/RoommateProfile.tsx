import { useContext, useEffect, useState } from "react";
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
import filter from "leo-profanity";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/**RoommateProfile component for updating user profile */
export function RoommateProfile({ goNext }: GoNextProp) {
  const context = useContext(UserContext);

  /**Variable to show email input if checkbox is checked */
  const [showEmailInput, setShowEmailInput] = useState(false);
  /**Variable for gender and language combobox */
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

  /**useEffect to get default values for the form -- if user already set it but wants to change it */
  useEffect(() => {
    if (context.userData?.gender) {
      setGender(context.userData.gender);
    }

    if (context.userData?.language) {
      setLanguage(context.userData.language);
    }

    setShowEmailInput(!!context.userData?.connectionEmail);
  }, [context.userData]);

  return (
    <>
      <Toaster position="top-center"/>
      <form
        className="form-scope"
        onSubmit={async (e) => {
          handleSubmit(e, context, goNext);
        }}
      >
        <CardTitle className="text-center text-xl font-bold p-2">
          Your Profile
        </CardTitle>

        {/**BIO */}
        <Field className="m-2">
          <FieldLabel htmlFor="userBio">Description about you:</FieldLabel>
          <Textarea
            name="userBio"
            id="userBio"
            placeholder="Im 20. I have a dog. I love skateboarding <3"
            defaultValue={context.userData?.userBio}
          ></Textarea>
          <FieldDescription
            id="userBioErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        {/**GENDER */}
        <Field className="m-2">
          <FieldLabel htmlFor="gender">Your Gender:</FieldLabel>
          <Combobox
            items={Genders}
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

        {/**LANGUAGE */}
        <Field className="m-2">
          <FieldLabel htmlFor="language">Language you speak:</FieldLabel>
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

        {/**OCCUPATION */}
        <Field className="m-2">
          <FieldLabel htmlFor="occupation">Your Occupation:</FieldLabel>
          <Input
            type="text"
            name="occupation"
            id="occupation"
            placeholder="teacher"
            defaultValue={context.userData?.occupation}
          />
          <FieldDescription
            id="occErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        {/**CHECKBOX FOR EMAIL */}
        <Field className="m-2">
          <FieldLabel
            htmlFor="wantsConnectionEmail"
            className="flex items-center gap-2"
          >
            Use a separate email for roommate/client contact
            <Checkbox
              id="wantsConnectionEmail"
              name="wantsConnectionEmail"
              checked={showEmailInput}
              onCheckedChange={(checked) => setShowEmailInput(!!checked)}
            />
          </FieldLabel>
        </Field>

        {/**EMAIL */}
        {showEmailInput && (
          <Field className="m-2">
            <FieldLabel htmlFor="connectionEmail">Connection email:</FieldLabel>
            <Input
              type="email"
              name="connectionEmail"
              id="connectionEmail"
              placeholder="profeshemail@gmail.com"
              defaultValue={context.userData?.connectionEmail}
            />
            <FieldDescription
              id="emailErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
          </Field>
        )}

        {/**backend errors */}
        <FieldDescription
          id="backendErr"
          className="text-red-600 text-sm mt-1"
        ></FieldDescription>

        <div className="my-button-scope">
          <Button variant={"default"} type="submit" className="primary-btn m-1">
            Next
          </Button>
          {
            /*context.hasCompletedStepOne ? */ <Button
              variant={"outline"}
              type="button"
              className="sec-btn m-1"
              onClick={() => {
                goNext();
              }}
            >
              Skip
            </Button> /*: <></>*/
          }
        </div>
      </form>
    </>
  );
}

/**Main handleSubmit function for updating user profile */
async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
  goNext: () => void,
) {
  /* Prevent page refreshing */
  e.preventDefault();

  /* Get form data */
  const form = new FormData(e.currentTarget);
  const userBio = (form.get("userBio") as string) || null;
  const gender = (form.get("gender") as string) || null;
  const language = (form.get("language") as string) || null;
  const occupation = (form.get("occupation") as string) || null;
  const wantsConnectionEmail = form.get("wantsConnectionEmail") === "on";
  let connectionEmail = null;

  /* Clear previous error messages */
  if (wantsConnectionEmail) {
    /* Only get connection email if user wants to provide one */
    connectionEmail = (form.get("connectionEmail") as string) || null;
    document.getElementById("emailErr")!.innerHTML = "";
  }

  document.getElementById("userBioErr")!.innerHTML = "";
  document.getElementById("occErr")!.innerHTML = "";
  document.getElementById("genderErr")!.innerHTML = "";
  document.getElementById("languageErr")!.innerHTML = "";
  document.getElementById("backendErr")!.innerHTML = "";

  /**-----------------------------------Validation-------------------------------- */
  let hasError = false;

  /**Validate user bio for inappropriate content */
  if (userBio && filter.check(userBio)) {
    document
      .getElementById("userBioErr")!
      .append("Inappropriate content detected in user bio");
    hasError = true;
  }

  /**Validate occupation */
  if (occupation && filter.check(occupation)) {
    document
      .getElementById("occErr")!
      .append("Inappropriate content detected in occupation");
    hasError = true;
  }

  /**Validate email */
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (wantsConnectionEmail) {
    const connectionEmail = form.get("connectionEmail") as string;

    if (!connectionEmail || !emailRegex.test(connectionEmail)) {
      document.getElementById("emailErr")!.append("Invalid Email");
      hasError = true;
    }
  }

  if (hasError) return;

  /** Attempt to update user data */
  try {
    context.changeUserData({
      userBio: userBio as string,
      gender: gender as string,
      language: language as string,
      occupation: occupation as string,
      connectionEmail: connectionEmail as string,
    });
    toast.success("Profile data saved successfully");

    /* Wait a bit before going to the next step to ensure the user sees the success message */
    setTimeout(() => {
      goNext();
    }, 800);
  } catch (error) {
    /**Display backend error */
    console.error("Registration error:", error);
    document.getElementById("backendErr")!.innerHTML = (error as Error).message;
  }
}
