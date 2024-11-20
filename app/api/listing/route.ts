import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const listing = await prisma.listing.findMany()

    return NextResponse.json({ message: "Successfully fetched home lists", success: true, listing: listing })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}