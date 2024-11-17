import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json({ message: "Successfull", success: true, user: user.favorites })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed adding to favorites", success: false })
  }
}