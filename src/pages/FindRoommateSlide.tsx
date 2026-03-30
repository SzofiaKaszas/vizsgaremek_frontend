import type { FindRoommateProps, User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";

//import { IconUserCircle } from '@tabler/icons-react';
import { CircleArrowUp } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Drawer,
  //DrawerClose,
  DrawerContent,
  //DrawerDescription,
  //DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserContext } from "@/context/userContext";
//Húzogatás
import { motion, type PanInfo } from "framer-motion";

export function FindRoommateSlide(props: FindRoommateProps) {
  const [roommatePrefList, setroommatePrefList] = useState<User[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
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
    async function set() {
      setroommatePrefList(await props.roommatePref);
    }
    set();
  }, [props.roommatePref]);
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 20;

    if (info.offset.x > threshold) {
      console.log("jobbra húzva"); // => LIKE
      setDirection("right");
      setroommatePrefList((prev) => prev.slice(1));
    } else if (info.offset.x < -threshold) {
      console.log("balra húzva"); // <= DISLIKE
      setDirection("left");
      setroommatePrefList((prev) => prev.slice(1));
    } else {
      console.log("nem volt elég nagy húzás");
    }
  };
  
function getAge(birthDay: Date | undefined) {
  if (!birthDay) return "Unknown";

  const date = birthDay instanceof Date ? birthDay : new Date(birthDay);

  if (isNaN(date.getTime())) return "Unknown";

  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();

  const hasHadBirthdayThisYear =
    now.getMonth() > date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

  function whatToShow(string: string | undefined | null) {
    if (string === undefined || string === "" || string === null) {
      return "Not specified";
    } else {
      return string;
    }
  }

  return props.isLoggedIn ? (
    <div className="flex justify-center mt-10">
      <div className="mx-auto  sm:max-w-xs">
        {/*<h1 className="text-2xl font-bold text-center">Hunor csinálja</h1>*/}
        <div>
          {roommatePrefList.slice(0, 1).map((p, index) => (
            <motion.div
              key={p.idUser}
              drag={index === 0 ? "x" : false}
              onDragEnd={handleDragEnd}
              style={{
                zIndex: roommatePrefList.length - index,
                top: index,
              }}
              whileTap={{ scale: 1.05 }}
            >
              <Card className={`col-auto card w-full`}>
                <Card className="m-px">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src="https://github.com/shadcn.png"
                      className="w-full h-56 object-cover rounded-t-md"
                      
                    />
                  </CardContent>
                  <div className="py-2 text-center text-sm text-black font-semibold"
>
                    {p
                      ? ` ${p.firstName} ${p.lastName} - ${getAge(p.birthDay)} 
                      
                        Gender:${p.gender} Language:${whatToShow(p.language)}`  
                      : "Loding..."} 
                  </div>
                </Card>

                <Drawer>
                  <DrawerTrigger className="flex justify-center mt-10">
                    {" "}
                    <CircleArrowUp />{" "}
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        {p ? `${p.firstName} ${p.lastName}` : "Loding..."}
                      </DrawerTitle>

                      <div className="col-auto card w-full">
                        <Carousel
                          setApi={setApi}
                          className="max-w-xs mx-auto flex justify-center"
                        >
                          <CarouselContent>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <CarouselItem key={index}>
                                <Card className="m-px">
                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <img
                                      src="https://github.com/shadcn.png"
                                      className="w-full h-56 object-cover rounded-t-md"
                                    />
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                        <div>
                          Imags {current} of {count}
                        </div>
                        
                          <div className="mt-3 space-y-2 text-sm">
                            <p>{p ? whatToShow(p.userBio) : "Loading..."}</p>

                            <p>
                              <span className="font-medium">Language:</span>{" "}
                              {p
                                ? whatToShow(p.language)
                                : "Loading..."}
                            </p>

                            <p>
                              <span className="font-medium">Job:</span>{" "}
                              {p
                                ? whatToShow(p.occupation)
                                : "Loading..."}
                            </p>

                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              {p? p.email : "Loading..."}
                            </p>
                            
                          </div>
                          {/*p
                            ? ` ${whatToShow(p.userBio)}  
                              Language: ${whatToShow(p.language)}
                               Jobb: ${whatToShow(p.occupation)}`
                            : "Loding..."*/}
                        
                      </div>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}
