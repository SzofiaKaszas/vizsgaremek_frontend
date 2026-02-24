/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import { PleaseLogin } from "./PleaseLogin";

export function YourHouseListing() {
  const { currentUserId } = useContext(AuthContext);
  const context = useContext(UserContext);

  const isLoggedIn = context.userData ? true : false;

  return isLoggedIn === true ? (
    <div>
      <h1>Your House Listing Page</h1>
      <p>Here you can manage your house listings.</p>
      {/* Implement your house listing management logic here */}
    </div>
  ) : (
    <PleaseLogin text="Please login to view your house listings" />
  );
}
