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
      <div className="flex justify-center mt-10">
        <form
        className="form-scope"
          onSubmit={(e) => {
            handleSubmit(e, context);
          }}
        >
          <Card className="form-card w-full max-w-sm p-4">
            <CardTitle className="text-center text-xl font-bold">
              Login
            </CardTitle>
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
                className="text-red-600 text-sm"
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
            <div className="my-button-scope">
              <Button variant={"default"} type="submit" className="primary-btn">
                Login
              </Button>
            </div>
            <div>
              <a

                href="/register"
                className="normal-link"
              >
                Don't have an account? Register here.
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
