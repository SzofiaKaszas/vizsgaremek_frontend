import { useContext, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, type NavigateFunction } from "react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/**Add toast */
export function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //needed for registration, but not for the component itself, so it is passed to the handleSubmit function
  const context = useContext(AuthContext);

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-center mt-10">
        <form
          className="form-scope"
          onSubmit={(e) => {
            handleSubmit(e, context, navigate);
          }}
        >
          {/**all fields required except for the checkboxes */}
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
                  placeholder="Lee"
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
                  placeholder="Jordan"
                  required
                />
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel htmlFor="age">
                Birthday <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="date"
                name="age"
                placeholder="20"
                id="age"
                required
              ></Input>
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

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  required
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <FieldDescription
                id="passwordErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>

            <FieldSeparator />
            <Field>
              <FieldLabel htmlFor="has-house">
                Do you want to rent out a house to others?
                <Checkbox id="has-house" name="hasHouse"></Checkbox>
              </FieldLabel>
            </Field>

            <Field>
              <FieldLabel htmlFor="looking-for-house">
                Are you looking for a house?
                <Checkbox
                  id="looking-for-house"
                  name="lookingForHouse"
                ></Checkbox>
              </FieldLabel>
            </Field>

            <Field>
              <FieldLabel htmlFor="looking-for-roommate">
                Are you looking for a roommate?
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
    </>
  );
}

/**creates a new user */
async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
  navigate: NavigateFunction,
) {
  /**prevent reloading*/
  e.preventDefault();

  /** Get form data */
  const form = new FormData(e.currentTarget);
  const firstName = form.get("firstName") as string;
  const lastName = form.get("lastName") as string;
  const phoneNumber = form.get("phoneNumber") as string;
  const hasHouse = form.get("hasHouse") === "on";
  const lookingForPeople = form.get("lookingForRoommate") === "on";
  const lookingForHouse = form.get("lookingForHouse") === "on";
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  /** Clear previous error messages */
  document.getElementById("nameErr")!.innerHTML = "";
  document.getElementById("passwordErr")!.innerHTML = "";
  document.getElementById("ageErr")!.innerHTML = "";
  document.getElementById("emailErr")!.innerHTML = "";
  document.getElementById("phoneErr")!.innerHTML = "";
  document.getElementById("backendErr")!.innerHTML = "";

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone = /^\+?[0-9]{1,3}([-\s.]?[0-9]{2,4}){2,4}$/; // Simplified phone number regex
  const regexUppercase =
    /[A-Z]/; /** Uppercase letter regex for password complexity */
  const regexNumber = /[0-9]/; /** Number regex for password complexity */
  const regexMinLength =
    /.{6,}/; /** Minimum length regex for password complexity */

  let hasError = false;

  /**------------------------------- Validation -------------------------------*/

  /** Name validation */
  if (!firstName || !lastName) {
    document.getElementById("nameErr")?.append("Please fill in all fields");
    hasError = true;
  }

  /** Password validation */
  const passwordErrors = [];
  let hasPassword = true; // Since the password field is required, we can assume it exists

  if (!password) {
    passwordErrors.push("Please enter a password");
    hasError = true;
    hasPassword = false;
  }

  /** Password complexity checks */
  if (!regexMinLength.test(password as string) && hasPassword) {
    passwordErrors.push("Password must be at least 6 characters long");
    hasError = true;
  }

  if (!regexUppercase.test(password as string) && hasPassword) {
    passwordErrors.push("Password must contain at least one uppercase letter");
    hasError = true;
  }

  if (!regexNumber.test(password as string) && hasPassword) {
    passwordErrors.push("Password must contain at least one number");
    hasError = true;
  }

  document.getElementById("passwordErr")?.append(passwordErrors.join("\n"));

  /** Email validation */
  if (!email) {
    document
      .getElementById("emailErr")
      ?.append("Please enter an email address");
    hasError = true;
  } else if (!regexEmail.test(email as string)) {
    document.getElementById("emailErr")?.append("Invalid Email");
    hasError = true;
  }

  /** Phone number validation */
  if (!phoneNumber) {
    document.getElementById("phoneErr")?.append("Please enter a phone number");
    hasError = true;
  } else if (!regexPhone.test(phoneNumber as string)) {
    document.getElementById("phoneErr")?.append("Invalid phone number format");
    hasError = true;
  }

  /** Age validation */
  /** User must be at least 18 years old */
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const birth = (form.get("age") as string) || null;
  const birthDay = new Date(birth as string);

  if (!birthDay) {
    hasError = true;
    document.getElementById("ageErr")?.append("Please enter your birthday");
  } else if (!(isDate(birthDay) && eighteenYearsAgo > birthDay)) {
    hasError = true;
    document
      .getElementById("ageErr")
      ?.append("User must be at least 18 years old");
  }

  if (hasError) return;

  /** Create user object */
  const user: Omit<User, "idUser"> = {
    firstName,
    lastName,
    birthDay,
    phoneNumber,
    rating: 0,
    hasHouse,
    lookingForPeople,
    lookingForHouse,
    email,
    password,
    role: "user",
  };

  /** Attempt registration and login */
  try {
    await context.register(user);
    toast.success("Registration successful!");
    /** Attempt login if registered successfully */
    setTimeout(async () => {
      await context.login(email, password);
      if (lookingForPeople || lookingForHouse || hasHouse) {
        navigate("/setupprofile");
      } else {
        navigate("/main");
      }
    }, 800);
  } catch (error) {
    /* Handle registration or login errors */
    console.error("Registration error:", error);
    document.getElementById("backendErr")!.innerHTML = (error as Error).message;
  }
}
