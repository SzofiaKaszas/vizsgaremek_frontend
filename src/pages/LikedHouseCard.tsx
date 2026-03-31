import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Field, FieldDescription } from "@/components/ui/field";
import type { HouseListing, LikedHouseProps } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { useState, useEffect, useContext } from "react";
import { Heart } from "lucide-react";
import { HouseContext } from "@/context/houseContext";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function LikedHouseCard(props: LikedHouseProps) {
  const [houses, setLikedHouses] = useState<HouseListing[]>([]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null,
  );

  const houseContext = useContext(HouseContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function set() {
      setLikedHouses(await props.likedHouses);
    }
    set();
  }, [props.likedHouses]);

  function removeHouse(id: number) {
    setLikedHouses((prev) => prev.filter((h) => h.idHouse !== id));
  }

  async function LikeClick(id: number) {
    await houseContext.addLiked(id);
  }

  if (!props.isLoggedIn) {
    return <PleaseLogin text="Please login to view your liked houses" />;
  }

  if (!houses || houses.length === 0) {
    return (
      <div className="w-full text-center mt-10 text-lg font-medium text-muted-foreground">
        You haven't liked any houses yet.
      </div>
    );
  }

  return props.isLoggedIn === true ? (
    <div className="find-card-scope grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 px-2">
      {houses.map((house) => (
        <Card
          className={`
    col-auto card w-full p-4
    ${animatingId === house.idHouse && direction === "right" ? "swipe-right" : ""}
    ${animatingId === house.idHouse && direction === "left" ? "swipe-left" : ""}
  `}
          onAnimationEnd={async () => {
            if (animatingId === house.idHouse) {
              if (pendingAction === "like") {
                LikeClick(house.idHouse);
              }
              removeHouse(house.idHouse);

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
                alt={`${house.city} ${house.location}'s profile picture`}
                className="w-full h-48 object-cover rounded-md"
              />
            </CarouselContent>
          </Carousel>

          <Field>
            <strong>Location:</strong> {house.city}, {house.location}
            <FieldDescription>{house.description}</FieldDescription>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <strong>Rent:</strong> {house.rent} Ft
            </Field>

            <Field>
              <strong>Property type:</strong> {`${house.propertyType}`}
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <strong>Rooms:</strong> {house.numberOfRooms}
            </Field>

            <Field>
              <strong>Bathrooms:</strong> {house.bathrooms}
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <strong>Floor:</strong> {house.whichFloor}
            </Field>

            <Field>
              <strong>Size:</strong> {house.squareMeter} m²
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <strong>Heating:</strong> {`${house.heatingType}`}
            </Field>

            <Field>
              <strong>Furnishing:</strong> {`${house.furnishingLevel}`}
            </Field>

            <Field>
              <strong>Kitchen:</strong> {`${house.kitchenLevel}`}
            </Field>
          </div>
          <Field>
            <strong>Air Conditioner:</strong>
            {house.airConditioner ? "Yes" : "No"}
          </Field>
          <div className="w-full flex gap-4 justify-center">
            <button
              className="likeButton h-10 w-10 rounded-full flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setAnimatingId(house.idHouse);
                setDirection("right");
                setPendingAction("like");
              }}
            >
              <Heart fill="red" stroke="red" />
            </button>
            <div className="my-button-scope">
            <Button
              data-dialog-ignore
              onClick={(e) => {
                e.stopPropagation(); // prevent dialog
                navigate("/rate", {
                  state: {
                    id: house.idHouse,
                    houseOrRoommate: "house",
                  },
                });
              }}
              className="primary-btn"
            >
              Rate
            </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}
