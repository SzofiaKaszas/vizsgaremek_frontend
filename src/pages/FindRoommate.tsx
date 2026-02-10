import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";

export function FindRoommate() {
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

  return (
    isLoggedIn === true ? (
      <div>
        <h1>Find Roomate Page</h1>
        {/* Implement roomate listing display logic here */}
      </div>
    ) : (
      <div>
      <a
        href="/login"
        className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors p-2"
      >
        Please log in to view house listings.
      </a>
    </div>
    )
  );
}
