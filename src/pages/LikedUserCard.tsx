import { Card } from "@/components/ui/card";
import { PleaseLogin } from "./PleaseLogin";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { LikedUserProps, User, UserNecesarry } from "@/interfaces";
import { UserContext } from "@/context/userContext";

export function LikeUserCard(props: LikedUserProps) {
  const [likedUsers, setLikedUsers] = useState<UserNecesarry[]>([]);
  const [matches, setMatches] = useState<User[]>([]);
  const [likedLoggedInUser, setLikedLoggedInUser] = useState<User[]>([]);
  const [fullUsers, setFullUsers] = useState<Record<number, User>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // COLLAPSIBLE STATES
  const [openMatches, setOpenMatches] = useState(true);
  const [openLiked, setOpenLiked] = useState(true);
  const [openLikedYou, setOpenLikedYou] = useState(true);

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
  const onlyLikedYou = likedLoggedInUser.filter((u) => !matchIds.has(u.idUser));

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

  function profileimg(u: User){

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
    <div
      className="
      max-w-5xl mx-auto px-3
      grid grid-cols-1 md:grid-cols-3
      gap-4 md:gap-6
    "
    >
      {/* LEFT SIDE */}
      <div
        className="
        col-span-1
        space-y-6
        md:border-r md:pr-4
      "
      >
        {/* MATCHES */}
        {matches.length > 0 && (
          <div>
            <button
              onClick={() => setOpenMatches((p) => !p)}
              className="text-base font-semibold mb-2 w-full text-left"
            >
              Matches {openMatches ? "▾" : "▸"}
            </button>

            {openMatches && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {matches.map((u) => (
                  <div
                    key={u.idUser}
                    onClick={() => setSelectedUser(u)}
                    className="
                    flex items-center justify-between
                    p-3 rounded-xl border
                    active:scale-[0.98] transition
                  "
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={profileimg(u)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {u.gender}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="text-xs px-2 py-1 rounded bg-accent text-white">
                        Rate
                      </button>
                      <button
                        onClick={() => removeMatch(u)}
                        className="text-xs text-red-500"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* YOU LIKED */}
        {onlyLiked.length > 0 && (
          <div>
            <button
              onClick={() => setOpenLiked((p) => !p)}
              className="text-base font-semibold mb-2 w-full text-left"
            >
              You liked {openLiked ? "▾" : "▸"}
            </button>

            {openLiked && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {onlyLiked.map((u) => (
                  <div
                    key={u.idUser}
                    onClick={() => setSelectedUser(u)}
                    className="
                    flex items-center justify-between
                    p-3 rounded-xl border
                    active:scale-[0.98] transition
                  "
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://github.com/shadcn.png"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium">
                        {u.firstName} {u.lastName}
                      </p>
                    </div>

                    <button
                      onClick={() => removeLike(u.idUser)}
                      className="text-xs text-red-500"
                    >
                      Unlike
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LIKED YOU */}
        {onlyLikedYou.length > 0 && (
          <div>
            <button
              onClick={() => setOpenLikedYou((p) => !p)}
              className="text-base font-semibold mb-2 w-full text-left"
            >
              Liked you {openLikedYou ? "▾" : "▸"}
            </button>

            {openLikedYou && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {onlyLikedYou.map((u) => (
                  <div
                    key={u.idUser}
                    onClick={() => setSelectedUser(u)}
                    className="
                    flex items-center justify-between
                    p-3 rounded-xl border
                    active:scale-[0.98] transition
                  "
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://github.com/shadcn.png"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium">
                        {u.firstName} {u.lastName}
                      </p>
                    </div>

                    <button
                      onClick={() => handleLikeBack(u)}
                      className="text-xs px-2 py-1 rounded bg-accent text-white"
                    >
                      Like back
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-2 mt-4 md:mt-0">
        {selectedUser ? (
          <Card className="p-4 md:p-6 space-y-6">
            <div className="flex items-center gap-4 md:gap-5">
              <img
                src="https://github.com/shadcn.png"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>

                <div className="flex gap-2 mt-1 text-xs md:text-sm flex-wrap">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {selectedUser.gender}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {getAge((selectedUser as any).birthDay)} years
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground mt-10">
            Select a user
          </p>
        )}
      </div>
    </div>
  );
}