import { Card } from "@/components/ui/card";
import { PleaseLogin } from "./PleaseLogin";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { LikedUserProps, User, UserNecesarry } from "@/interfaces";
import { UserContext } from "@/context/userContext";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

export function LikeUserCard(props: LikedUserProps) {
  const [likedUsers, setLikedUsers] = useState<UserNecesarry[]>([]);
  const [fullUsers, setFullUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    setLikedUsers(props.likedUsers);
  }, [props.likedUsers]);

  useEffect(() => {
    if (!likedUsers.length) return;

    let cancelled = false;

    async function fetchFullUsers() {
      setLoading(true);

      const result: Record<number, User> = {};

      await Promise.all(
        likedUsers.map(async (u) => {
          const full = await context.getUserById(u.idUser);
          result[u.idUser] = full;
        })
      );

      if (!cancelled) {
        setFullUsers(result);
        setLoading(false);
      }
    }

    fetchFullUsers();

    return () => {
      cancelled = true;
    };
  }, [likedUsers, context]);

  function removeUser(id: number) {
    setLikedUsers((prev) => prev.filter((u) => u.idUser !== id));
  }

  async function toggleLike(id: number) {
    await context.addLiked(id);
    removeUser(id);
  }

  if (!props.isLoggedIn) {
    return <PleaseLogin text="Please login to view liked users" />;
  }

  function getAge(birthDay?: Date) {
    if (!birthDay) return "Unknown";

    const date = new Date(birthDay);
    if (isNaN(date.getTime())) return "Unknown";

    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();

    const hasHadBirthday =
      now.getMonth() > date.getMonth() ||
      (now.getMonth() === date.getMonth() &&
        now.getDate() >= date.getDate());

    if (!hasHadBirthday) age--;

    return age;
  }

  if (loading || !likedUsers.length) {
    return (
      <p className="text-muted-foreground text-center mt-6">
        You haven't liked anyone yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {likedUsers.map((user) => {
        const full = fullUsers[user.idUser];

        return (
          <Card
            key={user.idUser}
            className="p-5 space-y-4 hover:shadow-lg transition"
          >

            {/* HEADER */}
            <div className="flex gap-4 items-center">

              {/* IMAGE GALLERY */}
              <div className="space-y-2">

                {/* MAIN IMAGE */}
                <Carousel>
                  <CarouselContent className="image-wrapper">
                    <div className="w-full h-52 rounded-xl overflow-hidden bg-muted">
                      <img
                        src={
                          "https://github.com/shadcn.png"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselContent>
                </Carousel>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {user.gender ?? "Not specified"}
                </p>
              </div>

            </div>

            {/* BIO */}
            <p className="text-sm text-muted-foreground border-l-2 border-purple-400 pl-3">
              {user.userBio ?? "No bio available"}
            </p>

            {/* FULL DATA (hydrated) */}
            {full ? (
              <div className="grid grid-cols-2 gap-2 text-sm">

                <div>
                  <span className="text-muted-foreground">Age</span>
                  <p className="font-medium break-all">{full ? getAge(full.birthDay) : "N/A"}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Language</span>
                  <p className="font-medium">{full.language ?? "N/A"}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Occupation</span>
                  <p className="font-medium">{full.occupation ?? "N/A"}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Email</span>
                  <p className="font-medium break-all">{full.email}</p>
                </div>

              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Loading details...
              </p>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between pt-3 border-t">

              <button
                onClick={() => toggleLike(user.idUser)}
                className="text-sm text-muted-foreground hover:text-red-500 transition"
              >
                Unlike
              </button>

              <button
                onClick={() =>
                  navigate("/rate", {
                    state: {
                      id: user.idUser,
                      houseOrRoommate: "roommate",
                    },
                  })
                }
                className="px-3 py-1 rounded-md text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
              >
                Rate
              </button>

            </div>

          </Card>
        );
      })}

    </div>
  );
}