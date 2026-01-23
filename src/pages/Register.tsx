import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";

export function Register() {
  const context = useContext(AuthContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    //need check for values
    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const hasHouse = formData.get("hasHouse") === "on";
    const lookingForPeople = formData.get("lookingForRoommate") === "on";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lookingForHouse = formData.get("lookingForHouse") === "on";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user: Omit<User, "idUser"> = {
      firstName,
      lastName,
      phoneNumber,
      hasHouse,
      lookingForPeople,
      lookingForHouse,
      email,
      password,
    };
    context.register(user);
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h2>Register</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" required />
      </div>
      <div>
        <label>Phone number:</label>
        <input type="text" name="phoneNumber" required />
      </div>
      <div>
        <label>Do you want to rent out a house to others?</label>
        <input type="checkbox" name="hasHouse" />
      </div>
      <div>
        <label>Are you looking for a roommate?</label>
        <input type="checkbox" name="lookingForRoommate" />
      </div>
      <div>
        <label>Are you looking for a house?</label>
        <input type="checkbox" name="lookingForHouse" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
