import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";

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
      }, [currentUserId]);
      
  return (
    isLoggedIn === true ? (
      <div>
        <h1>Your House Listing Page</h1>
        <p>Here you can manage your house listings.</p>
        {/* Implement your house listing management logic here */}
      </div>
    ) : (
      <a href="/login">Please log in to manage your house listings.</a>
    )
  );
}