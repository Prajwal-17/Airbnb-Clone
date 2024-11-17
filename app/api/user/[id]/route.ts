import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const userId = params.id;

  try {

    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      }
    })

    return NextResponse.json({ message: "", success: true, user: userData })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong", success: false })
  }
}