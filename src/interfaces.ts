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
  language?: string; // could be array of strings, also enum?
  occupation?: string;
  connectionEmail?: string;

  hasHouse: boolean;
  lookingForPeople: boolean;
  lookingForHouse: boolean

  role: string;
}

export interface UserToken{
  userIdToken: number;
  token: string;
}

export interface RoommatePref {
  roommatesPrefrencesIdUser: number;

  minAge?: number
  maxAge?: number
  gender?: string
  language?: string

}

export interface HousePref {
  houseSearchIdUser: number;

  maxRent?: number
  minSquareMeters?: number
  minRooms?: number
  city?: string
  propertyType?: string
  heatingType?: string
  furnishingLevel?: string
  kitchenLevel?: string
  minBathrooms?: number
}

export interface AuthContextType {
  currentUserId: number | undefined;
  login: (email: string, password: string) => Promise<UserToken[]>;
  logout: () => void;
  register: (user: Omit<User, "idUser">) => Promise<User[]>;
}

export interface UserContextType {
  userData: User | undefined;
  changeUserData: (newData: Partial<User>) => void;
  addRoommatePref: (newData: Partial<RoommatePref>) => void;
  addHousePref: (newData: Partial<HousePref>) => void;
}