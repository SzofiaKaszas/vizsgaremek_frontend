import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";

export function RoommateProfile() {
  const context = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await context.changeUserData?.({
        userBio: form.get("userBio") as string,
        age: Number(form.get("age")),
        gender: form.get("gender") as string,
        language: form.get("language") as string,
        occupation: form.get("occupation") as string,
        connectionEmail: form.get("connectionEmail") as string,
      });
      alert("Preferences saved successfully");

      window.location.href = "/roommatepreferences";
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        handleSubmit(e);
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
        <input type="text" name="gender" />
      </div>

      <div>
        <label>Language you speak:</label>
        {/*maybe multiple choice*/}
        <select name="language">
          {Languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Your Occupation:</label>
        <input type="text" name="occupation" />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
