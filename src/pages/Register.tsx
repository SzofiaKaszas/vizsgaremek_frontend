import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";

export function Register() {
  const context = useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //need check for values
    const form = new FormData(e.currentTarget);
    const firstName = form.get("firstName") as string;
    const lastName = form.get("lastName") as string;
    const phoneNumber = form.get("phoneNumber") as string;
    const hasHouse = form.get("hasHouse") === "on";
    const lookingForPeople = form.get("lookingForRoommate") === "on";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lookingForHouse = form.get("lookingForHouse") === "on";
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const user: Omit<User, "idUser"> = {
      firstName,
      lastName,
      phoneNumber,
      hasHouse,
      lookingForPeople,
      lookingForHouse,
      email,
      password, 
      role: "user",
    };
    try {
      await context.register(user);
      alert("Registration successful!");
      context.login(email, password);
      if(lookingForPeople){
        window.location.href = "/roommateprofile";
      }
      else if(lookingForHouse){
        window.location.href = "/housepreferences";
      }
      else{
        window.location.href = "/main";
      }
    } catch (error) {
      alert((error as Error).message);
    }
    
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
        <input type="checkbox" name="hasHouse" required/>
      </div>
      <div>
        <label>Are you looking for a roommate?</label>
        <input type="checkbox" name="lookingForRoommate" required/>
      </div>
      <div>
        <label>Are you looking for a house?</label>
        <input type="checkbox" name="lookingForHouse" required/>
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
