import type {
  FurnishingType,
  HeatingType,
  KitchenFurnishingType,
  PropertyType,
} from "./assets/housePref";
// --------------- User interfaces -----------------

//interface when getting full data of users
export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  password: string;
  email: string;

  userBio?: string;
  birthDay?: Date;
  gender?: string; // could be enum
  language?: string; // could be array of strings, also enum?
  occupation?: string;
  connectionEmail?: string;

  rating: number;
  hasHouse: boolean;
  lookingForPeople: boolean;
  lookingForHouse: boolean;

  role: string;
}

//interface when getting the roommate matches
export interface UserNecesarry {
  idUser: number;
  firstName: string;
  lastName: string;

  email: string;

  gender?: string; // could be enum
  language?: string; // could be array of strings, also enum?
  userBio?: string;
  birthDay?: Date;
}

//interface for tokens
export interface UserToken {
  userIdToken: number;
  token: string;
}

//inetface for roommate prefrences
export interface RoommatePref {
  //roommatesPrefrencesIdUser: number;

  minAge?: number;
  maxAge?: number;
  gender?: string;
  language?: string;
}

// ------------ House interfaces -----------------

//interface when getting houseListings or creating one
export interface HouseListing {
  idHouse: number;
  houseIdUser: number;

  description: string;
  location: string;
  city: string;
  rent: number;
  propertyType: PropertyType;
  whichFloor: number;
  numberOfRooms: number;
  squareMeter: number;
  heatingType: HeatingType;
  furnishingLevel: FurnishingType;
  kitchenLevel: KitchenFurnishingType;
  bathrooms: number;
  airConditioner: boolean;
}

//interface for getting house prefrences or creating one
export interface HousePref {
  houseSearchIdUser: number;

  maxRent?: number;
  minSquareMeters?: number;
  minRooms?: number;
  city?: string;
  propertyType?: PropertyType;
  heatingType?: HeatingType;
  furnishingLevel?: FurnishingType;
  kitchenLevel?: KitchenFurnishingType;
  minBathrooms?: number;
}

//---------------rate------------------------------
//interface for user rating table
export interface RateUser {
  raterId: number;
  ratedUserId: number;

  ratingScore: number; // 1 to 5 starts
  ratingMessage: string;
}

export interface RateHouse {
  raterId: number;
  ratedHouseId: number;

  ratingScore: number; // 1 to 5 starts
  ratingMessage: string;
}

//---------------------props-----------------------
//interface for props of the PleaseLogin component
export interface PleaseLoginProps {
  text: string;
}

//interface for props so the components can go to the next step in SetUpProfile
export interface GoNextProp {
  goNext: () => void;
}

//interface for props of the FindRoommateSlide and FindRoommateCard component
export interface FindRoommateProps {
  isLoggedIn: boolean;
  roommatePref: UserNecesarry[];
}

//interface for props of the FindHouseCard component
export interface FindHouseProps {
  isLoggedIn: boolean;
  housePref: HouseListing[];
}

//interface for props of the LikedHouseCard component
export interface LikedHouseProps {
  isLoggedIn: boolean;
  likedHouses: HouseListing[];
}

//interface for props of the LikedUserCard component
export interface LikedUserProps {
  isLoggedIn: boolean;
  likedUsers: User[];
}

//interface for props of the HouseListingCard component
export interface HouseListingProps {
  houseListing: HouseListing;
}

//interface for the DialogContent when you click a user (so u can see more of their data)
export interface DialogContentProps {
  id: number;
  prefList: UserNecesarry[];
  onDislike: (id: number) => void;
  onLike: (id: number) => void;
  triggerAnimation: (
    id: number,
    dir: "left" | "right",
    action: "like" | "dislike",
  ) => void;
}

//---------------context interfaces-------------------

//interface for the authentication context
export interface AuthContextType {
  currentUserId: number | undefined;
  login: (email: string, password: string) => Promise<UserToken[]>;
  logout: () => void;
  register: (user: Omit<User, "idUser">) => Promise<User[]>;
}

//interface for the managemant of the user data in usercontext
export interface UserContextType {
  userData: User | undefined;
  
  hasCompletedStepOne: boolean,
  hasCompletedStepTwo: boolean,
  hasCompletedStepThree: boolean,

  setHasCompletedStepOne: (value: boolean) => void;
  setHasCompletedStepTwo: (value: boolean) => void;
  setHasCompletedStepThree: (value: boolean) => void;

  getUserById: (id: number) => Promise<User>;
  changeUserData: (newData: Partial<User>) => void;
  //roommatepref
  addRoommatePref: (newData: Partial<RoommatePref>) => void;
  getHasRoommatePref: () => Promise<boolean>;
  getRoommatePref: () => Promise<RoommatePref | undefined>;
  editRoommatePref: (newData: Partial<RoommatePref>) => void;
  getMatches: () => Promise<UserNecesarry[]>;
  changeRoommatePref: (newData: Partial<RoommatePref>) => void;
  addLiked: (id: number) => void;
  getLikes: () => Promise<User[]>;
  rateUser: (id: number, data: Partial<RateUser>) => void;
}

//interface for the managemant of the house data in housecontext
export interface HouseContextType {
  //houselisting
  getHouseListings: () => Promise<HouseListing[]>;
  addHouseListing: (newData: Omit<HouseListing, "idHouse">) => Promise<void>;
  editHouseListing: (
    idHouse: number,
    newData: Partial<HouseListing>,
  ) => Promise<void>;
  deleteHouseListing: (idHouse: number) => Promise<void>;
  //housepref
  getHasHousePref: () => Promise<boolean>;
  getHousePref: () => Promise<HousePref | undefined>;
  changeHousePref: (newData: Partial<HousePref>) => void;
  addHousePref: (newData: Omit<HousePref, "idHouse">) => void;
  getMatches: () => Promise<HouseListing[]>;
  addLiked: (id: number) => void;
  getLikes: () => Promise<HouseListing[]>;
  rateHouse: (id: number, data: Partial<RateHouse>) => void;
}
