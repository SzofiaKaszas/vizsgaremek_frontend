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
    HouseListing,
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
import type { HouseContextType, User } from "@/interfaces";

import { useContext, useState } from "react";
import { toast, Toaster } from "sonner";
import filter from "leo-profanity";
import { useLocation, useNavigate, type NavigateFunction } from "react-router";
import { UserContext } from "@/context/userContext";

export default function EditHouseListing() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const houseContext = useContext(HouseContext);
    const { userData } = useContext(UserContext)

    const house: HouseListing = state?.house;
    const [propertyType, setPropertyType] = useState<PropertyType | "">(house.propertyType);
    const [heatingType, setHeatingType] = useState<HeatingType | "">(house.heatingType);
    const [furnishing, setFurnishing] = useState<FurnishingType | "">(house.furnishingLevel);
    const [kitchen, setKitchen] = useState<KitchenFurnishingType | "">(house.kitchenLevel);


    const [loading, setLoading] = useState(false);

    if (!house) {
        return (
            <div className="text-center mt-10 text-muted-foreground">
                Missing house data
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-center" />

            <div className="w-full flex justify-center px-4 py-10">
                <div className="w-full max-w-3xl space-y-6">

                    <div className="text-center space-y-1">
                        <CardTitle>Edit house listing</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Update your property details
                        </p>
                    </div>

                    <form onSubmit={(e) => { handleEdit(e, houseContext, navigate, setLoading, house, userData) }} className="space-y-6">

                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold">Basic information</h3>

                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    name="description"
                                    defaultValue={house.description}
                                    required
                                />
                                <FieldDescription
                                    id="descriptionErr"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </Field>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>City</FieldLabel>
                                    <Input name="city" defaultValue={house.city} required />
                                    <FieldDescription
                                        id="cityErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Address</FieldLabel>
                                    <Input name="location" defaultValue={house.location} required />
                                    <FieldDescription
                                        id="locationErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Rent</FieldLabel>
                                <Input
                                    type="number"
                                    name="rent"
                                    defaultValue={house.rent}
                                    required
                                />
                                <FieldDescription
                                    id="rentErr"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </Field>
                        </Card>

                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold">Property details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <Field>
                                    <FieldLabel>Property type</FieldLabel>
                                    <Combobox
                                        items={Property}
                                        value={propertyType}
                                        onValueChange={setPropertyType}
                                    >
                                        <ComboboxInput name="propertyType" value={propertyType} />
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
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Floor</FieldLabel>
                                    <Input name="floor" defaultValue={house.whichFloor} />
                                    <FieldDescription
                                        id="floorErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Square meter</FieldLabel>
                                    <Input
                                        type="number"
                                        name="sqmeter"
                                        defaultValue={house.squareMeter}
                                    />
                                    <FieldDescription
                                        id="sqmeterErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Rooms</FieldLabel>
                                    <Input
                                        type="number"
                                        name="rooms"
                                        defaultValue={house.numberOfRooms}
                                    />
                                    <FieldDescription
                                        id="minRoomsErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Bathrooms</FieldLabel>
                                    <Input
                                        type="number"
                                        name="bathrooms"
                                        defaultValue={house.bathrooms}
                                    />
                                    <FieldDescription
                                        id="bathroomsErr"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </Field>

                            </div>
                        </Card>

                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold">Comfort</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <Field>
                                    <FieldLabel>Heating</FieldLabel>
                                    <Combobox
                                        items={Heating}
                                        value={heatingType}
                                        onValueChange={setHeatingType}
                                    >
                                        <ComboboxInput name="heatingType" value={heatingType} />
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
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Furnishing</FieldLabel>
                                    <Combobox
                                        items={Furnishing}
                                        value={furnishing}
                                        onValueChange={setFurnishing}
                                    >
                                        <ComboboxInput name="furnishing" value={furnishing} />
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
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Kitchen</FieldLabel>
                                    <Combobox
                                        items={KitchenFurnishing}
                                        value={kitchen}
                                        onValueChange={setKitchen}
                                    >
                                        <ComboboxInput name="kitchenFurnishing" value={kitchen} />
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
                                    />
                                </Field>

                                <div className="flex items-center justify-between border rounded-md p-3">
                                    <span>Air conditioner</span>
                                    <Switch
                                        name="airConditioner"
                                        defaultChecked={house.airConditioner}
                                    />
                                </div>

                            </div>
                        </Card>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3">
                            <Button
                                type="submit"
                                className="w-full bg-accent text-white"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
}

async function handleEdit(e: React.FormEvent<HTMLFormElement>,
    houseContext: HouseContextType,
    navigate: NavigateFunction,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    house: HouseListing,
    userData: User | undefined) {
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
    } else if (filter.check(location as string)) {
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

    const userId = userData?.idUser;
    if (!userId) {
        toast("User ID not found. Please log in again.");
        return;
    }
    console.log("User ID for house listing:", userId);

    setLoading(true);

    try {
        await houseContext.editHouseListing(house.idHouse, {
            houseIdUser: house.houseIdUser,
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

        toast.success("House updated");
        setTimeout(() => {
            navigate(-1);
        }, 800)

    } catch (err) {
        toast.error("Update failed");
    } finally {
        setLoading(false);
    }
}
