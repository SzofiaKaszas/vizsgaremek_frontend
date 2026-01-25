import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function EditProfile() {
  const context = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        email: form.get("email") as string,
        password: form.get("password") as string,
        hasHouse: form.get("hasHouse") === "on",
        lookingForPeople: form.get("lookingForPeople") === "on",
        lookingForHouse: form.get("lookingForHouse") === "on",
      });
      alert("Profile updated successfully"); //change later to better notification
      window.location.href = "/profile";
    } catch (err) {
      alert((err as Error).message); //change later to better error notification
    }
  }

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <form onSubmit={async (e) => {handleSubmit(e);}}>
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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={context.userData?.email}
            disabled
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={context.userData?.password}
            disabled
          />
        </div>
        <div>
          <label htmlFor="hasHouse">
            Do you wanna rent house out for others:
          </label>
          <input
            type="checkbox"
            id="hasHouse"
            name="hasHouse"
            defaultValue={context.userData?.hasHouse ? "true" : "false"}
            disabled
          />
        </div>
        <div>
          <label htmlFor="lookingForPeople">
            Are you looking for a roommate:
          </label>
          <input
            type="checkbox"
            id="lookingForPeople"
            name="lookingForPeople"
            defaultValue={context.userData?.lookingForPeople ? "true" : "false"}
            disabled
          />
        </div>
        <div>
          <label htmlFor="lookingForHouse">Are you looking for a house:</label>
          <input
            type="checkbox"
            id="lookingForHouse"
            name="lookingForHouse"
            defaultValue={context.userData?.lookingForHouse ? "true" : "false"}
            disabled
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
