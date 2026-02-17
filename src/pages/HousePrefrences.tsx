import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Furnishing,
  HeatingType,
  KitchenFurnishing,
  PropertyType,
} from "@/assets/housePref";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function HousePrefrences() {
  const context = useContext(UserContext);

  return (
    <form onSubmit={(e) => handleSubmit(e, context)}>
      <CardTitle className="text-center text-xl font-bold">
        House Prefrences
      </CardTitle>

      <Field className="m-2">
        <FieldLabel htmlFor="rent">Max rent:</FieldLabel>
        <Input
          type="number"
          id="rent"
          name="rent"
          placeholder="300 000"
        ></Input>
      </Field>

      <Field className="m-2">
        <FieldLabel htmlFor="sqmeter">Minimum square meters:</FieldLabel>
        <Input
          type="number"
          id="sqmeter"
          name="sqmeter"
          placeholder="5"
        ></Input>
      </Field>

      <Field className="m-2">
        <FieldLabel htmlFor="minRoom">Minimum rooms:</FieldLabel>
        <Input type="number" id="minRooms" name="rooms" placeholder="3"></Input>
      </Field>

      <Field className="m-2">
        <FieldLabel htmlFor="city">City:</FieldLabel>
        <Input type="text" id="city" name="city" placeholder="Budapest"></Input>
      </Field>

      <Field className="m-2">
        <FieldLabel htmlFor="property">Property type:</FieldLabel>
        <Combobox items={PropertyType}>
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
        <FieldLabel htmlFor="heating">Heating type:</FieldLabel>
        <Combobox items={HeatingType}>
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
        <FieldLabel htmlFor="furnishing">Furnishing:</FieldLabel>
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
        <FieldLabel htmlFor="kitchen">Kitchen furnishing:</FieldLabel>
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
        <FieldLabel htmlFor="bathrooms">Minimum bathrooms:</FieldLabel>
        <Input
          type="number"
          id="bathrooms"
          name="bathrooms"
          placeholder="1"
        ></Input>
      </Field>

      <div className="my-button-scope">
        <Button variant={"default"} type="submit" className="m-1">
          Next
        </Button>
        <Button
          variant={"outline"}
          type="button"
          className="m-1"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Skip
        </Button>
      </div>
    </form>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const rent = form.get("rent");
  const sqmeter = form.get("sqmeter");
  const rooms = form.get("rooms");
  const city = form.get("city");
  const propertyType = form.get("propertyType");
  const heatingType = form.get("heatingType");
  const furnishing = form.get("furnishing");
  const kitchenFurnishing = form.get("kitchenFurnishing");
  const bathrooms = form.get("bathrooms");

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

  try {
    await context.addHousePref({
      houseSearchIdUser: context.userData?.idUser,
      maxRent: rent ? Number(rent) : undefined,
      minSquareMeters: sqmeter ? Number(sqmeter) : undefined,
      minRooms: rooms ? Number(rooms) : undefined,
      city: city && city !== "" ? (city as string) : undefined,
      propertyType:
        propertyType && propertyType !== ""
          ? (propertyType as string)
          : undefined,
      heatingType:
        heatingType && heatingType !== "" ? (heatingType as string) : undefined,
      furnishingLevel:
        furnishing && furnishing !== "" ? (furnishing as string) : undefined,
      kitchenLevel:
        kitchenFurnishing && kitchenFurnishing !== ""
          ? (kitchenFurnishing as string)
          : undefined,
      minBathrooms: bathrooms ? Number(bathrooms) : undefined,
    });
    alert("Preferences saved successfully");
    window.location.href = "/main";
  } catch (err) {
    alert((err as Error).message);
    console.error("Error details:", err);
  }

  return;
}
