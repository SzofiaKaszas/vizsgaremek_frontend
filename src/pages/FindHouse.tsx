import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";

export function FindHouse() {
  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);

  const isLoggedIn = context.userData !== undefined;

  return isLoggedIn === true ? (
    <div>
      <h1>Find House Page</h1>
      <p>Here you can find house listings based on your preferences.</p>
      {/* Implement house listing display logic here */}
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
  );
}
