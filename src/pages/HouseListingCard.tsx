/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Field, FieldDescription } from "@/components/ui/field";
import type { HouseListingProps } from "@/interfaces";

export function HouseListingCard(props: HouseListingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4" key={props.houseListing.idHouse}>
      <Card
        key={props.houseListing.idHouse}
        className="col-auto card w-full max-w-sm p-4"
      >
        <Carousel>
          <CarouselContent>
            <img
              src="https://github.com/shadcn.png"
              alt={`house picture`}
              className="w-full h-48 object-cover rounded-md"
            />
          </CarouselContent>
        </Carousel>
        <Field>
          {props.houseListing.city} -{props.houseListing.rent} HUF/month
          <FieldDescription>{props.houseListing.location}</FieldDescription>
        </Field>
        <Field>
          {props.houseListing.numberOfRooms} rooms,{" "}
          {props.houseListing.squareMeter} m²
        </Field>
        <Field>{props.houseListing.description}</Field>
      </Card>
    </div>
  );
}
