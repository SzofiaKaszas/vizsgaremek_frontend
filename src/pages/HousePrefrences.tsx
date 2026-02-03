import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function HousePrefrences() {
  const context = useContext(UserContext);

  return (
    <form onSubmit={(e) => handleSubmit(e, context)}>
      <h2>House Prefrences</h2>
      <div>
        <label>Max rent:</label>
        <input type="number" id="rent" name="rent" />
      </div>
      <div>
        <label>Minimum square meters:</label>
        <input type="number" id="sqmeter" name="sqmeter" />
      </div>
      <div>
        <label>Min rooms:</label>
        <input type="number" id="rooms" name="rooms" />
      </div>
      <div>
        <label>City:</label>
        <input type="text" id="city" name="city" />
      </div>
      <div>
        <label>Property type:</label>
        <select name="propertyType" onChange={() => {}}>
          {" "}
          {/*TODO: handle change*/}
          <option value="house">House</option>
          <option value="flat">Flat</option>
          <option value="skyscraper">Skyscraper</option>
        </select>
      </div>
      <div>
        <label>Heating type:</label>
        <select name="heatingType">
          <option value="radiator">Radiator</option>
          <option value="airconditioner">Air Conditioner</option>
          <option value="convector">Convector</option>
          <option value="floor">Floor</option>
        </select>
      </div>
      <div>
        <label>Furnishing:</label>
        <select name="furnishing">
          <option value="none">None</option>
          <option value="partial">Partial</option>
          <option value="full">Full</option>
        </select>
      </div>
      <div>
        <label>kitchen furnishing:</label>
        <select name="kitchenFurnishing">
          <option value="none">None</option>
          <option value="partial">Partial</option>
          <option value="full">Full</option>
        </select>
      </div>
      <div>
        <label>Minimum bathrooms:</label>
        <input type="number" id="bathrooms" name="bathrooms" />
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

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const rent = form.get("rent");
  const sqmeter = form.get("sqmeter");
  const rooms = form.get("rooms");
  const city = form.get("city");
  const propertyType = form.get("propertyType");
  const heatingType = form.get("heatingType");
  const furnishing = form.get("furnishing");
  const kitchenFurnishing = form.get("kitchenFurnishing");
  const bathrooms = form.get("bathrooms");

  if(rent && Number(rent) < 0){
    console.log("Rent must be positive");
    return;
  }

  switch (true) {
    case rent && Number(rent) < 0:
      console.log("Rent must be positive");
      return;
    case sqmeter && Number(sqmeter) < 0: 
    console.log("squaremeter cant be negative");
    return;
    case rooms && Number(rooms) < 0:
      console.log("room number cant be negative")
      return;
    case bathrooms && Number(bathrooms) < 0:
      console.log("bathroom number cant be negative")
      return;
    default:
      break;
  }

  try {
    await context.addHousePref({
      maxRent: rent ? Number(rent) : undefined,
      minSquareMeters: sqmeter ? Number(sqmeter) : undefined,
      minRooms: rooms ? Number(rooms) : undefined,
      city: city && city !== "" ? (city as string) : undefined,
      propertyType: propertyType && propertyType !== "" ? (propertyType as string) : undefined,
      heatingType: heatingType && heatingType !== "" ? (heatingType as string) : undefined,
      furnishingLevel: furnishing && furnishing !== "" ? (furnishing as string) : undefined,
      kitchenLevel: kitchenFurnishing && kitchenFurnishing !== "" ? (kitchenFurnishing as string) : undefined,
      minBathrooms: bathrooms ? Number(bathrooms) : undefined,
    });
    alert("Preferences saved successfully");
    window.location.href = "/main";
  } catch (err) {
    alert((err as Error).message);
    console.error("Error details:", err);
  }

  return;
}
