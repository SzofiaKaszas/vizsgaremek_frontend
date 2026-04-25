import { Card, CardTitle } from "@/components/ui/card";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, type NavigateFunction } from "react-router";
import { Star } from "lucide-react";
import { UserContext } from "@/context/userContext";
import { HouseContext } from "@/context/houseContext";
import type { HouseContextType, RateHouse, RateUser, UserContextType } from "@/interfaces";
import { toast, Toaster } from "sonner";

export function Rate() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const { state } = useLocation();
  const { id, houseOrRoommate } = state || {};

  const userContext = useContext(UserContext);
  const houseContext = useContext(HouseContext);
  const navigate = useNavigate();

  if (!id || !houseOrRoommate) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Missing data
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen flex items-center justify-center px-4 bg-background">

        <form onSubmit={(e) => {
          handleSubmit(e, houseOrRoommate, rating, userContext, id, houseContext, navigate)
        }} className="w-full max-w-md">

          <Card className="p-6 space-y-6 shadow-lg">

            <CardTitle className="text-center text-2xl font-semibold">
              Leave a rating
            </CardTitle>

            {/* STAR RATING */}
            <div className="flex flex-col items-center gap-3">

              <p className="text-sm text-muted-foreground">
                How was your experience?
              </p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled =
                    hover !== null ? star <= hover : star <= rating;

                  return (
                    <Star
                      key={star}
                      size={30}
                      className="cursor-pointer transition-transform hover:scale-110"
                      fill={filled ? "#a855f7" : "none"}
                      stroke={filled ? "#a855f7" : "#bbb"}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(star)}
                    />
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground">
                {rating > 0 ? `${rating}/5 selected` : "Select a rating"}
              </p>
            </div>

            {/* COMMENT */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Your review
              </label>

              <textarea
                name="comment"
                placeholder="What was your experience like?"
                required
                className="
                  w-full min-h-[120px]
                  rounded-md border
                  bg-background
                  p-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-400
                  resize-none
                "
              />
            </div>

            {/* ACTION */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Submit rating
              </Button>
            </div>

          </Card>

        </form>

      </div>
    </>
  );
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>, houseOrRoommate: any, rating: number, userContext: UserContextType, id: any, houseContext: HouseContextType, navigate: NavigateFunction) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const comment = form.get("comment")?.toString() || "";

  if (houseOrRoommate === "roommate") {
    const rate: Partial<RateUser> = {
      ratingMessage: comment,
      ratingScore: rating,
    };

    await userContext.rateUser(id, rate);
    toast.success("Successfully rated roommate");
  }

  if (houseOrRoommate === "house") {
    const rate: Partial<RateHouse> = {
      ratingMessage: comment,
      ratingScore: rating,
    };

    await houseContext.rateHouse(id, rate);
    toast.success("Successfully rated house");
  }

  setTimeout(() => navigate(-1), 600);
}