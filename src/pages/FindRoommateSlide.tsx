import type { FindRoommateProps } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";

export function FindRoommateSlide(props : FindRoommateProps) {
  return props.isLoggedIn ? (
    <div className="flex justify-center mt-10">
      <h1 className="text-2xl font-bold text-center">Hunor csinálja</h1>
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}