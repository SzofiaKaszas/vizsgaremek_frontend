import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function HousePrefrences() {
  const context = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const rent = form.get("rent");
    const sqmeter = form.get("sqmeter");
    const rooms = form.get("rooms");
    const bathrooms = form.get("bathrooms");

    try {
      await context.addHousePref?.({
        maxRent: rent ? Number(rent) : undefined,
        minSquareMeters: sqmeter ? Number(sqmeter) : undefined,
        minRooms: rooms ? Number(rooms) : undefined,
        city: form.get("city") as string,
        propertyType: form.get("propertyType") as string,
        heatingType: form.get("heatingType") as string,
        furnishingLevel: form.get("furnishing") as string,
        kitchenLevel: form.get("kitchenFurnishing") as string,
        minBathrooms: bathrooms ? Number(bathrooms) : undefined,
      });
      alert("Preferences saved successfully");
      window.location.href = "/main";
    } catch (err) {
      alert((err as Error).message);
    }

    return;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
          <option value="apartment">Apartment</option>
          <option value="house">Flat</option>
          <option value="studio">Skyscraper</option>
        </select>
      </div>
      <div>
        <label>Heating type:</label>
        <select name="heatingType">
          <option value="central">Central</option>
          <option value="gas">Gas</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <div>
        <label>Furnishing:</label>
        <select name="furnishing">
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="partiallyFurnished">Partially Furnished</option>
        </select>
      </div>
      <div>
        <label>kitchen furnishing:</label>
        <select name="kitchenFurnishing">
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="partiallyFurnished">Partially Furnished</option>
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
