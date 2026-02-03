import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function EditProfile() {
  const context = useContext(UserContext);

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <form
        onSubmit={async (e) => {
          handleSubmit(e, context);
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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={context.userData?.email}
            required
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
            defaultChecked={context.userData?.hasHouse}
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
            defaultChecked={context.userData?.lookingForPeople}
          />
        </div>
        <div>
          <label htmlFor="lookingForHouse">Are you looking for a house:</label>
          <input
            type="checkbox"
            id="lookingForHouse"
            name="lookingForHouse"
            defaultChecked={context.userData?.lookingForHouse}
          />
        </div>
        <a href="#">Change password</a>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
) {
  e.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to change your data?",
  );

  if (!confirmed) {
    return;
  }

  const form = new FormData(e.currentTarget);
  //TODO: check wether they actually changed something
  //TODO: check if any of the required fields are empty

  const firstName = (form.get("firstName") as string) || undefined;
  const lastName = (form.get("lastName") as string) || undefined;
  const phoneNumber = (form.get("phoneNumber") as string) || undefined;
  const hasHouse = form.has("hasHouse");
  const lookingForPeople = form.has("lookingForPeople");
  const lookingForHouse = form.has("lookingForHouse");
  const email = (form.get("email") as string) || undefined;

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone =
    /^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/; // Simplified phone number regex

  switch (true) {
    case !firstName || !lastName || !phoneNumber || !email:
      console.log("Please fill in all fields.");
      return;
    case !regexEmail.test(email as string):
      console.log("Please enter a valid email address.");
      return;
    case !regexPhone.test(phoneNumber as string):
      console.log("Please enter a valid phone number.");
      return;
  }

  try {
    await context.changeUserData?.({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      hasHouse: hasHouse,
      lookingForPeople: lookingForPeople,
      lookingForHouse: lookingForHouse,
    });
    alert("Profile updated successfully"); //change later to better notification
    window.location.href = "/profile";
  } catch (err) {
    alert((err as Error).message); //change later to better error notification
  }
}
