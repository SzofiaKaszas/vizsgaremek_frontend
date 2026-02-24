import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindRoommateProps } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

export function FindRoommateCard(props: FindRoommateProps) {
  function whatToShow(string: string | undefined | null) {
    if (string === undefined || string === "" || string === null) {
      return "Not specified";
    } else {
      return string;
    }
  }

  return props.isLoggedIn === true ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4">
      {props.roommatePref.map((pref) => (
        <Card key={pref.idUser} className="col-auto card w-full max-w-sm p-4">
          <Carousel>
            <CarouselContent>
              <img
                src="https://github.com/shadcn.png"
                alt={`${pref.firstName} ${pref.lastName}'s profile`}
                className="w-full h-48 object-cover rounded-md"
              />
            </CarouselContent>
          </Carousel>
          <Field>
            {pref.firstName} {pref.lastName} -{" "}
            {whatToShow(pref.age?.toString())}
            <FieldDescription>{whatToShow(pref.gender)}</FieldDescription>
          </Field>
          <Field>Language: {whatToShow(pref.language)}</Field>
          <Field>{pref.userBio ? pref.userBio : ""}</Field>
        </Card>
      ))}
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}
