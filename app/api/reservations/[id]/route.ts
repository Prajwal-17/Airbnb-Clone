import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

//fetch reservations
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const userId = params.id;

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        Listing: true,
      }
    })

    if (!reservations) {
      return NextResponse.json({ message: "Reservtions not found ", success: true })
    }

    return NextResponse.json({ message: "Successfully fetched reservations", success: true, reservations: reservations })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}

//cancel a reservation
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const reserveId = params.id;

  try {
    const reservations = await prisma.reservation.delete({
      where: {
        id: reserveId,
      }
    })

    if (!reservations) {
      return NextResponse.json({ message: "Reservtions not found ", success: true })
    }

    return NextResponse.json({ message: "Successfully deleted reservation", success: true, reservations: reservations })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}