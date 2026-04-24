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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { HouseContext } from "@/context/houseContext";
import { UserContext } from "@/context/userContext";
import type { HouseContextType, UserContextType } from "@/interfaces";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import filter from "leo-profanity";

/**TODO: toast és navigate */
export function AddHouseListing() {
  const [step, setStep] = useState(1);
  const [createdHouseId, setCreatedHouseId] = useState<number | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const housecontext = useContext(HouseContext);
  const usercontext = useContext(UserContext);

  // 👉 STEP 2 upload
  const handleImageUpload = async () => {
    if (!selectedFile || !createdHouseId) return;
    if (images.length >= 8) return;

    setUploading(true);

    try {
      await housecontext.uploadHouseImage(selectedFile, createdHouseId);

      const previewUrl = URL.createObjectURL(selectedFile);

      setImages((prev) => [...prev, previewUrl]);
      setSelectedFile(null);

      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-6">

          {/* HEADER */}
          <div className="text-center space-y-1">
            <CardTitle>
              {step === 1 ? "Create listing" : "Upload images"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {step === 1
                ? "Add your property details"
                : "Add photos to your listing"}
            </p>
          </div>

          {/* STEP 1 */}
          <Toaster position="top-center" />
          <div className="w-full flex justify-center px-4 py-10">
            {step === 1 && (
              <form
                onSubmit={(e) =>
                  handleCreateHouse(
                    e,
                    usercontext,
                    housecontext,
                    setStep,
                    setCreatedHouseId
                  )
                }
                className="space-y-6"
              >
                {/* HEADER */}
                <Card className="p-6">
                  <CardTitle className="text-xl font-bold"> Add House Listing
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1"> Create a new listing for your property </p>
                </Card> {/* BASIC INFO */}
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Basic information</h3>
                  <Field> <FieldLabel> Description
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                    <Textarea name="description" required/>
                    <FieldDescription
                      id="descriptionErr"
                      className="text-red-600 text-sm mt-1"
                    ></FieldDescription>
                  </Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel> City
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input name="city" required/>
                      <FieldDescription
                        id="cityErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Address
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input name="location" required/>
                      <FieldDescription
                        id="locationErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel> Rent
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input type="number" name="rent" required/>
                    <FieldDescription
                      id="rentErr"
                      className="text-red-600 text-sm mt-1"
                    ></FieldDescription>
                  </Field>
                </Card>
                {/* PROPERTY */}
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Property details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel> Property type
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Combobox items={Property} required>
                        <ComboboxInput name="propertyType" required/>

                        <ComboboxContent>
                          <ComboboxEmpty>No items</ComboboxEmpty>

                          <ComboboxList>
                            {Property.map((item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>

                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription
                        id="propertyErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel>Floor</FieldLabel>
                      <Input type="number" name="floor" />
                      <FieldDescription
                        id="floorErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Square meter
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input type="number" name="sqmeter" required/>
                      <FieldDescription
                        id="sqmeterErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Rooms
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input type="number" name="rooms" required/>
                      <FieldDescription
                        id="minRoomsErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Bathrooms
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input type="number" name="bathrooms" required/>
                      <FieldDescription
                        id="bathroomsErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                  </div>
                </Card>
                {/* COMFORT */}
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Comfort</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field> <FieldLabel> Heating <span className="text-red-500">*</span>
                    </FieldLabel>
                      <Combobox items={Heating} required>
                        <ComboboxInput name="heatingType" required/>

                        <ComboboxContent>
                          <ComboboxEmpty>No items</ComboboxEmpty>
                          <ComboboxList>
                            {Heating.map((item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription
                        id="heatingErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Furnishing
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Combobox items={Furnishing} required>
                        <ComboboxInput name="furnishing" required/>

                        <ComboboxContent>
                          <ComboboxEmpty>No items</ComboboxEmpty>

                          <ComboboxList>
                            {Furnishing.map((item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>

                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription
                        id="furnishingErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel> Kitchen
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Combobox items={KitchenFurnishing} required>
                        <ComboboxInput name="kitchenFurnishing" required/>

                        <ComboboxContent>
                          <ComboboxEmpty>No items</ComboboxEmpty>

                          <ComboboxList>
                            {KitchenFurnishing.map((item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>

                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription
                        id="kitchenFurnishingErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </Field> {/* SWITCH */}
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <span>Air conditioner</span>
                      <Switch name="airConditioner" className="data-[state=checked]:bg-purple-600" />
                      <FieldDescription
                        id="airconditionerErr"
                        className="text-red-600 text-sm mt-1"
                      ></FieldDescription>
                    </div>
                  </div>
                </Card>
                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-accent text-white"
                  >
                    Continue to images
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">

                <Field>
                  <FieldLabel>Images (max 8)</FieldLabel>
                  <div className="flex gap-2 items-center">
                    <Input type="file" accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <Button type="button"
                      disabled={!selectedFile || images.length >= 8 || uploading}
                      className="bg-accent text-white"
                      onClick={handleImageUpload} >
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2"> {images.length}/8 uploaded </p>
                  {/* PREVIEW */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {images.map((img, i) => (<img key={i} src={img}
                      className="w-full h-20 object-cover rounded-md border" />))}
                  </div>
                </Field>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>

                  <Button
                    onClick={() =>
                      (window.location.href = "/managehouselising")
                    }
                    className="bg-accent text-white"
                  >
                    Finish
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

async function handleCreateHouse(
  e: React.FormEvent<HTMLFormElement>,
  userContext: UserContextType,
  houseContext: HouseContextType,
  setStep: (s: number) => void,
  setCreatedHouseId: (id: number) => void
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

  // reset errors
  const errors = [
    "descriptionErr",
    "rentErr",
    "sqmeterErr",
    "minRoomsErr",
    "cityErr",
    "propertyErr",
    "heatingErr",
    "furnishingErr",
    "kitchenFurnishingErr",
    "bathroomsErr",
    "locationErr",
    "floorErr",
  ];

  errors.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  let hasError = false;

  // helper
  const isEmpty = (v: any) => !v || String(v).trim().length === 0;
  const isNegative = (v: any) => Number(v) < 0;
  const isNaNNumber = (v: any) => isNaN(Number(v));

  // VALIDATION
  if (isEmpty(description)) {
    document.getElementById("descriptionErr")!.innerHTML = "Required";
    hasError = true;
  } else if (filter.check(description as string)) {
    document.getElementById("descriptionErr")!.innerHTML = "Inappropriate content";
    hasError = true;
  }

  if (isEmpty(city)) {
    document.getElementById("cityErr")!.innerHTML = "Required";
    hasError = true;
  } else if (filter.check(city as string)) {
    document.getElementById("cityErr")!.innerHTML = "Inappropriate content";
    hasError = true;
  }

  if (isEmpty(location)) {
    document.getElementById("locationErr")!.innerHTML = "Required";
    hasError = true;
  }else if (filter.check(location as string)) {
    document.getElementById("locationErr")!.innerHTML = "Inappropriate content";
    hasError = true;
  }

  if (isEmpty(rent)) {
    document.getElementById("rentErr")!.innerHTML = "Required";
    hasError = true;
  } else if (isNaNNumber(rent) || isNegative(rent)) {
    document.getElementById("rentErr")!.innerHTML = "Must be positive number";
    hasError = true;
  }

  if (isEmpty(sqmeter)) {
    document.getElementById("sqmeterErr")!.innerHTML = "Required";
    hasError = true;
  } else if (isNaNNumber(sqmeter) || isNegative(sqmeter)) {
    document.getElementById("sqmeterErr")!.innerHTML = "Must be positive number";
    hasError = true;
  }

  if (isEmpty(rooms)) {
    document.getElementById("minRoomsErr")!.innerHTML = "Required";
    hasError = true;
  } else if (isNaNNumber(rooms) || isNegative(rooms)) {
    document.getElementById("minRoomsErr")!.innerHTML = "Must be positive number";
    hasError = true;
  }

  if (isEmpty(bathrooms)) {
    document.getElementById("bathroomsErr")!.innerHTML = "Required";
    hasError = true;
  } else if (isNaNNumber(bathrooms) || isNegative(bathrooms)) {
    document.getElementById("bathroomsErr")!.innerHTML = "Must be positive number";
    hasError = true;
  }

  if (isEmpty(propertyType)) {
    document.getElementById("propertyErr")!.innerHTML = "Required";
    hasError = true;
  }

  if (isEmpty(heatingType)) {
    document.getElementById("heatingErr")!.innerHTML = "Required";
    hasError = true;
  }

  if (isEmpty(furnishing)) {
    document.getElementById("furnishingErr")!.innerHTML = "Required";
    hasError = true;
  }

  if (isEmpty(kitchenFurnishing)) {
    document.getElementById("kitchenFurnishingErr")!.innerHTML = "Required";
    hasError = true;
  }

  // floor optional, but if exists validate
  if (floor && (isNaNNumber(floor) || isNegative(floor))) {
    document.getElementById("floorErr")!.innerHTML = "Must be positive number";
    hasError = true;
  }

  if (hasError) return;

  const userId = userContext.userData?.idUser;
  if (!userId) {
    toast("User ID not found. Please log in again.");
    return;
  }
  console.log("User ID for house listing:", userId);

  try {
    const newHouse = await houseContext.addHouseListing({
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
    console.log("CREATED HOUSE:", newHouse);
    setCreatedHouseId(newHouse.idHouse);

    toast("House listing added successfully");

    setStep(2);
  } catch (err) {
    toast((err as Error).message);
    console.error("Error details:", err);
  }
  return;
}
