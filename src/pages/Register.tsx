import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";
import {
  Field,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function Register() {
  const context = useContext(AuthContext);

  return (
    <div className="flex justify-center mt-10">
    <Card className="w-full max-w-sm p-4">
      <CardTitle className="text-center text-xl font-bold">Register</CardTitle>
      <form
        onSubmit={(e) => {
          handleSubmit(e, context);
        }}
      >
        <FieldGroup className="grid max-w-sm grid-cols-2">
          <Field>
            <FieldLabel htmlFor="first-name">
              First Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="first-name"
              name="firstName"
              placeholder="Jordan"
              required
            />
            <FieldDescription id="nameErr" className="text-red-600 text-sm mt-1"></FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">
              Last Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Lee"
              required
            />
          </Field>
        </FieldGroup>
        <Field>
          <FieldLabel htmlFor="phone-number">
            Phone Number <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            type="tel"
            id="phone-number"
            name="phoneNumber"
            placeholder="000-000-0000"
            pattern="/^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/"
            required
          />
          <FieldDescription id="phoneErr" className="text-red-600 text-sm mt-1"></FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="lee.jordan@gmail.com"
            required
          />
          <FieldDescription id="emailErr" className="text-red-600 text-sm mt-1"></FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">
            Password <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
          />
          <FieldDescription id="passwordErr" className="text-red-600 text-sm mt-1"></FieldDescription>
        </Field>
        <FieldSeparator />
        <Field className="m-1">
          <FieldLabel htmlFor="has-house">
            Do you want to rent out a house to others?
            <span className="text-destructive">*</span>
            <Checkbox id="has-house" name="haHouse"></Checkbox>
          </FieldLabel>
        </Field>
        <Field className="m-1">
          <FieldLabel htmlFor="looking-for-roommate">
            Are you looking for a roommate?
            <span className="text-destructive">*</span>
            <Checkbox
              id="looking-for-roommate"
              name="lookingForRoommate"
            ></Checkbox>
          </FieldLabel>
        </Field>
        <Field className="m-1">
          <FieldLabel htmlFor="looking-for-house">
            Are you looking for a house?
            <span className="text-destructive">*</span>
            <Checkbox id="looking-for-house" name="lookingForHouse"></Checkbox>
          </FieldLabel>
        </Field>
        <Button variant={"default"} type="submit" className="m-1">
          Register
        </Button>
      </form>
    </Card>
    </div>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const firstName = (form.get("firstName") as string) || undefined;
  const lastName = (form.get("lastName") as string) || undefined;
  const phoneNumber = (form.get("phoneNumber") as string) || undefined;
  const hasHouse = form.get("hasHouse") === "on";
  const lookingForPeople = form.get("lookingForRoommate") === "on";
  const lookingForHouse = form.get("lookingForHouse") === "on";
  const email = (form.get("email") as string) || undefined;
  const password = (form.get("password") as string) || undefined;

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone =
    /^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/; // Simplified phone number regex
  const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters, one upperif( letter, one number

  let hasError = false;

  if (!firstName || !lastName) {
    document.getElementById("nameErr")!.innerHTML = "";
    document.getElementById("nameErr")?.append("Please fill in all fields");
    hasError = true;
  }

  if (!password) {
    document.getElementById("passwordErr")!.innerHTML = "";
    document.getElementById("passwordErr")?.append("Give password");
    hasError = true;
  } else if (!regexPassword.test(password as string)) {
    document.getElementById("passwordErr")!.innerHTML = "";
    document
      .getElementById("passwordErr")
      ?.append(
        "Password must be at least 6 characters long \n contain an uppercase letter\n contain a number.",
      );
    hasError = true;
  }

  if(!email){
    document.getElementById("emailErr")!.innerHTML = "";
    document.getElementById("emailErr")?.append("Give Email");
    hasError = true;
  }
  else if (!regexEmail.test(email as string)) {
    document.getElementById("emailErr")!.innerHTML = "";
    document.getElementById("emailErr")?.append("Invalid Email");
    hasError = true;
  }

  if(!phoneNumber){
    document.getElementById("phoneErr")!.innerHTML = "";
    document.getElementById("phoneErr")?.append("Give Phonenumber");
    hasError = true;
  }
  else if (!regexPhone.test(phoneNumber as string)) {
    document.getElementById("phoneErr")!.innerHTML = "";
    document.getElementById("phoneErr")?.append("Invalid Phonenumber");
    hasError = true;
  }
  

  if (hasError) return;

  const user: Omit<User, "idUser"> = {
    firstName,
    lastName,
    phoneNumber,
    hasHouse,
    lookingForPeople,
    lookingForHouse,
    email,
    password,
    role: "user",
  };
  try {
    await context.register(user);
    alert("Registration successful!");
    await context.login(email, password);
    if (lookingForPeople) {
      window.location.href = "/roommateprofile";
    } else if (lookingForHouse) {
      window.location.href = "/housepreferences";
    } else {
      window.location.href = "/main";
    }
  } catch (error) {
    alert((error as Error).message);
  }
}
