import { useContext } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { Range } from "react-range";
import { useState } from "react";

export function RoommatePrefrences() {
  const context = useContext(UserContext);
  const [ages, setAges] = useState<[number, number]>([25, 40]);

  const MIN_AGE = 18;
  const MAX_AGE = 100;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await context.addRoommatePref?.({
        minAge: ages[0],
        maxAge: ages[1],
        preferredGender: form.get("preferredGender") as string,
        preferredLanguage: form.get("preferredLanguage") as string,
      });
      alert("Preferences saved successfully");
      window.location.href = "/main";
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
      <h2>Your Prefrences</h2>
      <label>
        Age range:{" "}
        <strong>
          {ages[0]} – {ages[1]}
        </strong>
      </label>
      <Range
        label="Your age range"
        step={1}
        min={MIN_AGE}
        max={MAX_AGE}
        values={ages}
        onChange={(values) => setAges([values[0], values[1]])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "20%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#999",
            }}
          />
        )}
      />

      <div>
        <label>Prefferred gender:</label>
        <select name="preferredGender">
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Prefferred language:</label>
        <select name="preferredLanguage">
          {Languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
