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

/**TODO: toast és navigate */
export function AddHouseListing() {
  const housecontext = useContext(HouseContext);
  const usercontext = useContext(UserContext);

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <form
        onSubmit={(e) => handleSubmit(e, usercontext, housecontext)}
        className="w-full max-w-3xl space-y-6"
      >

        {/* HEADER */}
        <Card className="p-6">
          <CardTitle className="text-xl font-bold">
            Add House Listing
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new listing for your property
          </p>
        </Card>

        {/* BASIC INFO */}
        <Card className="p-6 space-y-4">

          <h3 className="font-semibold">Basic information</h3>

          <Field>
            <FieldLabel>
              Description <span className="text-red-500">*</span>
            </FieldLabel>
            <Textarea name="description" />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel>
                City <span className="text-red-500">*</span>
              </FieldLabel>
              <Input name="city" />
            </Field>

            <Field>
              <FieldLabel>
                Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input name="location" />
            </Field>

          </div>

          <Field>
            <FieldLabel>
              Rent <span className="text-red-500">*</span>
            </FieldLabel>
            <Input type="number" name="rent" />
          </Field>

        </Card>

        {/* PROPERTY */}
        <Card className="p-6 space-y-4">

          <h3 className="font-semibold">Property details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel>
                Property type <span className="text-red-500">*</span>
              </FieldLabel>
              <Combobox items={Property}>
                <ComboboxInput name="propertyType" />
                <ComboboxContent>
                  <ComboboxEmpty>No items</ComboboxEmpty>
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

            <Field>
              <FieldLabel>Floor</FieldLabel>
              <Input type="number" name="floor" />
            </Field>

            <Field>
              <FieldLabel>
                Square meter <span className="text-red-500">*</span>
              </FieldLabel>
              <Input type="number" name="sqmeter" />
            </Field>

            <Field>
              <FieldLabel>
                Rooms <span className="text-red-500">*</span>
              </FieldLabel>
              <Input type="number" name="rooms" />
            </Field>

            <Field>
              <FieldLabel>
                Bathrooms <span className="text-red-500">*</span>
              </FieldLabel>
              <Input type="number" name="bathrooms" />
            </Field>

          </div>

        </Card>

        {/* COMFORT */}
        <Card className="p-6 space-y-4">

          <h3 className="font-semibold">Comfort</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel>
                Heating <span className="text-red-500">*</span>
              </FieldLabel>
              <Combobox items={Heating}>
                <ComboboxInput name="heatingType" />
                <ComboboxContent>
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

            <Field>
              <FieldLabel>
                Furnishing <span className="text-red-500">*</span>
              </FieldLabel>
              <Combobox items={Furnishing}>
                <ComboboxInput name="furnishing" />
                <ComboboxContent>
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

            <Field>
              <FieldLabel>
                Kitchen <span className="text-red-500">*</span>
              </FieldLabel>
              <Combobox items={KitchenFurnishing}>
                <ComboboxInput name="kitchenFurnishing" />
                <ComboboxContent>
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

            {/* SWITCH */}
            <div className="flex items-center justify-between border rounded-md p-3">
              <span>Air conditioner</span>

              <Switch
                name="airConditioner"
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

          </div>

        </Card>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">

          <Button
            type="button"
            variant="outline"
            className="border-gray-300"
            onClick={() => (window.location.href = "/managehouselising")}
          >
            Back
          </Button>

          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white"
          >
            Add Listing
          </Button>

        </div>

      </form>
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
