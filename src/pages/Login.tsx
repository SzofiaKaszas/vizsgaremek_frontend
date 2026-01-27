import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

export function Login() {
  const context = useContext(AuthContext);

  const [_error, setError] = useState("");

  if (!context.currentUserId) {
    return (
      <>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            try {
              await context.login(
                form.get("email") as string,
                form.get("password") as string,
              );
              setError("");
              window.location.href = "/main";
            } catch (err) {
              setError((err as Error).message);
            }
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
