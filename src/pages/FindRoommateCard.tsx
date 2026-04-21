import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import type { FindRoommateProps, User, UserNecesarry } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { UserContext } from "@/context/userContext";

export function FindRoommateCard(props: FindRoommateProps) {
  const [list, setList] = useState<UserNecesarry[]>([]);
  const [fullUsers, setFullUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);

  const context = useContext(UserContext);

  // base list
  useEffect(() => {
    setList(props.roommatePref);
  }, [props.roommatePref]);

  // hydrate full user data (occupation etc.)
  useEffect(() => {
    if (!list.length) return;

    let isCancelled = false;

    async function fetchUsers() {
      setLoading(true);

      const results: Record<number, User> = {};

      await Promise.all(
        list.map(async (u) => {
          const full = await context.getUserById(u.idUser);
          results[u.idUser] = full;
        })
      );

      if (!isCancelled) {
        setFullUsers(results);
        setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      isCancelled = true;
    };
  }, [list, context]);

  async function like(id: number) {
    await context.addLiked(id);
    next();
  }

  function dislike() {
    next();
  }

  function next() {
    setList((prev) => prev.slice(1));
  }

  if (!props.isLoggedIn) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Please login to continue
      </div>
    );
  }

  if (loading || list.length === 0) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Loading roommates...
      </div>
    );
  }

  const active = list[0];
  const activeFull = fullUsers[active.idUser];

  const preview = list.slice(1, 4);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-8">

      {/* LEFT STACK */}
      <div className="space-y-3">
        {preview.map((p, i) => (
          <Card key={p.idUser} className="p-3 opacity-60">
            <div className="font-medium">
              {p.firstName} {p.lastName}
            </div>
          </Card>
        ))}
      </div>

      {/* CENTER */}
      <div>
        <Card className="p-5 h-[520px] flex flex-col justify-between">

          <div>
            <img
              src="https://github.com/shadcn.png"
              className="w-full h-56 object-cover rounded-md mb-4"
            />

            <Field>
              <div className="text-lg font-semibold">
                {active.firstName} {active.lastName}
              </div>
              <FieldDescription>
                {active.gender ?? "Not specified"}
              </FieldDescription>
            </Field>

            <Field className="mt-3 text-sm text-muted-foreground">
              {active.userBio ?? "No bio available"}
            </Field>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between mt-6">
            <button
              onClick={dislike}
              className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
            >
              <ThumbsDown />
            </button>

            <button
              onClick={() => like(active.idUser)}
              className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
            >
              <Heart />
            </button>
          </div>
        </Card>
      </div>

      {/* RIGHT DETAILS (FULL USER HERE) */}
      <div>
        <Card className="p-5 h-[520px]">

          <h2 className="text-lg font-semibold mb-4">
            Profile details
          </h2>

          {activeFull ? (
            <div className="space-y-2 text-sm">

              <p><b>Age:</b> {getAge(activeFull.birthDay)}</p>
              <p><b>Gender:</b> {activeFull.gender ?? "Not specified"}</p>
              <p><b>Bio:</b> {activeFull.userBio ?? "Not specified"}</p>
              <p><b>Language:</b> {activeFull.language ?? "Not specified"}</p>
              <p><b>Occupation:</b> {activeFull.occupation ?? "Not specified"}</p>
              <p><b>Email:</b> {activeFull.email ?? "Not specified"}</p>

            </div>
          ) : (
            <p className="text-muted-foreground">Loading details...</p>
          )}

        </Card>
      </div>

    </div>
  );
}

function getAge(birthDay: Date | undefined) {
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