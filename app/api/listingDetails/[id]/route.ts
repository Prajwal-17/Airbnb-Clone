import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { listingId: string } }) {

  const listingId = params.listingId;

  try {
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      }
    })

    console.log("listing", listing)
  } catch (error) {
    console.log(error)
  }
}