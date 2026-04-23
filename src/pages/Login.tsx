import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AuthContext);

  if (!context.currentUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <form
          className="w-full max-w-md"
          onSubmit={(e) => {
            handleSubmit(e, context);
          }}
        >
          <Card className="p-8 rounded-2xl shadow-xl border border-slate-200 bg-white/80 backdrop-blur">
            
            {/* TITLE */}
            <CardTitle className="text-2xl font-semibold text-center mb-6 text-slate-800">
              Welcome back
            </CardTitle>

            {/* EMAIL */}
            <Field className="mb-4">
              <FieldLabel htmlFor="email" className="text-slate-600 text-sm">
                Email
              </FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-1 rounded-lg border-slate-300 focus:border-slate-500 focus:ring-slate-400"
              />
              <FieldDescription id="emailErr" className="text-red-500 text-sm" />
            </Field>

            {/* PASSWORD */}
            <Field className="mb-6">
              <FieldLabel htmlFor="password" className="text-slate-600 text-sm">
                Password
              </FieldLabel>

              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg border-slate-300 pr-10 focus:border-slate-500 focus:ring-slate-400"
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

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 transition"
            >
              Sign in
            </Button>

            {/* LINK */}
            <div className="text-center mt-6 text-sm text-slate-500">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Register
              </a>
            </div>
          </Card>
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

  let error = false;
  if (!email) {
    document.getElementById("emailErr")!.innerHTML = "";
    document.getElementById("emailErr")?.append("Please fill in email.");
    error = true;
  }

  if (!password) {
    document.getElementById("passwordErr")!.innerHTML = "";
    document.getElementById("passwordErr")?.append("Please fill in password.");
    error = true;
  }

  if (error) {
    return;
  }

  try {
    await context.login(email, password);
    window.location.href = "/main";
  } catch (err) {
    console.log(err);
    document.getElementById("passwordErr")!.innerHTML = (err as Error).message;
  }
}
