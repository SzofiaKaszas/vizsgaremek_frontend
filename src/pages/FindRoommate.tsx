import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";
import { PleaseLogin } from "./PleaseLogin";
import type { User } from "@/interfaces";
import { Card } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";

export function FindRoommate() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [roommatePref, setRoommatePref] = useState<User[]>([]);

  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);

  useEffect(() => {
    if (context.userData == undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      context.getRoommatePref().then((prefs) => setRoommatePref(prefs));
    }
  }, [context.userData, currentUserId]);

  return isLoggedIn === true ? (
    <div>
    <div></div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4">
      {roommatePref.map((pref) => (
        <Card key={pref.idUser} className="col-auto card w-full max-w-sm p-4">
          <Field>
            {pref.firstName} {pref.lastName} - {pref.age}
            <FieldDescription>{pref.gender}</FieldDescription>
          </Field>
          <Field>Language: {pref.language}</Field>
        </Card>
      ))}
      </div>
      </div>
  ) : (
    <PleaseLogin text="Please login to find a roommate" />
  );
}
