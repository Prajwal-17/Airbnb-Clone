"use server"

import prisma from "@/lib/db"
import { FormInputType } from "@/types"
import bcrypt from "bcryptjs";

export const userSignUp = async (data: FormInputType) => {
  const userData = data;

  try {

    if (!userData.name || !userData.email || !userData.password) {
      return { message: "Fill out the fields", success: false }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: userData.email,
      }
    })

    if (existingUser) {
      return { message: "User Already Exists", success: false }
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        emailVerified: null,
        image: ""
      }
    })

    return { message: "SignUp Successfull", success: true }
  } catch (error) {
    return { message: "Something went wrong", success: false }
  }
}