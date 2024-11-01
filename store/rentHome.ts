import { create } from 'zustand'

type Coordinates = [number, number];

type RentHomeStore = {
  category: string,
  setCategory: (label: string) => void,
  country: string,
  setCountry: (label: string) => void,
  location: Coordinates,
  setLocation: (latlng: Coordinates) => void,
  guestCount: number,
  setGuestCount: (count: number) => void,
  roomCount: number,
  setRoomCount: (count: number) => void,
  bathroomCount: number,
  setBathroomCount: (count: number) => void,
  imageUrl: string,
  setImageUrl: (url: string) => void,
  title: string,
  setTitle: (text: string) => void,
  description: string,
  setDescription: (desc: string) => void,
  price: number,
  setPrice: (amt: number) => void,
}

export const useRentHomeStore = create<RentHomeStore>((set) => ({
  category: "",
  setCategory: (label) => set(() => ({
    category: label,
  })),

  country: "",
  setCountry: (label) => set(() => ({
    country: label,
  })),

  location: [0, 0],
  setLocation: (latlng: Coordinates) => set(() => ({
    location: latlng
  })),

  guestCount: 1,
  setGuestCount: (count) => set(() => ({
    guestCount: Math.max(count, 1),
  })),

  roomCount: 1,
  setRoomCount: (count) => set(() => ({
    roomCount: Math.max(count, 1),
  })),

  bathroomCount: 1,
  setBathroomCount: (count) => set(() => ({
    bathroomCount: Math.max(count, 1),
  })),

  imageUrl: "",
  setImageUrl: (url) => set(() => ({
    imageUrl: url,
  })),

  title: "",
  setTitle: (text) => set(() => ({
    title: text
  })),

  description: "",
  setDescription: (desc) => set(() => ({
    description: desc,
  })),

  price: 0,
  setPrice: (amt) => set(() => ({
    price: amt,
  })),

}))