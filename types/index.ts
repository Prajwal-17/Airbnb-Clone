import { DateType } from "@/store/reservation";

export type FormInputType = {
  name: string;
  email: string;
  password: string;
};

export type HomeData = {
  id: string,
  category: string,
  country: string,
  location: [number, number],
  guestCount: number,
  roomCount: number,
  bathroomCount: number,
  imageUrl: string,
  title: string,
  description: string
  price: number,
  userId: string,
}

export type ReservePropType = { [key: string]: DateType; }

export type ReservationType = {
  id: string,
  startDate: string,
  endDate: string,
  listingId: string,
  total: number,
  userId: string,
  Listing: HomeData,
}
