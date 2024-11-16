import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//get all listings
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const listingId = params.id;

  try {
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      }
    })

    return NextResponse.json({ message: "Successfully fetched home lists", success: true, listing: listing })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}

//listing a reservation
export async function POST(request: NextRequest) {

  try {
    const res = await request.json();

    const reserve = await prisma.reservation.create({
      data: {
        startDate: res.startDate,
        endDate: res.endDate,
        total: res.total,
        listingId: res.listingId,
        userId: res.userId,
      }
    })

    return NextResponse.json({ message: "Listing Reserved", success: true, reserve })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", success: false, error })
  }
}