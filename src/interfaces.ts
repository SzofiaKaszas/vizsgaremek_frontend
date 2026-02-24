import type { Furnishing, HeatingType, KitchenFurnishing, PropertyType } from "./assets/housePref";
// User interfaces
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
  lookingForHouse: boolean;

  role: string;
}

export interface UserToken {
  userIdToken: number;
  token: string;
}

export interface RoommatePref {
  //roommatesPrefrencesIdUser: number;

  minAge?: number;
  maxAge?: number;
  gender?: string;
  language?: string;
}

// House interfaces
export interface HouseListing {
  idHouse: number;
  houseSearchIdUser: number;

  description: string;
  location: string;
  city: string;
  rent: number;
  propertyType: PropertyType;
  whichFloor: number;
  numberOfRooms: number;
  squareMeter: number;
  heatingType: HeatingType;
  furnishingLevel: Furnishing;
  kitchenLevel: KitchenFurnishing;
  bathrooms: number;
  airConditioner: boolean;
}

export interface HousePref {
  houseSearchIdUser: number;

  maxRent?: number;
  minSquareMeters?: number;
  minRooms?: number;
  city?: string;
  propertyType?: string;
  heatingType?: string;
  furnishingLevel?: string;
  kitchenLevel?: string;
  minBathrooms?: number;
}

export interface PleaseLoginProps {
  text: string;
}

export interface GoNextProp {
  goNext: () => void;
}

export interface FindRoommateProps {
  isLoggedIn: boolean;
  roommatePref: User[];
}

export interface FindHouseProps {
  isLoggedIn: boolean;
  housePref: HouseListing[];
}

//context interfaces
export interface AuthContextType {
  currentUserId: number | undefined;
  login: (email: string, password: string) => Promise<UserToken[]>;
  logout: () => void;
  register: (user: Omit<User, "idUser">) => Promise<User[]>;
}

export interface UserContextType {
  userData: User | undefined;
  //userdata
  changeUserData: (newData: Partial<User>) => void;
  //roommatepref
  addRoommatePref: (newData: Partial<RoommatePref>) => void;
  getHasRoommatePref: () => Promise<boolean>;
  editRoommatePref: (newData: Partial<RoommatePref>) => void;
  getMatches: () => Promise<User[]>;
  changeRoommatePref: (newData: Partial<RoommatePref>) => void;
}

export interface HouseContextType {
  //houselisting
  getHouseListings: () => Promise<HouseListing[]>;
  addHouseListing: (newData: Omit<HouseListing, "idHouse">) => Promise<void>;
  editHouseListing: (idHouse: number, newData: Partial<HouseListing>) => Promise<void>;
  deleteHouseListing: (idHouse: number) => Promise<void>;
  //housepref
  getHasHousePref: () => Promise<boolean>;
  changeHousePref: (newData: Partial<HousePref>) => void;
  addHousePref: (newData: Omit<HousePref, "houseSearchIdUser">) => void;
}