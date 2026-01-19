import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

export function Login() {
  const context = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      context.login(email, password);
    }}>
      <h1>Login Page</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input onChange={
          (e) => setEmail(e.target.value === "" ? "" : e.target.value)
        } type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input onChange={
          (e) => setPassword(e.target.value === "" ? "" : e.target.value)
        } type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}