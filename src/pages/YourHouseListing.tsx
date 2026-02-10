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