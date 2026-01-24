import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function EditProfile() {
  const context = useContext(UserContext);

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const confirmed = window.confirm(
            "Are you sure you want to change your data?",
          );

          if (!confirmed) {
            return;
          }

          const form = new FormData(e.currentTarget);
          //check wether they actually changed something
          //check if any of the required fields are empty
          try {
            await context.changeUserData?.({
              firstName: form.get("firstName") as string,
              lastName: form.get("lastName") as string,
              phoneNumber: form.get("phoneNumber") as string,
            });
            alert("Profile updated successfully"); //change later to better notification
            window.location.href = "/profile"; 
          } catch (err) {
            alert((err as Error).message); //change later to better error notification
          }
        }}
       >
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={context.userData?.firstName}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={context.userData?.lastName}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={context.userData?.phoneNumber}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
