import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import type { PleaseLoginProps } from "@/interfaces";
import { useNavigate } from "react-router";

export function PleaseLogin(props: PleaseLoginProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center-safe content-center w-fit max-w-sm p-2 mx-auto mt-20">
      <div className="my-button-scope">
        <Field className="text center flex-auto">
          <p>{props.text}</p>
          <Button className="login-btn" onClick={() => (navigate("/login"))}>
            Login
          </Button>
        </Field>
      </div>
    </div>
  );
}
