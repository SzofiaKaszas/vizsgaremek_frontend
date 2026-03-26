import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { LikedUserProps, User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { /*useContext,*/ useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router";
import { Button } from "@base-ui/react";
//import { UserContext } from "@/context/userContext";

export function LikeUserCard(props: LikedUserProps) {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);

  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null,
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function set() {
      setLikedUsers(await props.likedUsers);
    }
    set();
  }, [props.likedUsers]);

  function removeUser(id: number) {
    setLikedUsers((prev) => prev.filter((user) => user.idUser !== id));
  }

  const context = useContext(UserContext);

  async function LikeClick(id: number) {
    await context.addLiked(id);
  }

  if (likedUsers.length === 0 && props.isLoggedIn) {
    return (
      <div className="w-full text-center mt-10 text-lg font-medium text-muted-foreground">
        No more roommates available right now.
      </div>
    );
  }

  return props.isLoggedIn === true ? (
    <div className="find-card-scope grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 px-2">
      {likedUsers.map((pref) => (
            <Card
              className={`
    col-auto card w-full p-4
    ${animatingId === pref.idUser && direction === "right" ? "swipe-right" : ""}
    ${animatingId === pref.idUser && direction === "left" ? "swipe-left" : ""}
  `}
              onAnimationEnd={async () => {
                if (animatingId === pref.idUser) {
                  if (pendingAction === "like") {
                    LikeClick(pref.idUser);
                  }
                  removeUser(pref.idUser);

                  setAnimatingId(null);
                  setDirection(null);
                  setPendingAction(null);
                }
              }}
            >
              <Carousel>
                <CarouselContent className="image-wrapper">
                  <img
                    src="https://github.com/shadcn.png"
                    alt={`${pref.firstName} ${pref.lastName}'s profile picture`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CarouselContent>
              </Carousel>
              <Field>
                {pref.firstName} {pref.lastName} - {getAge(pref.birthDay)}
                <FieldDescription>{whatToShow(pref.gender)}</FieldDescription>
              </Field>
              <Field>{pref.userBio}</Field>
              <Field>Language: {whatToShow(pref.language)}</Field>
              <Field>Occupation: {whatToShow(pref.occupation)}</Field>
              <div className="w-full flex gap-4 justify-center">
                <button
                  className="likeButton h-10 w-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setAnimatingId(pref.idUser);
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
                        id: pref.idUser,
                        houseOrRoommate: "roommate",
                      },
                    });
                  }}
                  className="primary-btn"
                >
                  Rate
                </Button>
              </div>
            </Card>
      ))}
    </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}

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
