import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { HouseListingProps } from "@/interfaces";
import { useState } from "react";
import { useContext } from "react";
import { HouseContext } from "@/context/houseContext";
import { useNavigate } from "react-router";
import { Pencil, Trash } from "lucide-react";

export function HouseListingCard(props: HouseListingProps) {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<Record<number, number>>({});
  const house = props.houseListing;
  const houseContext = useContext(HouseContext);
  const navigate = useNavigate();

  const setHouseImage = (houseId: number, index: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [houseId]: index,
    }));
  };

  async function handleDelete() {
    await houseContext.deleteHouseListing(house.idHouse);
  }

  function handleEdit() {
    navigate("/edithouse", {
      state: { house },
    });
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-sm p-4 space-y-4 hover:shadow-lg transition rounded-xl border border-muted/40">

        <div className="rounded-lg overflow-hidden">
          {house?.images?.length ? (
            <>
              <Carousel
                className="w-full"
                setApi={(api) => {
                  if (!api) return;

                  api.on("select", () => {
                    setHouseImage(
                      house.idHouse,
                      api.selectedScrollSnap()
                    );
                  });
                }}
              >
                <CarouselContent>
                  {house.images.map((img, index) => (
                    <CarouselItem key={img.idHouseImage} className="basis-full">
                      <Card className="p-0 overflow-hidden rounded-xl shadow-none border">
                        <CardContent className="p-0">
                          <div className="w-full h-90 overflow-hidden">
                            <div className="relative w-full h-90 overflow-hidden rounded-md flex items-center justify-center">

                              {/* blurred background */}
                              <img
                                src={img.url}
                                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
                              />

                              {/* dark overlay (optional but makes it nicer) */}
                              <div className="absolute inset-0 bg-black/10" />

                              {/* main image */}
                              <img
                                src={img.url}
                                className="relative max-w-full max-h-full object-contain z-10"
                                onClick={() => setOpenImage(img.url)}
                              />

                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-2 mt-2">
                {house.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${index === (activeImages[house.idHouse] ?? 0)
                      ? "bg-purple-600 w-4"
                      : "bg-gray-300"
                      }`}
                  />
                ))}
              </div></>
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
        </div>

        <div>
            <h3 className="font-semibold text-lg">
              {house.city}, {house.location}
            </h3>

            <p className="text-sm text-muted-foreground">
              {house.propertyType} • {house.squareMeter} m²
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">

            <p><span className="text-muted-foreground">Rent:</span> {house.rent} Ft</p>
            <p><span className="text-muted-foreground">Rooms:</span> {house.numberOfRooms}</p>

            <p><span className="text-muted-foreground">Bath:</span> {house.bathrooms}</p>
            <p><span className="text-muted-foreground">Floor:</span> {house.whichFloor}</p>

            <p><span className="text-muted-foreground">Heating:</span> {house.heatingType}</p>
            <p><span className="text-muted-foreground">Kitchen:</span> {house.kitchenLevel}</p>

            <p><span className="text-muted-foreground">Furnishing:</span> {house.furnishingLevel}</p>
            <p><span className="text-muted-foreground">AC:</span> {house.airConditioner ? "Yes" : "No"}</p>

          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {house.description}
          </p>

        <div className="flex justify-between items-center pt-3 border-t mt-2">

          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
          >
            <Pencil size={18} />
            Edit
          </button>
        </div>
      </Card>
    </div>
  );
}