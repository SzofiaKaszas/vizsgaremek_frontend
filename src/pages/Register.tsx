import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { isDate } from "date-fns";

export function Register() {
  const context = useContext(AuthContext);

  return (
    <div className="flex justify-center mt-10">
      <form
        className="form-scope"
        onSubmit={(e) => {
          handleSubmit(e, context);
        }}
      >
        <Card className="form-card w-full max-w-sm p-4">
          <CardTitle className="text-center text-xl font-bold">
            Register
          </CardTitle>
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
              <FieldDescription
                id="nameErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
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
          <Field className="m-2">
            <FieldLabel htmlFor="age">
              Birthday <span className="text-destructive">*</span>
            </FieldLabel>
            <Input type="date" name="age" placeholder="20" id="age"></Input>
            <FieldDescription
              id="ageErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="phone-number">
              Phone Number <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="tel"
              id="phone-number"
              name="phoneNumber"
              placeholder="000-000-0000"
              required
            />
            <FieldDescription
              id="phoneErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
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
            <FieldDescription
              id="emailErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
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
            <FieldDescription
              id="passwordErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
          </Field>
          <FieldSeparator />
          <Field>
            <FieldLabel htmlFor="has-house">
              Do you want to rent out a house to others?
              <span className="text-destructive">*</span>
              <Checkbox id="has-house" name="hasHouse"></Checkbox>
            </FieldLabel>
          </Field>
          <Field>
            <FieldLabel htmlFor="looking-for-house">
              Are you looking for a house?
              <span className="text-destructive">*</span>
              <Checkbox
                id="looking-for-house"
                name="lookingForHouse"
              ></Checkbox>
            </FieldLabel>
          </Field>
          <Field>
            <FieldLabel htmlFor="looking-for-roommate">
              Are you looking for a roommate?
              <span className="text-destructive">*</span>
              <Checkbox
                id="looking-for-roommate"
                name="lookingForRoommate"
              ></Checkbox>
            </FieldLabel>
            <FieldDescription
              id="backendErr"
              className="text-red-600 text-sm mt-1"
            ></FieldDescription>
          </Field>
          <div className="my-button-scope">
            <Button variant={"default"} type="submit" className="primary-btn">
              Register
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const firstName = form.get("firstName") as string;
  const lastName = form.get("lastName") as string;
  const phoneNumber = form.get("phoneNumber") as string;
  const hasHouse = form.get("hasHouse") === "on";
  const lookingForPeople = form.get("lookingForRoommate") === "on";
  const lookingForHouse = form.get("lookingForHouse") === "on";
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  document.getElementById("nameErr")!.innerHTML = "";
  document.getElementById("passwordErr")!.innerHTML = "";
  document.getElementById("emailErr")!.innerHTML = "";
  document.getElementById("phoneErr")!.innerHTML = "";
  document.getElementById("backendErr")!.innerHTML = "";

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone =
    /^\+?\d{1,3}[-\s.]?\(?\d{2,3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/; // Simplified phone number regex
  const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters, one uppercase letter, one number

  let hasError = false;

  if (!firstName || !lastName) {
    document.getElementById("nameErr")?.append("Please fill in all fields");
    hasError = true;
  }

  if (!password) {
    document.getElementById("passwordErr")?.append("Give password");
    hasError = true;
  } else if (!regexPassword.test(password as string)) {
    document
      .getElementById("passwordErr")
      ?.append(
        "Password must be at least 6 characters long \n contain an uppercase letter\n contain a number.",
      );
    hasError = true;
  }

  if (!email) {
    document.getElementById("emailErr")?.append("Give Email");
    hasError = true;
  } else if (!regexEmail.test(email as string)) {
    document.getElementById("emailErr")?.append("Invalid Email");
    hasError = true;
  }

  if (!phoneNumber) {
    document.getElementById("phoneErr")?.append("Give Phonenumber");
    hasError = true;
  } else if (!regexPhone.test(phoneNumber as string)) {
    document.getElementById("phoneErr")?.append("Invalid Phonenumber");
    hasError = true;
  }

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const birth = (form.get("age") as string) || undefined;
  const birthDay = new Date(birth as string);

  if (!birthDay) {
    hasError = true;
    document.getElementById("ageErr")?.append("Give birthday");
  } else if (!(isDate(birthDay) && eighteenYearsAgo > birthDay)) {
    hasError = true;
    document
      .getElementById("ageErr")
      ?.append("User must be at least 18 years old");
  }

  if (hasError) return;

  const user: Omit<User, "idUser"> = {
    firstName,
    lastName,
    birthDay,
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
    if (lookingForPeople || lookingForHouse || hasHouse) {
      window.location.href = "/setupprofile";
    } else {
      window.location.href = "/main";
    }
  } catch (error) {
    console.error("Registration error:", error);
    document.getElementById("backendErr")!.innerHTML = (error as Error).message;
  }
}
