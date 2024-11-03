"use server"

import prisma from "@/lib/db"
import { HomeData } from "@/types"

//register your home (airbnb your home)
export const registerHome = async (data: HomeData) => {
  try {

    if (!data.category || !data.country || !data.location || !data.guestCount || !data.roomCount || !data.bathroomCount || !data.imageUrl || !data.title || !data.description || !data.price) {
      return { message: "Fill all the fields", success: false }
    }

    const home = await prisma.listing.create({
      data: {
        category: data.category,
        country: data.country,
        location: data.location,
        guestCount: data.guestCount,
        roomCount: data.roomCount,
        bathroomCount: data.bathroomCount,
        imageUrl: data.imageUrl,
        title: data.title,
        description: data.description,
        price: data.price,
      }
    })

    return { message: "Registered Successfully", success: true }

  } catch (error) {
    return { message: "Something went wrong", success: false }
  }
}

//get all list of homes 
export const getListing = async () => {

  try {
    const listing = await prisma.listing.findMany({})
    return { message: "Successfully fetched Home Lists", success: true, listing: listing }
  } catch (error) {
    return { message: "Something went wrong", success: false }
  }
}