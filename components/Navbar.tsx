import Image from "next/image"
import Logo from "@/public/logo.png";
// import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import UserMenu from "./UserMenu";

export const Navbar = () => {

  return (<>
    <nav className="flex justify-between items-center  pt-5  pb-5 font-semibold text-sm px-5 md:px-12 lg:px-16 p border-b-2 gap-2">

      <div className="hover:cursor-pointer">
        <Link href="/">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
      </div>

      {/* <div className="flex justify-between md:justify-center w-full md:w-max md:gap-3 items-center border-2 rounded-full px-3 py-2 hover:cursor-pointer hover:shadow-md " >
        <span className="pl-2 pr-2" >Anywhere</span>
        <span className="border-x-[1px] hidden md:block px-4">Any Week</span>
        <span className="pl-2 hidden md:block">Add Guests</span>
        <div className="bg-rose-500 text-white rounded-full p-2">
          <BiSearch />
        </div>
      </div> */}

      <UserMenu />
    </nav>
  </>)
}