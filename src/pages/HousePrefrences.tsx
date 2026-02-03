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
      houseSearchIdUser: context.userData?.idUser,
      maxRent: rent ? Number(rent) : undefined,
      minSquareMeters: sqmeter ? Number(sqmeter) : undefined,
      minRooms: rooms ? Number(rooms) : undefined,
      city: city as string,
      propertyType: propertyType as string,
      heatingType: heatingType as string,
      furnishingLevel: furnishing as string,
      kitchenLevel: kitchenFurnishing as string,
      minBathrooms: bathrooms ? Number(bathrooms) : undefined,
    });
    alert("Preferences saved successfully");
    window.location.href = "/main";
  } catch (err) {
    alert((err as Error).message);
  }

  return;
}
