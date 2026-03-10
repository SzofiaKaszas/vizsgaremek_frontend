import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const context = useContext(AuthContext);

  if (!context.currentUserId) {
    return (
      <div className="flex justify-center mt-10">
        <Card className="card w-full max-w-sm p-4">
          <CardTitle className="text-center text-xl font-bold">
            Login
          </CardTitle>
          <form
            onSubmit={(e) => {
              handleSubmit(e, context);
            }}
          >
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
            <div className="my-button-scope">
            <Button variant={"default"} type="submit" className="m-1">
              Login
            </Button>
            </div>
          </form>

          <div>
            <a
              href="/register"
              className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors p-2"
            >
              Don't have an account? Register here.
            </a>
          </div>
        </Card>
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

  if(!password){
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
    console.log(err)
    document.getElementById("passwordErr")!.innerHTML = (err as Error).message;
  }
}
