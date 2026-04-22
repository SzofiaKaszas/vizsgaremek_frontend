import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import type { HouseListingProps } from "@/interfaces";

export function HouseListingCard(props: HouseListingProps) {
  const house = props.houseListing;

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-sm p-4 space-y-4 hover:shadow-lg transition rounded-xl border border-muted/40">

        {/* IMAGE */}
        <div className="rounded-lg overflow-hidden">
          <Carousel>
            <CarouselContent>
              <img
                src="https://github.com/shadcn.png"
                alt="house"
                className="w-full h-48 object-cover"
              />
            </CarouselContent>
          </Carousel>
        </div>

        {/* HEADER */}
        <div className="space-y-1">
          <div className="text-lg font-semibold">
            {house.city}
          </div>

          <div className="text-sm text-muted-foreground">
            {house.location}
          </div>
        </div>

        {/* DESCRIPTION (FIXED POSITION) */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {house.description}
        </p>

        {/* MAIN INFO */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/40 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Rent</p>
            <p className="font-medium text-purple-600">
              {house.rent} HUF
            </p>
          </div>

          <div className="bg-muted/40 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Rooms</p>
            <p className="font-medium">{house.numberOfRooms}</p>
          </div>

          <div className="bg-muted/40 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Size</p>
            <p className="font-medium">{house.squareMeter} m²</p>
          </div>

          <div className="bg-muted/40 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Floor</p>
            <p className="font-medium">{house.whichFloor ?? "-"}</p>
          </div>
        </div>

      </Card>
    </div>
  );
}