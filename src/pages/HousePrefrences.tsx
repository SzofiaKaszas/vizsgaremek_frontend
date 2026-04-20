/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
  Heating,
  KitchenFurnishing,
  Property,
} from "@/assets/housePref";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { HouseContext } from "@/context/houseContext";
import { useNavigate, type NavigateFunction } from "react-router";
import filter from "leo-profanity";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/**TODO: If already has house pref, show the data in inputs */
export function HousePrefrences() {
  const userContext = useContext(UserContext);
  const context = useContext(HouseContext);

  const navigate = useNavigate();

  const [maxRent, setMaxRent] = useState<number | null>(null);
  const [minSquareMeters, setMinSquareMeters] = useState<number | null>(null);
  const [minRooms, setMinRooms] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [kitchenFurnishing, setKitchenFurnishing] = useState("");
  const [minBathrooms, setMinBathrooms] = useState<number | null>(null);

  const [hasHousePref, setHasHousePref] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const hasHousePreff = await context.getHasHousePref();
      setHasHousePref(hasHousePref);

      if (hasHousePreff) {
        const housePref = await context.getHousePref();
        if (!housePref) {
          alert("Error fetching house preferences");
          return;
        }
        setMaxRent(housePref.maxRent);
        setMinSquareMeters(housePref.minSquareMeters);
        setMinRooms(housePref.minRooms);
        setCity(housePref.city);
        setPropertyType(housePref.propertyType);
        setHeatingType(housePref.heatingType);
        setFurnishing(housePref.furnishingLevel);
        setKitchenFurnishing(housePref.kitchenLevel);
        setMinBathrooms(housePref.minBathrooms);
      }
    }

    fetchData();
  }, [context]);
  return (
    <>
      <Toaster position="top-center" />
      <form
        className="form-scope"
        onSubmit={(e) => handleSubmit(e, userContext, context, navigate)}
      >
        <CardTitle className="text-center text-xl font-bold">
          House Preference
        </CardTitle>

        <Field className="m-2">
          <FieldLabel htmlFor="rent">Max rent:</FieldLabel>
          <Input
            type="number"
            id="rent"
            name="rent"
            placeholder="300 000"
            value={maxRent ?? ""}
            onChange={(e) =>
              setMaxRent(e.target.value ? Number(e.target.value) : null)
            }
          ></Input>
          <FieldDescription
            id="rentErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="sqmeter">Minimum square meters:</FieldLabel>
          <Input
            type="number"
            id="sqmeter"
            name="sqmeter"
            placeholder="5"
            value={minSquareMeters ?? ""}
            onChange={(e) =>
              setMinSquareMeters(e.target.value ? Number(e.target.value) : null)
            }
          ></Input>
          <FieldDescription
            id="sqmeterErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="minRoom">Minimum rooms:</FieldLabel>
          <Input
            type="number"
            id="minRooms"
            name="rooms"
            placeholder="3"
            value={minRooms ?? ""}
            onChange={(e) =>
              setMinRooms(e.target.value ? Number(e.target.value) : null)
            }
          ></Input>
          <FieldDescription
            id="minRoomsErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="city">City:</FieldLabel>
          <Input
            type="text"
            id="city"
            name="city"
            placeholder="Budapest"
            value={city ?? ""}
            onChange={(e) => setCity(e.target.value)}
          ></Input>
          <FieldDescription
            id="cityErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="property">Property type:</FieldLabel>
          <Combobox
            items={Property}
            value={propertyType}
            onValueChange={(value) => setPropertyType(value ?? "")}
          >
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
          <FieldDescription
            id="propertyErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="heating">Heating type:</FieldLabel>
          <Combobox
            items={Heating}
            value={heatingType}
            onValueChange={(value) => setHeatingType(value ?? "")}
          >
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
          <FieldDescription
            id="heatingErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="furnishing">Furnishing:</FieldLabel>
          <Combobox
            items={Furnishing}
            value={furnishing}
            onValueChange={(value) => setFurnishing(value ?? "")}
          >
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
          <FieldDescription
            id="furnishingErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="kitchen">Kitchen furnishing:</FieldLabel>
          <Combobox
            items={KitchenFurnishing}
            value={kitchenFurnishing}
            onValueChange={(value) => setKitchenFurnishing(value ?? "")}
          >
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
          <FieldDescription
            id="kitchenFurnishingErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <Field className="m-2">
          <FieldLabel htmlFor="bathrooms">Minimum bathrooms:</FieldLabel>
          <Input
            type="number"
            id="bathrooms"
            name="bathrooms"
            placeholder="1"
            value={minBathrooms ?? ""}
            onChange={(e) => setMinBathrooms(Number(e.target.value) || null)}
          ></Input>
          <FieldDescription
            id="bathroomsErr"
            className="text-red-600 text-sm mt-1"
          ></FieldDescription>
        </Field>

        <div className="my-button-scope">
          <Button variant={"default"} type="submit" className="primary-btn m-1">
            Next
          </Button>
          {
            /*hasHousePref ? */ <Button
              variant={"outline"}
              type="button"
              className="sec-btn m-1"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Skip
            </Button> /*: <></>*/
          }
        </div>
      </form>
    </>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userContext: React.ContextType<typeof UserContext>,
  context: React.ContextType<typeof HouseContext>,
  navigate: NavigateFunction,
) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const hasHousePref = await context.getHasHousePref();

  const rent = form.get("rent");
  const sqmeter = form.get("sqmeter");
  const rooms = form.get("rooms");
  const city = form.get("city");
  const propertyType = form.get("propertyType");
  const heatingType = form.get("heatingType");
  const furnishing = form.get("furnishing");
  const kitchenFurnishing = form.get("kitchenFurnishing");
  const bathrooms = form.get("bathrooms");

  document.getElementById("rentErr")!.innerHTML = "";
  document.getElementById("sqmeterErr")!.innerHTML = "";
  document.getElementById("minRoomsErr")!.innerHTML = "";
  document.getElementById("cityErr")!.innerHTML = "";
  document.getElementById("propertyErr")!.innerHTML = "";
  document.getElementById("heatingErr")!.innerHTML = "";
  document.getElementById("furnishingErr")!.innerHTML = "";
  document.getElementById("kitchenFurnishingErr")!.innerHTML = "";
  document.getElementById("bathroomsErr")!.innerHTML = "";

  let hasError = false;

  if (rent && Number(rent) < 0) {
    document.getElementById("rentErr")!.append("Rent must be positive");
    hasError = true;
  }

  if (sqmeter && Number(sqmeter) < 0) {
    document
      .getElementById("sqmeterErr")!
      .append("Square meters must be positive");
    hasError = true;
  }

  if (rooms && Number(rooms) < 0) {
    document
      .getElementById("minRoomsErr")!
      .append("Number of rooms must be positive");
    hasError = true;
  }

  if (bathrooms && Number(bathrooms) < 0) {
    document
      .getElementById("bathroomsErr")!
      .append("Number of bathrooms must be positive");
    hasError = true;
  }

  if (city && filter.check(city as string)) {
    document
      .getElementById("cityErr")!
      .append("Inappropriate content detected in city");
    hasError = true;
  }

  if (hasError) return;

  if (hasHousePref == false) {
    try {
      await context.addHousePref({
        houseSearchIdUser: userContext.userData?.idUser,
        maxRent: rent ? Number(rent) : null,
        minSquareMeters: sqmeter ? Number(sqmeter) : null,
        minRooms: rooms ? Number(rooms) : null,
        city: city && city !== "" ? (city as string) : null,
        propertyType:
          propertyType && propertyType !== "" ? (propertyType as string) : null,
        heatingType:
          heatingType && heatingType !== "" ? (heatingType as string) : null,
        furnishingLevel:
          furnishing && furnishing !== "" ? (furnishing as string) : null,
        kitchenLevel:
          kitchenFurnishing && kitchenFurnishing !== ""
            ? (kitchenFurnishing as string)
            : null,
        minBathrooms: bathrooms ? Number(bathrooms) : null,
      });
      toast.success("House preferences saved successfully");
      navigate("/main");
    } catch (err) {
      toast.error((err as Error).message);
      console.error("Error details:", err);
    }
    return;
  } else {
    /**TODO: change types to the right ones */
    try {
      await context.changeHousePref({
        houseSearchIdUser: userContext.userData?.idUser,
        maxRent: rent ? Number(rent) : null,
        minSquareMeters: sqmeter ? Number(sqmeter) : null,
        minRooms: rooms ? Number(rooms) : null,
        city: city && city !== "" ? (city as string) : null,
        propertyType:
          propertyType && propertyType !== "" ? (propertyType as string) : null,
        heatingType:
          heatingType && heatingType !== "" ? (heatingType as string) : null,
        furnishingLevel:
          furnishing && furnishing !== "" ? (furnishing as string) : null,
        kitchenLevel:
          kitchenFurnishing && kitchenFurnishing !== ""
            ? (kitchenFurnishing as string)
            : null,
        minBathrooms: bathrooms ? Number(bathrooms) : null,
      });
      toast.success("House preferences saved successfully");
      setTimeout(() => {
      navigate("/main");
    }, 800);
    } catch (err) {
      toast.error((err as Error).message);
      console.error("Error details:", err);
    }
    return;
  }
}
