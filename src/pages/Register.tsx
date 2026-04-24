import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { isDate } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, type NavigateFunction } from "react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          className="w-full max-w-xl space-y-6 sm:space-y-7 px-1 sm:px-2"
          onSubmit={(e) => handleSubmit(e, context, navigate)}
        >
          {/* HEADER */}
          <div className="text-center space-y-1 sm:space-y-2">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Create account
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Join and start finding your next home
            </p>
          </div>

          {/* NAME */}
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input name="firstName" placeholder="Lee" required />
              <FieldDescription
                id="nameErr"
                className="text-xs text-red-500 mt-1"
              />
            </Field>

            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <Input name="lastName" placeholder="Jordan" required />
            </Field>
          </FieldGroup>

          {/* BIRTHDAY */}
          <Field>
            <FieldLabel>Birthday</FieldLabel>
            <Input type="date" name="age" required />
            <FieldDescription
              id="ageErr"
              className="text-xs text-red-500 mt-1"
            />
          </Field>

          {/* PHONE */}
          <Field>
            <FieldLabel>Phone Number</FieldLabel>
            <Input name="phoneNumber" placeholder="+36 30 123 4567" required />
            <FieldDescription
              id="phoneErr"
              className="text-xs text-red-500 mt-1"
            />
          </Field>

          {/* EMAIL */}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" name="email" placeholder="you@example.com" required />
            <FieldDescription
              id="emailErr"
              className="text-xs text-red-500 mt-1"
            />
          </Field>

          {/* PASSWORD */}
          <Field>
            <FieldLabel>Password</FieldLabel>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <FieldDescription
              id="passwordErr"
              className="text-xs text-red-500 mt-1 whitespace-pre-line"
            />
          </Field>

          {/* OPTIONS */}
          <div className="space-y-3 rounded-2xl border border-muted/60 bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm">I want to rent out a house</span>
              <Checkbox name="hasHouse" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">I am looking for a house</span>
              <Checkbox name="lookingForHouse" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">I am looking for a roommate</span>
              <Checkbox name="lookingForRoommate" />
            </div>

            <FieldDescription
              id="backendErr"
              className="text-xs text-red-500"
            />
          </div>

          {/* BUTTONS */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-2.5"
            >
              Create account
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-accent text-accent rounded-xl py-2.5"
              onClick={() => navigate("/login")}
            >
              Sign in instead
            </Button>
          </div>
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
