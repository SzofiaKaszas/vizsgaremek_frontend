import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function Logout() {
  const context = useContext(AuthContext);

  async function logout() {
    await context.logout();
  }

  return (
    <div className="my-button-scope">
        <Field>
      <Button onClick={logout}>Logout</Button>
      </Field>
    </div>
  );
}
