import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

export function Login() {
  const context = useContext(AuthContext);

  const [_error, setError] = useState("");

  if (!context.currentUserId) {
    return (
      <>
        <form
          onSubmit={(e) => {
            handleSubmit(e, context, setError);
          }}
        >
          <h1>Login Page</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>

        <div>
          <a href="/register">Don't have an account? Register here.</a>
        </div>
      </>
    );
  }
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
  setError: React.Dispatch<React.SetStateAction<string>>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    await context.login(email, password);
    setError("");
    window.location.href = "/main";
  } catch (err) {
    setError((err as Error).message);
  }
}
