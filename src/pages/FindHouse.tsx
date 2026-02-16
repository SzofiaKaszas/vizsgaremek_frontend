import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";
import { PleaseLogin } from "./PleaseLogin";

export function FindHouse() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);

  useEffect(() => {
    if (context.userData == undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [context.userData, currentUserId]);

  return isLoggedIn === true ? (
    <div className="bg-warning text-warning-foreground">
      <h1>Find House Page</h1>
      <p>Here you can find house listings based on your preferences.</p>
      {/* Implement house listing display logic here */}
    </div>
  ) : (
    <PleaseLogin text="Please login to find a house" />
  );
}
