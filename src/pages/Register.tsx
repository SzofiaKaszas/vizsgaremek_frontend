import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces";

export function Register() {
  const context = useContext(AuthContext);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, context);
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
        <input type="checkbox" name="lookingForRoommate"/>
      </div>
      <div>
        <label>Are you looking for a house?</label>
        <input type="checkbox" name="lookingForHouse"/>
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

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof AuthContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const firstName = form.get("firstName") as string || undefined;
  const lastName = form.get("lastName") as string || undefined;
  const phoneNumber = form.get("phoneNumber") as string || undefined;
  const hasHouse = form.get("hasHouse") === "on";
  const lookingForPeople = form.get("lookingForRoommate") === "on";
  const lookingForHouse = form.get("lookingForHouse") === "on";
  const email = form.get("email") as string || undefined;
  const password = form.get("password") as string || undefined;

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone = /^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/; // Simplified phone number regex
  const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters, one uppercase letter, one number

  switch (true) {
    case !firstName || !lastName || !phoneNumber || !email || !password:
      console.log("Please fill in all fields.");
      return;
    case !regexPassword.test(password as string):
      console.log("Password must be at least 6 characters long and contain an uppercase letter and a number.");
      return;
    case !regexEmail.test(email as string):
      console.log("Please enter a valid email address.");
      return;
    case !regexPhone.test(phoneNumber as string):
      console.log("Please enter a valid phone number.");
      return;
  }

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
    await context.login(email, password);
    if (lookingForPeople) {
      window.location.href = "/roommateprofile";
    } else if (lookingForHouse) {
      window.location.href = "/housepreferences";
    } else {
      window.location.href = "/main";
    }
  } catch (error) {
    alert((error as Error).message);
  }
}
