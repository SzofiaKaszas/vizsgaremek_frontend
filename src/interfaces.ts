export interface User {
  idUser: number
  firstName: string
  lastName: string
  connectionEmail: string
  phoneNumber: string
 
  userBio?: string
  age?: number
  gender?: string // could be enum
  language?: string
  occupation?: string
 
  hasHouse: boolean
  lookingForPeople: boolean
  //lookingForHouse: boolean
}