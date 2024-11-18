import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const userId = params.id;

  try {

    const listingDetails = await prisma.listing.findMany({
      where: {
        userId: userId,
      }
    })

    if (!listingDetails) {
      return NextResponse.json({ message: "No properties not found", success: true })
    }

    return NextResponse.json({ message: "Successfully fetched properties", success: true, properties: listingDetails })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong ", success: false })
  }
}