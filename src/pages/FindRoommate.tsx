import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";
import { PleaseLogin } from "./PleaseLogin";

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
    }, [context.userData, currentUserId]);

  return (
    isLoggedIn === true ? (
      <div>
        <h1>Find Roomate Page</h1>
        {/* Implement roomate listing display logic here */}
      </div>
    ) : (
      <PleaseLogin text="Please login to find a roommate"/>
    )
  );
}
