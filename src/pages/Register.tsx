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
  const context = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 pt-24 pb-12 flex justify-center">
      
      <form
        className="w-full max-w-xl"
        onSubmit={(e) => {
          handleSubmit(e, context, navigate);
        }}
      >
        <Card className="p-6 rounded-2xl shadow-xl border border-slate-200 bg-white/80 backdrop-blur">

          {/* TITLE */}
          <CardTitle className="text-2xl font-semibold text-center text-slate-800">
            Create account
          </CardTitle>

          <div className="space-y-4 mt-6">

            {/* NAME */}
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel className="text-slate-600 text-sm">
                  First Name
                </FieldLabel>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Lee"
                  required
                  className="mt-1 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-400"
                />
                <FieldDescription id="nameErr" className="text-red-500 text-sm" />
              </Field>

              <Field>
                <FieldLabel className="text-slate-600 text-sm">
                  Last Name
                </FieldLabel>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Jordan"
                  required
                  className="mt-1 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-400"
                />
              </Field>
            </FieldGroup>

            {/* BIRTHDAY */}
            <Field>
              <FieldLabel className="text-slate-600 text-sm">
                Birthday
              </FieldLabel>
              <Input
                type="date"
                name="age"
                required
                className="mt-1 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-400"
              />
              <FieldDescription id="ageErr" className="text-red-500 text-sm" />
            </Field>

            {/* PHONE */}
            <Field>
              <FieldLabel className="text-slate-600 text-sm">
                Phone Number
              </FieldLabel>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="+36 30 123 4567"
                required
                className="mt-1 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-400"
              />
              <FieldDescription id="phoneErr" className="text-red-500 text-sm" />
            </Field>

            {/* EMAIL */}
            <Field>
              <FieldLabel className="text-slate-600 text-sm">
                Email
              </FieldLabel>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-1 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-400"
              />
              <FieldDescription id="emailErr" className="text-red-500 text-sm" />
            </Field>

            {/* PASSWORD */}
            <Field>
              <FieldLabel className="text-slate-600 text-sm">
                Password
              </FieldLabel>

              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg border-slate-300 pr-10 focus:border-purple-500 focus:ring-purple-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <FieldDescription id="passwordErr" className="text-red-500 text-sm mt-1" />
            </Field>

            {/* OPTIONS */}
            <div className="space-y-2 pt-2 border-t">

              <div className="flex items-center gap-2">
                <Checkbox id="has-house" name="hasHouse" />
                <label htmlFor="has-house" className="text-sm text-slate-600 cursor-pointer">
                  I want to rent out a house
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="looking-for-house" name="lookingForHouse" />
                <label htmlFor="looking-for-house" className="text-sm text-slate-600 cursor-pointer">
                  I am looking for a house
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="looking-for-roommate" name="lookingForRoommate" />
                <label htmlFor="looking-for-roommate" className="text-sm text-slate-600 cursor-pointer">
                  I am looking for a roommate
                </label>
              </div>

              <FieldDescription id="backendErr" className="text-red-500 text-sm" />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 transition mt-4"
            >
              Create account
            </Button>

            {/* LINK */}
            <div className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 font-medium hover:underline">
                Sign in
              </a>
            </div>

          </div>
        </Card>
      </form>
    </div>
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
