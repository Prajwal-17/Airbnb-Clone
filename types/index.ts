import { DateType } from "@/store/reservation";

export type FormInputType = {
  name: string;
  email: string;
  password: string;
};

export type HomeData = {
  category: string,
  country: string,
  location: [number, number],
  guestCount: number,
  roomCount: number,
  bathroomCount: number,
  imageUrl: string,
  title: string,
  description: string
  price: number
}

export type ReservePropType = { [key: string]: DateType; }