export interface Room {
  name: string;
  price: number;
  img: string;
  capacity: number;
}

export interface RoomNumbers {
  [key: string]: string[];
}

export interface FunctionHall {
  name: string;
  capacity: string;
  price: number;
  img: string;
}

export interface ReservationDetails {
  clientName: string;
  contactNumber: string;
  address: string;
  checkInDate: string;
  checkOutDate: string;
  selectedRooms: string[];
  selectedHall: string | null;
  total: number;
}

export interface MenuItem {
  name: string;
  price: number;
  img: string;
  enabled?: boolean;
}

export interface Room {
  name: string;
  price: number;
  img: string;
  capacity: number;
}

export interface FunctionHall {
  name: string;
  capacity: string;
  price: number;
  img: string;
}


export interface User {
  username: string;
  password: string;
}