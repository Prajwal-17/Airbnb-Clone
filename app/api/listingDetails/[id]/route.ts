import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//get listings by id
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

//delete listing
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const listingId = params.id;

  try {
    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
      }
    })

    if (!listing) {
      return NextResponse.json({ messge: "Listing not found", success: false })
    }

    return NextResponse.json({ message: "Successfully deleted property", success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}