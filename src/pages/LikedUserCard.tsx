import { Card } from "@/components/ui/card";
import { PleaseLogin } from "./PleaseLogin";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { LikedUserProps, User, UserNecesarry } from "@/interfaces";
import { UserContext } from "@/context/userContext";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

export function LikeUserCard(props: LikedUserProps) {
  const [likedUsers, setLikedUsers] = useState<UserNecesarry[]>([]);
  const [matches, setMatches] = useState<User[]>([]);
  const [likedLoggedInUser, setLikedLoggedInUser] = useState<User[]>([])
  const [fullUsers, setFullUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    setLikedUsers(props.likedUsers);
    const fetchMatches = async () => {
      const match = await context.likesMatches();
      setMatches(match);

      const likedloggedin = await context.likedUser();
      setLikedLoggedInUser(likedloggedin);
    };
    fetchMatches();
  }, [props.likedUsers, context]);

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

  const matchIds = new Set(matches.map((u) => u.idUser));
  const likedYouIds = new Set(likedLoggedInUser.map((u) => u.idUser));

  // 👍 csak TE like-oltad (nem match)
  const onlyLiked = likedUsers.filter((u) => !matchIds.has(u.idUser));

  // 🔁 csak ŐK like-oltak téged (nem match)
  const onlyLikedYou = likedLoggedInUser.filter(
    (u) => !matchIds.has(u.idUser)
  );

  /**Helper functions */
  async function removeLike(id: number) {
    await context.addLiked(id);
    setLikedUsers((prev) => prev.filter((u) => u.idUser !== id));
    setMatches((prev) => prev.filter((u) => u.idUser !== id));
  }

  async function handleLikeBack(user: User) {
    await context.addLiked(user.idUser);

    // töröld a likedYou listából
    setLikedLoggedInUser((prev) =>
      prev.filter((u) => u.idUser !== user.idUser)
    );

    // add hozzá a matches-hez
    setMatches((prev) => [...prev, user]);
  }

  async function removeMatch(user: User) {
  await context.addLiked(user.idUser);

  // töröld matches-ből
  setMatches((prev) => prev.filter((u) => u.idUser !== user.idUser));

  // add hozzá likedYou-hoz (instant UI update)
  setLikedLoggedInUser((prev) => [...prev, user]);
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

  if (!props.isLoggedIn) {
    return <PleaseLogin text="Please login to view liked users" />;
  }

  if (loading || !likedUsers.length) {
    return (
      <p className="text-muted-foreground text-center mt-6">
        You haven't liked anyone yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 space-y-8">

      {/* ❤️ MATCHES */}
      {matches.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3">
            ❤️ Matches
          </h2>

          <div className="space-y-2">
            {matches.map((u) => {
              const full = fullUsers[u.idUser];

              return (
                <div
                  key={u.idUser}
                  className="flex items-center justify-between p-3 rounded-xl border hover:shadow-sm transition"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <div className="flex items-center gap-3">

                    <img
                      src="https://github.com/shadcn.png"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-medium text-sm">
                        {u.firstName} {u.lastName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {u.gender ?? "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate("/rate", {
                          state: {
                            id: u.idUser,
                            houseOrRoommate: "roommate",
                          },
                        })
                      }
                      className="text-xs px-3 py-1 rounded-md text-white"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      Rate
                    </button>

                    <button
                      onClick={() => removeMatch(u)}
                      className="text-xs px-3 py-1 rounded-md border text-red-500 hover:bg-red-50"
                    >
                      Unmatch
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 👍 YOU LIKED */}
      {onlyLiked.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3">
            👍 You liked
          </h2>

          <div className="space-y-2">
            {onlyLiked.map((u) => (
              <div
                key={u.idUser}
                className="flex items-center justify-between p-3 rounded-xl border"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://github.com/shadcn.png"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium text-sm">
                      {u.firstName} {u.lastName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {u.gender ?? "Not specified"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeLike(u.idUser)}
                  className="text-xs text-muted-foreground hover:text-red-500"
                >
                  Unlike
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔁 LIKED YOU */}
      {onlyLikedYou.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3">
            🔁 Liked you
          </h2>

          <div className="space-y-2">
            {onlyLikedYou.map((u) => (
              <div
                key={u.idUser}
                className="flex items-center justify-between p-3 rounded-xl border"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://github.com/shadcn.png"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium text-sm">
                      {u.firstName} {u.lastName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Wants to connect
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLikeBack(u)}
                  className="text-xs px-3 py-1 rounded-md text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Like back
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!matches.length && !onlyLiked.length && !onlyLikedYou.length && (
        <p className="text-center text-muted-foreground mt-6">
          No activity yet.
        </p>
      )}
    </div>
  );
}