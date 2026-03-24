import { Card, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { RatingProp } from "@/interfaces";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Rate(prop: RatingProp) {
  const [ratings, setRatings] = useState<Record<number, number>>({});

  function handleRating(id: number, rating: number) {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  }

  return (
    <div className="flex justify-center mt-10">
      <form
        className="form-scope"
        onSubmit={(e) => {
          if (e) {
            return;
          }
          handleSubmit(e, prop.houseOrRoommate);
        }}
      >
        <Card className="form-card w-full max-w-sm p-4">
          <CardTitle className="text-center text-xl font-bold">
            Rating
          </CardTitle>
          <Field>
            <FieldLabel>How many stars?</FieldLabel>
            <StarRating
              value={ratings[prop.id] || 0}
              onChange={(rating) => handleRating(prop.id, rating)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="comment">Your thoughts</FieldLabel>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Terribble living with him"
              required
            />
            <FieldDescription
              id="Err"
              className="text-red-600 text-sm"
            ></FieldDescription>
          </Field>
          <div className="my-button-scope">
            <Button className="primary-btn" type="submit">Rate</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  houseOrRoommate: string,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  var comment = form.get("comment")
}
