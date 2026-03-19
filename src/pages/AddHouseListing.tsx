import {
  Furnishing,
  Heating,
  KitchenFurnishing,
  Property,
} from "@/assets/housePref";
import type {
  FurnishingType,
  HeatingType,
  KitchenFurnishingType,
  PropertyType,
} from "@/assets/housePref";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { HouseContext } from "@/context/houseContext";
import { UserContext } from "@/context/userContext";
import type { HouseContextType, UserContextType } from "@/interfaces";
import { useContext } from "react";

export function AddHouseListing() {
  const housecontext = useContext(HouseContext);
  const usercontext = useContext(UserContext);

  return (
    <div className="form-scope flex justify-center mt-10">
      <Card className="form-card w-full max-w-sm p-4">
        <form onSubmit={(e) => handleSubmit(e, usercontext, housecontext)}>
          <CardTitle className="text-center text-xl font-bold">
            Add House Listing
          </CardTitle>

          <Field className="m-2">
            <FieldLabel htmlFor="description">
              Description <span className="text-destructive">*</span>
            </FieldLabel>
            <Textarea
              placeholder="this house is in the sub-urbs"
              id="description"
              name="description"
            ></Textarea>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="location">
              Address of the house
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="Budapest, 1051, Kossuth Lajos utca 1."
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="city">
              Which city is the house in
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="city"
              name="city"
              placeholder="Budapest"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="rent">
              Ideal rent <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              id="rent"
              name="rent"
              placeholder="300 000"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="property">
              Property type <span className="text-destructive">*</span>
            </FieldLabel>
            <Combobox items={Property}>
              <ComboboxInput
                placeholder="Select property type"
                id="property"
                name="propertyType"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="floor">
              Which floor is the house on
            </FieldLabel>
            <Input
              type="number"
              id="floor"
              name="floor"
              placeholder="1"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="sqmeter">
              How much square meters <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              id="sqmeter"
              name="sqmeter"
              placeholder="5"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="minRoom">
              How many rooms <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              id="minRooms"
              name="rooms"
              placeholder="3"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="heating">
              Heating type <span className="text-destructive">*</span>
            </FieldLabel>
            <Combobox items={Heating}>
              <ComboboxInput
                placeholder="Select heating type"
                id="heating"
                name="heatingType"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="furnishing">
              Furnishing <span className="text-destructive">*</span>
            </FieldLabel>
            <Combobox items={Furnishing}>
              <ComboboxInput
                placeholder="Select furnishing"
                id="furnishing"
                name="furnishing"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="kitchen">
              Kitchen furnishing <span className="text-destructive">*</span>
            </FieldLabel>
            <Combobox items={KitchenFurnishing}>
              <ComboboxInput
                placeholder="Select a kitchen furnishing"
                id="kitchen"
                name="kitchenFurnishing"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="bathrooms">
              How many bathrooms <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              id="bathrooms"
              name="bathrooms"
              placeholder="1"
            ></Input>
          </Field>

          <Field className="m-2">
            <FieldLabel htmlFor="airConditioner">
              Is there air conditioner
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Switch name="airConditioner" id="airConditioner"></Switch>
          </Field>

          <div className="my-button-scope">
            <Button variant={"default"} type="submit" className="primary-btn">
              Add
            </Button>
            <Button
              variant={"outline"}
              type="button"
              className="sec-btn"
              onClick={() => {
                window.location.href = "/managehouselising";
              }}
            >
              Back
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userContext: UserContextType,
  houseContext: HouseContextType,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  const description = form.get("description");
  const location = form.get("location");
  const city = form.get("city");
  const rent = form.get("rent");
  const propertyType = form.get("propertyType");
  const floor = form.get("floor");
  const sqmeter = form.get("sqmeter");
  const rooms = form.get("rooms");
  const heatingType = form.get("heatingType");
  const furnishing = form.get("furnishing");
  const kitchenFurnishing = form.get("kitchenFurnishing");
  const bathrooms = form.get("bathrooms");
  const airConditioner = form.get("airConditioner") === "on";

  if (rent && Number(rent) < 0) {
    console.log("Rent must be positive");
    return;
  }

  switch (true) {
    case rent && Number(rent) < 0:
      console.log("Rent must be positive");
      return;
    case sqmeter && Number(sqmeter) < 0:
      console.log("squaremeter cant be negative");
      return;
    case rooms && Number(rooms) < 0:
      console.log("room number cant be negative");
      return;
    case bathrooms && Number(bathrooms) < 0:
      console.log("bathroom number cant be negative");
      return;
    default:
      break;
  }

  const userId = userContext.userData?.idUser;
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    console.log("User ID for house listing:", userId);

  try {
    await houseContext.addHouseListing({
      houseIdUser: userId,
      description: description as string,
      location: location as string,
      city: city as string,
      rent: Number(rent),
      propertyType: propertyType as PropertyType,
      whichFloor: Number(floor),
      numberOfRooms: Number(rooms),
      squareMeter: Number(sqmeter),
      heatingType: heatingType as HeatingType,
      furnishingLevel: furnishing as FurnishingType,
      kitchenLevel: kitchenFurnishing as KitchenFurnishingType,
      bathrooms: Number(bathrooms),
      airConditioner: airConditioner,
    });
    alert("House listing added successfully");
    window.location.href = "/managehouselising";
  } catch (err) {
    alert((err as Error).message);
    console.error("Error details:", err);
  }
  return;
}
