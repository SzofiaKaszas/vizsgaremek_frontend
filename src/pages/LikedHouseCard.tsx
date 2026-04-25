import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useContext } from "react";
import type { HouseListing, LikedHouseProps, User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { Trash } from "lucide-react";
import { HouseContext } from "@/context/houseContext";
import { useNavigate } from "react-router";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function LikedHouseCard(props: LikedHouseProps) {
  const [houses, setHouses] = useState<HouseListing[]>([]);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<Record<number, number>>({});
  const navigate = useNavigate();
  const houseContext = useContext(HouseContext);

  useEffect(() => {
    setHouses(props.likedHouses);
  }, [props.likedHouses]);


  const setHouseImage = (houseId: number, index: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [houseId]: index,
    }));
  };

  function removeHouse(id: number) {
    setHouses((prev) => prev.filter((h) => h.idHouse !== id));
  }

  async function toggleLike(id: number) {
    await houseContext.addLiked(id);
    removeHouse(id);
  }

  if (!props.isLoggedIn) {
    return <PleaseLogin text="Please login to view liked houses" />;
  }

  if (!houses.length) {
    return (
      <p className="text-muted-foreground text-center mt-6">
        You haven't liked any houses yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {houses.map((house) => (
        <Card
          key={house.idHouse}
          className="p-5 flex flex-col h-full min-h-[420px] hover:shadow-lg transition"
        >

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

          <div className="flex justify-between items-center pt-4 mt-auto border-t">

            <button
              onClick={() => toggleLike(house.idHouse)}
              className="text-sm text-muted-foreground hover:text-red-500 transition flex items-center gap-1"
            >
              <Trash size={22} />
            </button>

            <button
              onClick={() =>
                navigate("/rate", {
                  state: {
                    id: house.idHouse,
                    houseOrRoommate: "house",
                  },
                })
              }
              className="px-3 py-1 rounded-md text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
            >
              Rate
            </button>

          </div>

        </Card>
      ))}

      {openImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setOpenImage(null)}
        >
          <img
            src={openImage}
            className="max-w-[90%] max-h-[90%] object-contain rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}