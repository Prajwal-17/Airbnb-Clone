import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

//get all reservations
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const listingId = params.id;

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        listingId: listingId,
      }
    })

    return NextResponse.json({ message: "Successfully fetched reservations", success: true, reservations: reservations })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}