import { useState } from "react";
import { Star } from "lucide-react";

export function StarRating({
  value = 0,
  onChange,
  size = 22,
}: {
  value?: number;
  onChange?: (rating: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover !== null ? star <= hover : star <= value;

        return (
          <Star
            key={star}
            size={size}
            className="cursor-pointer transition-all"
            fill={filled ? "gold" : "none"}
            stroke={filled ? "gold" : "gray"}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => {
              //e.stopPropagation();
              onChange && onChange(star);
            }}
          />
        );
      })}
    </div>
  );
}
