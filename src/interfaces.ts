export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  password: string;
  email: string;

  userBio?: string;
  age?: number;
  gender?: string; // could be enum
  language?: string;
  occupation?: string;
  connectionEmail?: string;

  hasHouse: boolean;
  lookingForPeople: boolean;
  lookingForHouse: boolean
}

export interface UserToken{
  //need backend
}

export interface AuthContextType {
  currentUser: User | undefined;
  login: (email: string, password: string) => Promise<UserToken[]>;
  logout: () => void;
  register: (user: Omit<User, "idUser">) => Promise<User[]>;
}
