import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//update or remove the favorite lists
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {

  const searchParams = request.nextUrl.searchParams;

  const userId = params.id;
  const listingId = searchParams.get("listingId") || "";

  try {

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }

    let updatedFavorites: string[] = user.favorites;

    //if st => remove an existing listId
    //else st => add a new listId
    if (user.favorites.includes(listingId)) {
      updatedFavorites = user.favorites.filter((item) => item !== listingId)
    } else {
      updatedFavorites.push(listingId)
    }

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        favorites: {
          set: updatedFavorites,
        }
      }
    })

    return NextResponse.json({ message: "Successfull", success: true, userFav: user.favorites })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed adding to favorites", success: false })
  }
}

//fetching favorites with listing details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const userId = params.id;

  try {

    const userFavorites = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        favorites: true,
      }
    });

    if (!userFavorites?.favorites) {
      return NextResponse.json({ message: "You have an empty list", success: true })
    }

    const listingDetails = await prisma.listing.findMany({
      where: {
        id: {
          in: userFavorites.favorites,
        }
      }
    })

    return NextResponse.json({ message: "Successfully fetched favorites list", success: true, listings: listingDetails, favorites: userFavorites })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}