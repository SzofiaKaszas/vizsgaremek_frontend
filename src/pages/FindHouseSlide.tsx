import { HouseContext } from "@/context/houseContext";
import type { FindHouseProps, HouseListing } from "@/interfaces";
import { Heart, ThumbsDown, CircleArrowUp, Image, Bath, DoorOpen, Icon } from "lucide-react";

import { useContext, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";


import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

import { motion, type PanInfo } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import React from "react";

export function FindHouseSlide(props: FindHouseProps) {
  const [list, setList] = useState<HouseListing[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const context = useContext(HouseContext);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  useEffect(() => {
    setList(props.housePref);
  }, [props.housePref]);

  function next() {
    setList((prev) => prev.slice(1));
  }

  async function like(id: number) {
    await context.addLiked(id);
    setDirection("right");
    setTimeout(() => {
      next();
      setDirection(null);
    }, 250);
  }

  function dislike() {
    setDirection("left");
    setTimeout(() => {
      next();
      setDirection(null);
    }, 250);
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80;
    const active = list[0];
    if (!active) return;

    if (info.offset.x > threshold) {
      like(active.idHouse);
    } else if (info.offset.x < -threshold) {
      dislike();
    }
  };

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

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-sm">
        <motion.div
          drag="x"
          onDragEnd={handleDragEnd}
          animate={{
            x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
            opacity: direction ? 0 : 1,
          }}
          transition={{ duration: 0.25 }}
        >
          <Card className="rounded-2xl shadow-xl overflow-hidden">

            <div className="relative">
              {active.images?.length ? (
                <img
                  src={active.images[0].url}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <img
                  src="http://localhost:9000/test-image/Q.jpg" 
                  className="w-full h-80 object-cover"
                />
                
              )}
              {/*Ha a kép szerver nem müködne szofi inen szedtem a képet https://pixabay.com/photos/question-mark-question-symbol-463497/*/}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h2 className="text-lg font-semibold">
                  {active.city}, {active.location}
                </h2>
                <p className="text-sm opacity-80">
                  {active.rent} Ft • {active.squareMeter} m²
                </p>
              </div>
            </div>


            <CardContent className="text-sm mt-2 space-y-2">
              <p className="text-center">
                {active.description ?? "No description"}
              </p>

              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-1">
                  <DoorOpen className="w-4 h-4" />
                  <span>
                    <b>Rooms:</b> {active.numberOfRooms}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>
                    <b>Bath:</b> {active.bathrooms}
                  </span>
                </div>
              </div>
            </CardContent>


            <div className="flex items-center justify-center gap-6 my-4">
              <button
                onClick={dislike}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-4 rounded-full shadow-md transition"
              >
                <ThumbsDown size={28} />
              </button>


              <Drawer>
                <DrawerTrigger asChild>
                  <button
                    onClick={(e) =>
                      (e.currentTarget as HTMLButtonElement).blur()
                    }
                    className="bg-gray-100 hover:bg-gray-200 p-4 rounded-full shadow-md transition"
                  >
                    <CircleArrowUp size={28} />
                  </button>
                </DrawerTrigger>

                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      {active.city}, {active.location}
                    </DrawerTitle>

                    <DrawerDescription>
                      Detailed information about the selected property.
                    </DrawerDescription>
                    <Carousel
                      setApi={setApi}
                      className="max-w-xs mx-auto flex justify-center"
                    >
                      <CarouselContent>
                        {active.images?.length > 0 ? (
                          Array.from({ length: active.images.length }).map((_, index) => (
                            <CarouselItem key={index}>
                              <Card className="m-px">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  <img
                                    src={active.images[index].url}
                                    className="w-full h-56 object-cover rounded-t-md"
                                  /> 
                                 
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))
                        ) : (
                          <p className="flex justify-center gap-2 ">No picture </p>
                      
                        )}
                      </CarouselContent>
                    </Carousel>
                    {active.images?.length > 0 && (
                      <div className="py-2 text-center text-sm text-black font-semibold flex items-center justify-center gap-2 ">
                        <Image /> {current} of {count}
                      </div>
                    )}

                    <div className="mt-4 space-y-2 text-sm text-center">
                      <p><b>Type:</b> {active.propertyType}</p>
                      <p><b>Floor:</b> {active.whichFloor}</p> {/*<Icon iconNode={stairs} /> https://lucide.dev/icons/lab/stairs*/}
                      <p><b>Heating:</b> {active.heatingType}</p> {/* <Heater /> */}
                      <p><b>Furnishing:</b> {active.furnishingLevel}</p> {/*  <ShelvingUnit /> */}
                      <p><b>Kitchen:</b> {active.kitchenLevel}</p> {/* <CookingPot /> */}
                      <p><b>AC:</b> {active.airConditioner ? "Yes" : "No"}</p>{/*  <AirVent /> */}
                    </div>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>

              <button
                onClick={() => like(active.idHouse)}
                className="bg-green-100 hover:bg-green-200 text-green-600 p-4 rounded-full shadow-md transition"
              >
                <Heart size={28} />
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}