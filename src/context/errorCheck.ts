export function errorCheckUser(response: Response) {
  switch (response.status) {
    case 400:
      throw new Error("Bad request");
    case 401:
      throw new Error("Unauthorized");
    case 403:
      throw new Error("Invalid credentials");
    case 404:
      throw new Error("Wrong email or password");
    case 409:
      throw new Error("User with same unique data already exists");
    case 500:
      throw new Error("Server error");
    default:
      throw new Error(`Something went wrong (${response.status})`);
  }
}

export function errorCheckUserEdit(response: Response) {
  switch (response.status) {
    case 400:
      throw new Error("Bad request");
    case 401:
      throw new Error("Only Admin can edit other users data");
    case 403:
      throw new Error("Invalid credentials");
    case 404:
      throw new Error("No user found with given id");
    case 409:
      throw new Error("User with same unique data already exists");
    case 500:
      throw new Error("Server error");
    default:
      throw new Error(`Something went wrong (${response.status})`);
  }
}
