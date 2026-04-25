import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindHouseProps, HouseListing } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { HouseContext } from "@/context/houseContext";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function FindHouseCard(props: FindHouseProps) {
  const [list, setList] = useState<HouseListing[]>([]);
  const context = useContext(HouseContext);

  useEffect(() => {
    setList(props.housePref);
  }, [props.housePref]);

  async function like(id: number) {
    await context.addLiked(id);
    next();
  }

  function dislike() {
    next();
  }

  function next() {
    setList((prev) => prev.slice(1));
  }

  if (!props.isLoggedIn) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Please login to continue
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        No more houses available
      </div>
    );
  }

  const active = list[0];
  const preview = list.slice(1, 4);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-3 order-2 lg:order-1">
        {preview.map((p) => (
          <Card key={p.idHouse} className="p-3 opacity-60">
            <div className="font-medium">
              {p.city}, {p.location}
            </div>
          </Card>
        ))}
      </div>

      <div className="order-1 lg:order-2">
        <Card className="p-5 min-h-[520px] flex flex-col justify-between">

          <div>
            {active?.images?.length ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {active.images.map((img) => (
                    <CarouselItem key={img.idHouseImage} className="basis-full">
                      <Card className="p-0 overflow-hidden rounded-xl shadow-none border">
                        <CardContent className="p-0">
                          <div className="w-full h-90 overflow-hidden">
                            <img
                              src={img.url}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <Carousel>
                <CarouselContent>
                  <img
                    src="https://github.com/shadcn.png"
                    className="w-full h-90 object-cover rounded-md mb-4"
                  />
                </CarouselContent>
              </Carousel>
            )}

            <Field>
              <div className="text-lg font-semibold">
                {active.city}, {active.location}
              </div>
              <FieldDescription>
                {active.description ?? "No description"}
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

          <div className="pt-6 pb-2">
            <div className="flex justify-between">
              <button
                onClick={dislike}
                className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center hover:scale-105 transition"
              >
                <ThumbsDown />
              </button>

              <button
                onClick={() => like(active.idHouse)}
                className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center hover:scale-105 transition"
              >
                <Heart />
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="order-3">
        <Card className="p-5 min-h-[520px]">

          <h2 className="text-lg font-semibold mb-4">
            House details
          </h2>

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