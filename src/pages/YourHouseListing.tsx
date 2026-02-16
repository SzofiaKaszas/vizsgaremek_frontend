import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";

export function YourHouseListing() {
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
      <div className="bg-warning text-warning-foreground">
        <h1>Your House Listing Page</h1>
        <p>Here you can manage your house listings.</p>
        {/* Implement your house listing management logic here */}
      </div>
    ) : (
      <PleaseLogin text="Please login to view your house listings"/>
    )
  );
}