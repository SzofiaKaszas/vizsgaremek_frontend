import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import type { PleaseLoginProps } from "@/interfaces";

export function PleaseLogin(props : PleaseLoginProps) {
  return (
    <div className="flex justify-center-safe content-center w-fit max-w-sm p-2 mx-auto mt-20">
      <Field className="text center flex-auto">
        <p>{props.text}</p>
        <Button onClick={() => window.location.href = "/login"}>Login</Button>
      </Field>
    </div>
  );
}
