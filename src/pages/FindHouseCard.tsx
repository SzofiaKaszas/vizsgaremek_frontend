import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindHouseProps, HouseListing } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { /*useContext,*/ useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { HouseContext } from "@/context/houseContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
//import { UserContext } from "@/context/userContext";

/**TODO: rearrange data */0
export function FindHouseCard(props: FindHouseProps) {
  const [housePrefList, sethousePrefList] = useState<HouseListing[]>([]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null,
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function set() {
      sethousePrefList(await props.housePref);
    }
    set();
  }, [props.housePref]);

  function whatToShow(string: string | undefined | null) {
    if (string === undefined || string === "" || string === null) {
      return "Not specified";
    } else {
      return string;
    }
  }

  function removeHouse(id: number) {
    sethousePrefList((prev) => prev.filter((house) => house.idHouse !== id));
  }

  const context = useContext(HouseContext);

  async function LikeClick(id: number) {
    console.log(id);
    await context.addLiked(id);
  }
  if (housePrefList.length === 0) {
    return (
      <div className="w-full text-center mt-10 text-lg font-medium text-muted-foreground">
        No more roommates available right now.
      </div>
    );
  }

  return props.isLoggedIn === true ? (
    <div className="find-card-scope grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 px-2">
      {housePrefList.map((pref) => (
        <Dialog key={pref.idHouse}>
          <DialogTrigger asChild onClick={handleOpen}>
            <Card
              className={`
    col-auto card w-full p-4
    ${animatingId === pref.idHouse && direction === "right" ? "swipe-right" : ""}
    ${animatingId === pref.idHouse && direction === "left" ? "swipe-left" : ""}
  `}
              onAnimationEnd={async () => {
                if (animatingId === pref.idHouse) {
                  if (pendingAction === "like") {
                    LikeClick(pref.idHouse);
                  }
                  removeHouse(pref.idHouse);

                  setAnimatingId(null);
                  setDirection(null);
                  setPendingAction(null);
                }
              }}
            >
              <Carousel>
                <CarouselContent>
                  <img
                    src="https://github.com/shadcn.png"
                    alt={`${pref.city} ${pref.location}'s profile picture`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CarouselContent>
              </Carousel>

              <Field>
                <strong>Location:</strong> {pref.city}, {pref.location}
                <FieldDescription>{pref.description}</FieldDescription>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <strong>Rent:</strong> {pref.rent} Ft
                </Field>

                <Field>
                  <strong>Property type:</strong> {`${pref.propertyType}`}
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <strong>Rooms:</strong> {pref.numberOfRooms}
                </Field>

                <Field>
                  <strong>Bathrooms:</strong> {pref.bathrooms}
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <strong>Floor:</strong> {pref.whichFloor}
                </Field>

                <Field>
                  <strong>Size:</strong> {pref.squareMeter} m²
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <strong>Heating:</strong> {`${pref.heatingType}`}
                </Field>

                <Field>
                  <strong>Furnishing:</strong> {`${pref.furnishingLevel}`}
                </Field>

                <Field>
                  <strong>Kitchen:</strong> {`${pref.kitchenLevel}`}
                </Field>
              </div>
              <Field>
                <strong>Air Conditioner:</strong>
                {pref.airConditioner ? "Yes" : "No"}
              </Field>
              <div className="w-full flex gap-4 justify-center">
                <button
                  className="dislikeButton h-10 w-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setAnimatingId(pref.idHouse);
                    setDirection("left");
                    setPendingAction("dislike");
                  }}
                >
                  <ThumbsDown
                    fill="var(--color-bluee)"
                    stroke="var(--color-bluee)"
                  />
                </button>
                <button
                  className="likeButton h-10 w-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setAnimatingId(pref.idHouse);
                    setDirection("right");
                    setPendingAction("like");
                  }}
                >
                  <Heart fill="red" stroke="red" />
                </button>
                <Button
                  data-dialog-ignore
                  onClick={(e) => {
                    e.stopPropagation(); // prevent dialog
                    navigate("/rate", {
                      state: {
                        id: pref.idHouse,
                        houseOrRoommate: "house",
                      },
                    });
                  }}
                  className="primary-btn"
                >
                  Rate
                </Button>
              </div>
            </Card>
          </DialogTrigger>
        </Dialog>
      ))}
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}

/**Making sure dialog doesnt open if your selecting text */
function handleOpen(e: React.MouseEvent) {
  const selection = window.getSelection();
  const isSelecting = selection && selection.toString().length > 0;

  if (isSelecting) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
}
