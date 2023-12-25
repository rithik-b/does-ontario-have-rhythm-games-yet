export interface ZivResponse {
  arcades: Arcade[]
  success: boolean
}

export interface Arcade {
  id: number
  name: string
  address: string
  addressLine1: string
  addressLine2: string
  city: string
  subregion: Subregion
  postalCode: string
  country: string
  contactNumber: string
  latitude: number
  longitude: number
  information: string
  formattedInformation: string
  lastUpdateTime: Date
  lastUpdateDifference: string
  openingTimes: Array<Array<boolean | OpeningTime>>
  website: string
  machines: Machine[]
  pictureCategory: PictureCategory
}

export interface Machine {
  game: Game
  id: number
  location: string
  comment: string
  condition: number
  freePlay: boolean
  displayPrice: string
  minPrice: number
  price: number
  minContinuePrice: number
  continuePrice: number
  songs: number
  pricing: string
}

export interface Game {
  id: string
  name: string
  genre: Genre
  seriesID: string
}

export type Genre =
  | "Music Game"
  | "Action"
  | "Beat 'em up"
  | "Fighter"
  | "Maze"
  | "Pinball"
  | "Rail Shooter"
  | "Shoot 'em up"
  | "Redemption"
  | "Racing"
  | "Sports"
  | "Other"
  | "Platformers"
  | "Puzzle"
  | "Multi-directional Shooters"
  | "Run and Gun"
  | "Simulators"
  | "Tables"
  | "Horizontal Shooter"
  | "Strategy"
  | "Interactive Video"

export type OpeningTime =
  | "00:00"
  | "12:00"
  | "22:00"
  | "13:00"
  | "21:00"
  | "15:00"
  | "10:00"
  | "08:00"
  | "06:00"
  | "16:00"
  | "23:00"
  | "17:00"
  | "11:00"
  | "03:00"
  | "04:30"
  | "20:00"
  | "02:00"
  | "01:00"
  | "14:00"
  | "05:00"
  | "14:30"
  | "24:00"
  | "09:30"
  | "17:30"
  | "19:00"
  | "12:30"
  | "19:30"
  | "21:30"
  | "10:30"
  | "11:30"
  | "05:30"
  | "01:30"
  | "22:45"
  | "18:00"
  | "10:15"
  | "02:30"
  | "10:45"
  | "09:00"
  | "20:30"
  | "16:30"
  | "22:30"
  | "04:00"
  | "25:00"
  | "07:00"
  | "22:15"
  | "26:00"
  | "18:15"
  | "14:15"
  | "22:20"
  | "12:35"
  | "12:05"

export interface PictureCategory {
  id: number
  name: Name
}

export type Name = "Arcade Locations"

export type Subregion =
  | "Alberta"
  | "Ontario"
  | "British Columbia"
  | "Québec"
  | "Nova Scotia"
  | "Saskatchewan"
  | "Nouveau-Brunswick"
  | "Quebec"
  | "Prince Edward Island"
  | "New Brunswick"
  | "Northwest Territories"
  | "Manitoba"
  | "ON"
  | "Newfoundland and Labrador"
  | "Nunavut"
