import { Carousel, CarouselContent } from "@/components/ui/carousel";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserContext } from "@/context/userContext";
import type { DialogContentProps, User } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

export function FindRoommateDialogContent(props: DialogContentProps) {
  const context = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await context.getUserById(props.id);
      setSelectedUser(user);
    };
    fetchUser();
  }, [props.id, context]);

  function whatToShow(value: string | undefined | null) {
    return value ? value : "Not specified";
  }

  return (
    <DialogContent className="p-0">
      <Carousel>
        <CarouselContent>
          <div className="w-full">
            <img
              src="https://github.com/shadcn.png"
              alt={
                selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}'s profile picture`
                  : "Profile picture"
              }
              className="w-full h-56 object-cover rounded-t-md"
            />
          </div>
        </CarouselContent>
      </Carousel>
      <div className="p-4 space-y-1">
        <DialogHeader className="p-0">
          <DialogTitle className="text-xl font-semibold">
            {selectedUser
              ? `${selectedUser.firstName} ${selectedUser.lastName}`
              : "Loading..."}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            {selectedUser
              ? `${whatToShow(selectedUser.gender)}, ${whatToShow(
                  selectedUser.age?.toString(),
                )}`
              : "Loading..."}
          </DialogDescription>
        </DialogHeader>

        {/* Details */}
        <div className="mt-3 space-y-2 text-sm">
          <p>
            {selectedUser ? whatToShow(selectedUser.userBio) : "Loading..."}
          </p>

          <p>
            <span className="font-medium">Language:</span>{" "}
            {selectedUser ? whatToShow(selectedUser.language) : "Loading..."}
          </p>

          <p>
            <span className="font-medium">Job:</span>{" "}
            {selectedUser ? whatToShow(selectedUser.occupation) : "Loading..."}
          </p>

          <p>
            <span className="font-medium">Email:</span>{" "}
            {selectedUser ? selectedUser.email : "Loading..."}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-4 justify-center pb-2 mt-4">
        <DialogClose asChild>
        <button
          className="dislikeButton h-10 w-10 rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.triggerAnimation(selectedUser!.idUser, "left", "dislike");
          }}
        >
          <ThumbsDown fill="var(--color-bluee)" stroke="var(--color-bluee)" />
        </button>
        </DialogClose>
        <DialogClose asChild>
        <button
          className="likeButton h-10 w-10 rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.triggerAnimation(selectedUser!.idUser, "right", "like");
          }}
        >
          <Heart fill="red" stroke="red" />
        </button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
