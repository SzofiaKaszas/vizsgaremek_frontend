import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/authContext";
import { findHouseAlg } from "../algorithm/findHouseAlg";

export function FindHouse() {
  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);

  const isLoggedIn = context.userData !== undefined;

  useEffect(() => {
    findHouseAlg();
  }, [context.userData]);

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
