"use client"

import Image from "next/image";
import { IoMdMenu } from "react-icons/io";
import ProfilePlaceholder from "@/public/placeholder.jpg";
import { useState } from "react";
import Link from "next/link";

export default function UserMenu() {

  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  const openMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  return (<>
    <div
      onClick={openMenu}
      className="flex  justify-between gap-2 items-center px-2 py-1 rounded-3xl border-2 hover:cursor-pointer hover:shadow-md" >
      <div className="rounded-full p-2">
        <IoMdMenu className="text-lg" />
      </div>
      <div className="hidden md:block" >
        <Image
          src={ProfilePlaceholder}
          alt="profile png"
          className="rounded-full object-cover"
          width={30}
          height={30}
        />
      </div>
      {toggleMenu && (
        <div className="absolute bg-white top-20 right-7  md:right-14 lg:right-16 py-4 shadow-md px-5 overflow-hidden rounded-lg w-48">
          <ul className="flex flex-col gap-3 text-gray-700">
            <li><Link href="/trips" className="hover:text-black">My Trips</Link></li>
            <li><Link href="/favorites" className="hover:text-black">My Favorites</Link></li>
            <li><Link href="/reservations" className="hover:text-black">My Reservations</Link></li>
            <li><Link href="/properties" className="hover:text-black">My Properties</Link></li>
            <li><Link href="/airbnb-your-home" className="hover:text-black">Airbnb My Home</Link></li>
            <hr />
            <li className="text-red-600 hover:text-red-800 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  </>)
}