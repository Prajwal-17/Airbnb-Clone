"use client"

import Image from "next/image";
import { IoMdMenu } from "react-icons/io";
import ProfilePlaceholder from "@/public/placeholder.jpg";
import { useState } from "react";
import Link from "next/link";
import { useRentModalStore } from "@/store/rentModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserMenu() {

  const { data: session } = useSession();
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false)
  const setRentModal = useRentModalStore((state) => state.setRentModal)

  const openMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  //opens rent home popup
  const showRentModal = () => {

    if (session?.user.id) {
      setRentModal();
    }
    router.push("/auth/login")

  }

  return (<>

    <div className="flex justify-between gap-3 items-center  text-sm  " >
      <div
        onClick={showRentModal}
        className="px-5 py-3 text-center  rounded-3xl hover:cursor-pointer hidden md:block hover:bg-slate-100">
        Airbnb Your Home
      </div>

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
          <div className="absolute z-10 bg-white top-20 right-7  md:right-14 lg:right-16 py-4 shadow-md px-5 overflow-hidden rounded-lg w-48">
            <ul className="flex flex-col gap-3 text-gray-700">
              <li><Link href="/favorites" className="hover:text-black">My Favorites</Link></li>
              <li><Link href="/reservations" className="hover:text-black">My Reservations</Link></li>
              <li><Link href="/properties" className="hover:text-black">My Properties</Link></li>
              <li onClick={showRentModal} className="hover:text-black">Airbnb My Home</li>
              <hr />
              <li className="text-red-600 hover:text-red-800 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

    </div>
  </>)
}