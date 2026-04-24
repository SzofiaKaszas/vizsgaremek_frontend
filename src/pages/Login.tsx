import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AuthContext);

  if (!context.currentUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          className="w-full max-w-md space-y-6 sm:space-y-7 px-1 sm:px-2"
          onSubmit={(e) => handleSubmit(e, context)}
        >
          {/* HEADER */}
          <div className="text-center space-y-1 sm:space-y-2">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Welcome back
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign in to continue
            </p>
          </div>

          {/* EMAIL */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <FieldDescription
              id="emailErr"
              className="text-xs text-red-500 mt-1"
            />
          </Field>

          {/* PASSWORD */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
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
              className="text-xs text-red-500 mt-1"
            />
          </Field>

          {/* BUTTON */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-2.5"
            >
              Sign in
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-accent text-accent rounded-xl py-2.5"
              onClick={() => (window.location.href = "/register")}
            >
              Create account
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  const email = form.get("email") as string;
  const password = form.get("password") as string;

  document.getElementById("emailErr")!.innerHTML = "";
  document.getElementById("passwordErr")!.innerHTML = "";

  let error = false;

  if (!email) {
    document.getElementById("emailErr")?.append("Please fill in email.");
    error = true;
  }

  if (!password) {
    document.getElementById("passwordErr")?.append("Please fill in password.");
    error = true;
  }

  if (error) return;

  try {
    await context.login(email, password);
    window.location.href = "/main";
  } catch (err) {
    document.getElementById("passwordErr")!.innerHTML =
      (err as Error).message;
  }
}