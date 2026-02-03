import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";

export function RoommateProfile() {
  const context = useContext(UserContext);

  return (
    <form
      onSubmit={async (e) => {
        handleSubmit(e, context);
      }}
    >
      <h2>Your Profile</h2>
      <div>
        <label>Description about you:</label>
        <input type="text" name="userBio" />
      </div>

      <div>
        <label>Your age:</label>
        <input type="number" name="age" />
      </div>

      <div>
        <label>Your Gender:</label>
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Language you speak:</label>
        {/*maybe multiple choice*/}
        <select name="language">
          {Languages.map((lang) => (
            <option key={lang.code} value={lang.label}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Your Occupation:</label>
        <input type="text" name="occupation" />
      </div>

      <div> 
        <label id="error"></label>
      </div>

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        Do later
      </button>
    </form>
  );
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>, context: React.ContextType<typeof UserContext>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const userBio = form.get("userBio") as string || undefined; //check if normal later
    const age = form.get("age");

    if (age && isNaN(Number(age)) || age && Number(age) <= 0) {
      console.log("Invalid age input");
      return;
    }

    const gender = form.get("gender") as string || undefined; //check if normal later
    const language = form.get("language") as string || undefined;
    const occupation = form.get("occupation") as string || undefined; //check if normal later

    const connectionEmail = form.get("connectionEmail") as string || undefined;
    
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (connectionEmail && !regex.test(connectionEmail as string)) {
      console.log("Invalid email format");
      return;
    }

    try {
      await context.changeUserData({ //delete ? later
        userBio: userBio as string,
        age: Number(age),
        gender: gender as string,
        language: language as string,
        occupation: occupation as string,
        connectionEmail: connectionEmail as string,
      });
      alert("Preferences saved successfully");

      window.location.href = "/roommatepreferences";
    } catch (err) {
      alert((err as Error).message);
    }
  }