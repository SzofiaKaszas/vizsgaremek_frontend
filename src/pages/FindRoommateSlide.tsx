import type { FindRoommateProps, User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";

import {
  CircleArrowUp,
  Languages,
  BriefcaseBusiness,
  Send,
  Contact,
  Image,
  Heart,
  X,
} from "lucide-react";

import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { UserContext } from "@/context/userContext";

// swipe
import { motion, type PanInfo } from "framer-motion";

export function FindRoommateSlide(props: FindRoommateProps) {
  const [roommatePrefList, setroommatePrefList] = useState<User[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const context = useContext(UserContext);

  useEffect(() => {
    async function set() {
      setroommatePrefList(await props.roommatePref);
    }
    set();
  }, [props.roommatePref]);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  async function LikeClick(id: number) {
    await context.addLiked(id);
  }

  function handleLike(user: User) {
    setDirection("right");
    LikeClick(user.idUser);
    setTimeout(() => {
      setroommatePrefList((prev) => prev.slice(1));
      setDirection(null);
    }, 300);
  }

  function handleDislike(user: User) {
    setDirection("left");
    setTimeout(() => {
      setroommatePrefList((prev) => prev.slice(1));
      setDirection(null);
    }, 300);
  }

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 80;
    const currentUser = roommatePrefList[0];
    if (!currentUser) return;

    if (info.offset.x > threshold) {
      handleLike(currentUser);
    } else if (info.offset.x < -threshold) {
      handleDislike(currentUser);
    }
  };

  function getAge(birthDay: Date | undefined) {
    if (!birthDay) return "Unknown";

    const date = new Date(birthDay);
    if (isNaN(date.getTime())) return "Unknown";

    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();

    if (
      now.getMonth() < date.getMonth() ||
      (now.getMonth() === date.getMonth() &&
        now.getDate() < date.getDate())
    ) {
      age--;
    }

    return age;
  }

  function whatToShow(value: string | undefined | null) {
    return value ? value : "Not specified";
  }

  return props.isLoggedIn ? (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-sm">

        {roommatePrefList.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold">End</p>
            <p className="text-gray-500">No more results</p>
          </div>
        )}

        {roommatePrefList.slice(0, 1).map((p, index) => (
          <motion.div
            key={p.idUser}
            drag="x"
            onDragEnd={handleDragEnd}
            animate={{
              x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
              opacity: direction ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 1.03 }}
          >
            <Card className="rounded-2xl shadow-xl overflow-hidden bg-white">

              {/* IMAGE */}
              <div className="relative">
                <img
                  src="https://github.com/shadcn.png"
                  className="w-full h-80 object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h2 className="text-lg font-semibold">
                    {p.firstName} {p.lastName}
                  </h2>
                  <h3 className="text-lg font-semibold">
                    {getAge(p.birthDay)}
                  </h3>
                  <p className="text-sm opacity-80">{p.gender}</p>
                </div>
              </div>

              
              <CardContent className="text-center text-sm space-y-1 mt-2">
                <p>
                  <span className="font-medium">Language:</span>{" "}
                  {whatToShow(p.language)}
                </p>
                <p>
                  <span className="font-medium"></span>{" "}
                  {whatToShow(p.userBio)}
                </p>
              </CardContent>

              <div className="flex items-center justify-center gap-6 my-4">

               
                <button
                  onClick={() => handleDislike(p)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 p-4 rounded-full shadow-md transition"
                >
                  <X size={28} />
                </button>

                
                <Drawer>
                  <DrawerTrigger className="bg-gray-100 hover:bg-gray-200 p-4 rounded-full shadow-md transition">
                    <CircleArrowUp size={28} />
                  </DrawerTrigger>

                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        {p.firstName} {p.lastName}
                      </DrawerTitle>

                      <Carousel
                        setApi={setApi}
                        className="max-w-xs mx-auto"
                      >
                        <CarouselContent>
                          {Array.from({ length: 3 }).map((_, index) => (
                            <CarouselItem key={index}>
                              <Card>
                                <CardContent className="p-0">
                                  <img
                                    src="https://github.com/shadcn.png"
                                    className="w-full h-56 object-cover"
                                  />
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>

                      <div className="text-center text-sm mt-2">
                        <Image className="inline mr-1" />
                        {current} / {count}
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-center">

                        <p className="flex justify-center gap-2">
                          <Contact /> {whatToShow(p.userBio)}
                        </p>

                        <p className="flex justify-center gap-2">
                          <Languages /> {whatToShow(p.language)}
                        </p>

                        <p className="flex justify-center gap-2">
                          <BriefcaseBusiness /> {whatToShow(p.occupation)}
                        </p>

                        <p className="flex justify-center gap-2">
                          <Send /> {p.email}
                        </p>

                      </div>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>

                <button
                  onClick={() => handleLike(p)}
                  className="bg-green-100 hover:bg-green-200 text-green-600 p-4 rounded-full shadow-md transition"
                >
                  <Heart size={28} />
                </button>

              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}