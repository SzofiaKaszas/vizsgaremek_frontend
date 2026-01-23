import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function Profile() {
    const {userData} = useContext(UserContext);

  return (
    <div>
      <h1>User Profile</h1>
        {userData ? (
            <div>
                <p><strong>First Name:</strong> {userData.firstName}</p>
                <p><strong>Last Name:</strong> {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                <p><strong>Has House to Rent:</strong> {userData.hasHouse ? "Yes" : "No"}</p>
                <p><strong>Looking for Roommate:</strong> {userData.lookingForPeople ? "Yes" : "No"}</p>
                <p><strong>Looking for House:</strong> {userData.lookingForHouse ? "Yes" : "No"}</p>
                
                <button onClick={() => {
                    // Future implementation for editing profile
                }}>Edit Profile</button>
            </div>


        ) : (
            <p>No user is currently logged in.</p>
        )}
    </div>
  );
}