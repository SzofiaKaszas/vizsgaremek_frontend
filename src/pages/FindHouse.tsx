import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";

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
  }, [currentUserId]);

  return isLoggedIn === true ? (
    <div>
      <h1>Find House Page</h1>
      <p>Here you can find house listings based on your preferences.</p>
      {/* Implement house listing display logic here */}
    </div>
  ) : (
    <a href="/login">Please log in to view house listings.</a>
  );
}
