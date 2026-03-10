/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindRoommateProps, User } from "@/interfaces";
import { PleaseLogin } from "./PleaseLogin";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FindRoommateDialogContent } from "./FindRoommateDialogContent";
import { useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { UserContext } from "@/context/userContext";

export function FindRoommateCard(props: FindRoommateProps) {
  const [roommatePrefList, setroommatePrefList] = useState<User[]>([]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null,
  );

  useEffect(() => {
    async function set() {
      setroommatePrefList(await props.roommatePref);
    }
    set();
  }, [props.roommatePref]);

  function whatToShow(string: string | undefined | null) {
    if (string === undefined || string === "" || string === null) {
      return "Not specified";
    } else {
      return string;
    }
  }

  function removeUser(id: number) {
    setroommatePrefList((prev) => prev.filter((user) => user.idUser !== id));
  }

  const context = useContext(UserContext);

  async function LikeClick(id: number) {
    console.log("like");
    //await context.addLiked(id);
  }
  if (roommatePrefList.length === 0) {
    return (
      <div className="w-full text-center mt-10 text-lg font-medium text-muted-foreground">
        No more roommates available right now.
      </div>
    );
  }

  return props.isLoggedIn === true ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4">
      {roommatePrefList.map((pref) => (
        <Dialog key={pref.idUser}>
          <DialogTrigger asChild onClick={handleOpen}>
            <Card
              className={`
    col-auto card w-full max-w-md p-4
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
                <CarouselContent>
                  <img
                    src="https://github.com/shadcn.png"
                    alt={`${pref.firstName} ${pref.lastName}'s profile picture`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CarouselContent>
              </Carousel>
              <Field>
                {pref.firstName} {pref.lastName} -{" "}
                {whatToShow(pref.age?.toString())}
                <FieldDescription>{whatToShow(pref.gender)}</FieldDescription>
              </Field>
              <Field>Language: {whatToShow(pref.language)}</Field>
              <Field>{pref.userBio}</Field>
              <div className="w-full flex gap-4 justify-center">
                <button
                  className="dislikeButton h-10 w-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setAnimatingId(pref.idUser);
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
                    setAnimatingId(pref.idUser);
                    setDirection("right");
                    setPendingAction("like");
                  }}
                >
                  <Heart fill="red" stroke="red" />
                </button>
              </div>
            </Card>
          </DialogTrigger>
          <FindRoommateDialogContent
            id={pref.idUser}
            prefList={roommatePrefList}
            onDislike={removeUser}
            onLike={LikeClick}
            triggerAnimation={(id, dir, action) => {
              setAnimatingId(id);
              setDirection(dir);
              setPendingAction(action);
            }}
          />
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
