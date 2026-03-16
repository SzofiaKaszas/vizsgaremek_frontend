import type {  FindRoommateProps,User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";

////
//import { IconUserCircle } from '@tabler/icons-react';
import { CircleArrowUp } from 'lucide-react';
import * as React from "react"
import { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  /*
  CarouselNext,
  CarouselPrevious,*/
  type CarouselApi,
} from "@/components/ui/carousel"
//import { Button } from "@/components/ui/button"
import {
  Drawer,
  //DrawerClose,
  DrawerContent,
  DrawerDescription,
  //DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { UserContext } from "@/context/userContext";


export function FindRoommateSlide(props :FindRoommateProps) { //props : FindRoommateProps , props : DialogContentProps
  //Jobb -Ball
 //const [direction, setDirection] = useState<"left" | "right" | null>(null)
  //Kép húzogatás
  //const context = useContext(UserContext);
  //const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roommatePrefList, setroommatePrefList] = useState<User[]>([]);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  useEffect(()=>{
    async function set() {
      setroommatePrefList(await props.roommatePref)
      
    }
    set()
  },[props.roommatePref])
  
  function whatToShow(string: string | undefined | null) {
    if (string === undefined || string === "" || string === null) {
      return "Not specified";
    } else {
      return string;
    }
  }

  ///
  /*
  useEffect(()=>{
    const fetchUser=async()=>{
      const user=await context.getUserById(props.id);
      setSelectedUser(user)
    };
    fetchUser();

  },[props.id,context]);

   function whatToShow(value: string | undefined | null) {
    return value ? value : "Not specified";
  }
  */
  //props.isLoggedIn ? 
  // <div className="flex justify-center mt-10">  <div className="grid grid-cols-1">
  return props.isLoggedIn ? (
    
   <div className="flex justify-center mt-10"> 
     

      <div className="mx-auto max-w-[10rem] sm:max-w-xs">
         <h1 className="text-2xl font-bold text-center">Hunor csinálja</h1>
      <div>
     {roommatePrefList.map((p)=>(
      <Card className={`col-auto card w-full`}>
            <Carousel setApi={setApi} className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 2 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card className="m-px">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img src="https://github.com/shadcn.png" className="w-full h-56 object-cover rounded-t-md"/>
                        
                      </CardContent> 
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
            </Carousel>
      

      <div className="py-2 text-center text-sm text-muted-foreground">
        <div>
           Imags {current} of {count}
        </div>
        {p? `${p.firstName} ${p.language}` : "Loding..."}
      </div>

            <Drawer>
            <DrawerTrigger className="flex justify-center mt-10"> <CircleArrowUp />  </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{p? `${p.firstName} ${p.lastName}`: "Loding..."}</DrawerTitle>
                <DrawerDescription><div> 
                  <h1>
                    {p? `${p.firstName} ${p.lastName}`: "Loding..."}
                  </h1>
                 
                  <p>
                   {p? ` ${whatToShow(p.userBio)} \n Language: ${whatToShow(p.language)} \n Jobb: ${whatToShow(p.occupation)}`: "Loding..."}
                  </p>
                  
                  </div></DrawerDescription>
              </DrawerHeader>
             
            </DrawerContent>
          </Drawer>
    </Card>
     ))}

     
    </div>
    </div>
   
    </div>
    
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}