import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function FindRoomate() {
  const context = useContext(UserContext);

  return (
    <div>
      <h1>Find Roomate Page</h1>
    </div>
  );
}
