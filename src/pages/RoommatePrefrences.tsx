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

  return (
    <form
      onSubmit={async (e) => {
        handleSubmit(e, context, ages);
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
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              style={{
                ...restProps.style,
                height: "20px",
                width: "20px",
                backgroundColor: "#999",
              }}
            />
          );
        }}
      />

      <div>
        <label>Prefferred gender:</label>
        <select name="gender">
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Prefferred language:</label>
        <select name="language">
          {Languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
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

async function handleSubmit(e: React.FormEvent<HTMLFormElement>, context: React.ContextType<typeof UserContext>, ages: [number, number]) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const minAge = ages[0];
    const maxAge = ages[1];

    switch(true) {
      case (minAge === undefined || maxAge === undefined):
        return;
      case (isNaN(minAge) || isNaN(maxAge)):
        alert("Ages must be numbers");
        return;
      case (minAge < 18):
        alert("Minimum age must be at least 18");
        return;
      case (maxAge > 100):
        alert("Maximum age must be at most 100");
        return;
      case (minAge > maxAge):
        alert("Minimum age cannot be greater than maximum age");
        return;
    }

    const gender = form.get("gender") as string;
    const language = form.get("language") as string;

    try {
      await context.addRoommatePref({
        roommatesPrefrencesIdUser: context.userData?.idUser,
        minAge: minAge ? Number(minAge) : undefined,
        maxAge: maxAge ? Number(maxAge) : undefined,
        gender: gender,
        language: language,
      });
      alert("Preferences saved successfully");
      if (context.userData?.lookingForHouse) {
        window.location.href = "/housepreferences";
      } else {
        window.location.href = "/main";
      }
    } catch (err) {
      alert((err as Error).message);
    }
  }