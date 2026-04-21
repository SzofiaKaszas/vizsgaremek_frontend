import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindHouseProps, HouseListing } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { HouseContext } from "@/context/houseContext";

export function FindHouseCard(props: FindHouseProps) {
  const [housePrefList, setHousePrefList] = useState<HouseListing[]>([]);
  const context = useContext(HouseContext);

  useEffect(() => {
    async function load() {
      const data = await props.housePref;
      setHousePrefList(data);
    }
    load();
  }, [props.housePref]);

  function removeHouse(id: number) {
    setHousePrefList((prev) => prev.filter((h) => h.idHouse !== id));
  }

  async function likeHouse(id: number) {
    await context.addLiked(id);
    removeHouse(id);
  }

  function dislikeHouse(id: number) {
    removeHouse(id);
  }

  if (!props.isLoggedIn) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Please login to continue
      </div>
    );
  }

  if (housePrefList.length === 0) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        No more houses available
      </div>
    );
  }

  const active = housePrefList[0];
  const preview = housePrefList.slice(1, 4);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-10">

      {/* LEFT PREVIEW */}
      <div className="space-y-4">
        {preview.map((pref) => (
          <Card
            key={pref.idHouse}
            className="p-4 opacity-60 scale-[0.95]"
          >
            <div className="font-medium">
              {pref.city}, {pref.location}
            </div>
            <div className="text-xs text-muted-foreground">
              {pref.rent} Ft • {pref.squareMeter} m²
            </div>
          </Card>
        ))}
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center">
        <Card className="w-full h-[560px] p-5 flex flex-col justify-between shadow-lg">

          <div>
            <img
              src="https://github.com/shadcn.png"
              className="w-full h-56 object-cover rounded-md mb-4"
            />

            <Field>
              <div className="text-lg font-semibold">
                {active.city}, {active.location}
              </div>
              <FieldDescription>
                {active.description}
              </FieldDescription>
            </Field>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><b>Rent:</b> {active.rent} Ft</div>
              <div><b>Size:</b> {active.squareMeter} m²</div>
              <div><b>Rooms:</b> {active.numberOfRooms}</div>
              <div><b>Bath:</b> {active.bathrooms}</div>
              <div><b>Floor:</b> {active.whichFloor}</div>
              <div><b>Type:</b> {active.propertyType}</div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between mt-6">
            <button
              className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
              onClick={() => dislikeHouse(active.idHouse)}
            >
              <ThumbsDown />
            </button>

            <button
              className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
              onClick={() => likeHouse(active.idHouse)}
            >
              <Heart />
            </button>
          </div>
        </Card>
      </div>

      {/* RIGHT PANEL */}
      <div>
        <Card className="p-5 h-[560px]">
          <h2 className="text-lg font-semibold mb-4">House details</h2>

          <div className="space-y-2 text-sm">
            <p><b>Heating:</b> {active.heatingType}</p>
            <p><b>Furnishing:</b> {active.furnishingLevel}</p>
            <p><b>Kitchen:</b> {active.kitchenLevel}</p>
            <p><b>Air conditioning:</b> {active.airConditioner ? "Yes" : "No"}</p>
          </div>
        </Card>
      </div>

    </div>
  );
}