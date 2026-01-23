import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function Profile() {
    const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <h1>User Profile</h1>
        {currentUser ? (
            <div>
                <p><strong>First Name:</strong> {currentUser.firstName}</p>
                <p><strong>Last Name:</strong> {currentUser.lastName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Phone Number:</strong> {currentUser.phoneNumber}</p>
                <p><strong>Has House to Rent:</strong> {currentUser.hasHouse ? "Yes" : "No"}</p>
                <p><strong>Looking for Roommate:</strong> {currentUser.lookingForPeople ? "Yes" : "No"}</p>
                <p><strong>Looking for House:</strong> {currentUser.lookingForHouse ? "Yes" : "No"}</p>
            </div>
        ) : (
            <p>No user is currently logged in.</p>
        )}
    </div>
  );
}