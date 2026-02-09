import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"

export function Register() {
  const context = useContext(AuthContext);

  return (
    <div className="w-full max-w-md">
    <form
      onSubmit={(e) => {
        handleSubmit(e, context);
      }}
    >
      <h2>Register</h2>
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
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
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
        </Field>
      <Field>
        <FieldLabel htmlFor="has-house">
          Do you want to rent out a house to others?
          <span className="text-destructive">*</span>
          <Checkbox id="has-house" name="haHouse"></Checkbox>
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
      </Field>
      <Field>
        <FieldLabel htmlFor="looking-for-house">
          Are you looking for a house?
          <span className="text-destructive">*</span>
          <Checkbox id="looking-for-house" name="lookingForHouse"></Checkbox>
        </FieldLabel>
      </Field>
      <Button variant={"default"} type="submit">Register</Button>
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
  const regexPhone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // Simplified phone number regex
  const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters, one uppercase letter, one number

  switch (true) {
    case !firstName || !lastName || !phoneNumber || !email || !password:
      console.log("Please fill in all fields.");
      return;
    case !regexPassword.test(password as string):
      console.log(
        "Password must be at least 6 characters long and contain an uppercase letter and a number.",
      );
      return;
    case !regexEmail.test(email as string):
      console.log("Please enter a valid email address.");
      return;
    case !regexPhone.test(phoneNumber as string):
      console.log("Please enter a valid phone number.");
      return;
  }

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
