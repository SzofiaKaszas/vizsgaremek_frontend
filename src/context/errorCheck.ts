//handle errors from backend -> this is what you show to the user
//this is for any user related backend request
export function errorCheckUser(response: Response) {
  switch (true) {
    case response.status === 400:
      throw new Error("Bad request");
    case response.status === 401:
      throw new Error("Only the admin can do this");
    case response.status === 403:
      throw new Error("Invalid credentials");
    case response.status === 404:
      throw new Error("Wrong email or password");
    case response.status === 409:
      throw new Error("Email already in use");
    case response.status >= 500 && response.status < 600:
      throw new Error("Server error");
    default:
      throw new Error(`Something went wrong`);
  }
}


//this is for any user edit related backend request
export function errorCheckUserEdit(response: Response) {
  switch (true) {
    case response.status === 400:
      throw new Error("Bad request");
    case response.status === 401:
      throw new Error("Only Admin can edit other users data");
    case response.status === 403:
      throw new Error("Invalid credentials");
    case response.status === 404:
      throw new Error("No user found with given id");
    case response.status === 409:
      throw new Error("User with same unique data already exists");
    case response.status >= 500 && response.status < 600:
      throw new Error("Server error");
    default:
      throw new Error(`Something went wrong (${response.status})`);
  }
}

//this is for any house related backend request
export function errorCheckHouse(response: Response) {
  switch (true) {
    case response.status === 400:
      throw new Error("Bad request");
    case response.status === 401:
      throw new Error("Only the admin can do this");
    case response.status === 403:
      throw new Error("Invalid credentials");
    case response.status === 404:
      throw new Error("Cant find house listings");
    case response.status === 409:
      throw new Error("House with same data already exists");
    case response.status >= 500 && response.status < 600:
      throw new Error("Server error");
    default:
      throw new Error(`Something went wrong`);
  }
}