import { Card, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { Star } from "lucide-react";
import { UserContext } from "@/context/userContext";
import type { RateHouse, RateUser } from "@/interfaces";
import { HouseContext } from "@/context/houseContext";

export function Rate() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const { state } = useLocation();
  const { id, houseOrRoommate } = state || {};

  const userContext = useContext(UserContext);
  const houseContext = useContext(HouseContext);

  const navigate = useNavigate();

  if (!id || !houseOrRoommate) {
    return <div>Missing data</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const comment = form.get("comment")?.toString() || "";

    console.log("ID:", id);
    console.log("Type:", houseOrRoommate);
    console.log("Rating:", rating);
    console.log("Comment:", comment);

    if (houseOrRoommate == "roommate") {
      const rate: Partial<RateUser> = {
        ratingMessage: comment,
        ratingScore: rating,
      };

      userContext.rateUser(id, rate);

      alert("siker");
    } else if (houseOrRoommate == "house") {
      const rate: Partial<RateHouse> = {
        ratingMessage: comment,
        ratingScore: rating,
      };

      houseContext.rateHouse(id, rate);

      alert("siker");
    }

    e.currentTarget.reset();
    setRating(0);
    navigate(-1);
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="form-scope" onSubmit={handleSubmit}>
        <Card className="form-card w-full max-w-sm p-4 overflow-hidden">
          <CardTitle className="text-center text-xl font-bold">
            Rating
          </CardTitle>

          <Field>
            <FieldLabel>How many stars?</FieldLabel>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = hover !== null ? star <= hover : star <= rating;

                return (
                  <Star
                    key={star}
                    size={22}
                    className="cursor-pointer transition-all"
                    fill={filled ? "gold" : "none"}
                    stroke={filled ? "gold" : "gray"}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(star)}
                  />
                );
              })}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="comment">Your thoughts</FieldLabel>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Terrible living with him"
              required
              className="w-full max-w-full whitespace-pre-wrap break-words"
            />
            <FieldDescription id="Err" className="text-red-600 text-sm" />
          </Field>

          <div className="my-button-scope">
            <Button className="primary-btn" type="submit">
              Rate
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
