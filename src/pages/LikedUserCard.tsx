import { Card } from "@/components/ui/card";
import { PleaseLogin } from "./PleaseLogin";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { LikedUserProps, User, UserNecesarry } from "@/interfaces";
import { UserContext } from "@/context/userContext";

/**rating, összes adatot mutatni -- képeket is. animacio a matchre */
export function LikeUserCard(props: LikedUserProps) {
  const [likedUsers, setLikedUsers] = useState<UserNecesarry[]>([]);
  const [matches, setMatches] = useState<User[]>([]);
  const [likedLoggedInUser, setLikedLoggedInUser] = useState<User[]>([]);
  const [fullUsers, setFullUsers] = useState<Record<number, User>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

  const onlyLiked = likedUsers.filter((u) => !matchIds.has(u.idUser));

  const onlyLikedYou = likedLoggedInUser.filter(
    (u) => !matchIds.has(u.idUser)
  );


  async function removeLike(id: number) {
    await context.addLiked(id);
    setLikedUsers((prev) => prev.filter((u) => u.idUser !== id));
    setMatches((prev) => prev.filter((u) => u.idUser !== id));

    if (selectedUser?.idUser === id) setSelectedUser(null);
  }

  async function handleLikeBack(user: User) {
    await context.addLiked(user.idUser);

    setLikedLoggedInUser((prev) =>
      prev.filter((u) => u.idUser !== user.idUser)
    );

    setMatches((prev) => [...prev, user]);

    setSelectedUser(user);
  }

  async function removeMatch(user: User) {
    await context.addLiked(user.idUser);

    setMatches((prev) => prev.filter((u) => u.idUser !== user.idUser));
    setLikedLoggedInUser((prev) => [...prev, user]);

    if (selectedUser?.idUser === user.idUser) setSelectedUser(null);
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
    <>
      <div className="block md:hidden">
      </div>

<div className="hidden md:block">
      <div className="max-w-5xl mx-auto px-3 grid grid-cols-3 gap-6">
        {/* LEFT SIDE LISTS */}
        <div className="col-span-1 space-y-8 border-r pr-4">

          {matches.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3">
                Matches
              </h2>

              <div className="space-y-2">
                {matches.map((u) => {
                  const full = fullUsers[u.idUser];

                  return (
                    <div
                      key={u.idUser}
                      onClick={() => setSelectedUser(u)}
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

          {onlyLiked.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3">
                You liked
              </h2>

              <div className="space-y-2">
                {onlyLiked.map((u) => (
                  <div
                    key={u.idUser}
                    onClick={() => setSelectedUser(u)}
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

          {onlyLikedYou.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3">
                Liked you
              </h2>

              <div className="space-y-2">
                {onlyLikedYou.map((u) => (
                  <div
                    key={u.idUser}
                    onClick={() => setSelectedUser(u)}
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

          {!matches.length && !onlyLiked.length && !onlyLikedYou.length && (
            <p className="text-center text-muted-foreground mt-6">
              No activity yet.
            </p>
          )}
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="col-span-2">
          {selectedUser ? (
            <Card className="p-6 space-y-6">

              <div className="flex items-center gap-5">
                <img
                  src="https://github.com/shadcn.png"
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>

                  <div className="flex items-center gap-3 mt-1 text-sm">

                    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                      {selectedUser.gender ?? "Unknown"}
                    </span>

                    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                      {getAge((selectedUser as any).birthDay)} years
                    </span>

                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="p-3 rounded-lg border">
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-medium">
                    {(selectedUser as any).email ?? "Not provided"}
                  </p>
                </div>

                <div className="p-3 rounded-lg border">
                  <p className="text-muted-foreground text-xs">Language</p>
                  <p className="font-medium">
                    {(selectedUser as any).language ?? "Unknown"}
                  </p>
                </div>

                <div className="p-3 rounded-lg border">
                  <p className="text-muted-foreground text-xs">Occupation</p>
                  <p className="font-medium">
                    {(selectedUser as any).occupation ?? "Not specified"}
                  </p>
                </div>

                {/* RATING (csillagokkal) */}
                {/*(selectedUser.rating ?? 0) > 0 && (
                  <div className="p-3 rounded-lg border">
                    <p className="text-muted-foreground text-xs">Rating</p>

                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < Math.round(selectedUser.rating ?? 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                )*/}

              </div>

              <div className="flex gap-2 pt-2">

                <button
                  onClick={() =>
                    navigate("/rate", {
                      state: {
                        id: selectedUser.idUser,
                        houseOrRoommate: "roommate",
                      },
                    })
                  }
                  className="px-3 py-1 text-white rounded"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Rate
                </button>

                {matches.find((m) => m.idUser === selectedUser.idUser) && (
                  <button
                    onClick={() => removeMatch(selectedUser)}
                    className="px-3 py-1 border rounded text-red-500"
                  >
                    Unmatch
                  </button>
                )}

                {onlyLiked.find((u) => u.idUser === selectedUser.idUser) && (
                  <button
                    onClick={() => removeLike(selectedUser.idUser)}
                    className="px-3 py-1 border rounded text-red-500"
                  >
                    Unlike
                  </button>
                )}

              </div>

            </Card>
          ) : (
            <p className="text-center text-muted-foreground mt-10">
              Select a user to see details
            </p>
          )}

        </div>
      </div>
      </div>
      </>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}