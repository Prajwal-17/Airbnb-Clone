import Image from "next/image"
import Logo from "@/public/logo.png";
import { BiSearch } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import ProfilePlaceholder from "@/public/placeholder.jpg";

export const Navbar = () => {
  return (<>
    <nav className="flex justify-between items-center py-5 px-20 border-b-[1px] ">

      <div className="flex justify-center my-2">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="logo"
        />
      </div>

      <div className="flex items-center">
        <span>Anywhere</span>
        <span>Any Week</span>
        <span>Add Guests</span>
        <div className="bg-pink-500 text-white ">
          <BiSearch />
        </div>
      </div>

      <div className="flex items-center">
        <div>
          <span>Airbnb Your Home</span>
        </div>

        <div className="flex items-center border-[#E5E7EB] border-[1px] rounded-3xl gap-2 px-3 py-2">

          <div>
            <IoMdMenu className="text-xl" />
          </div>

          <div className="w-7 h-7">
            <Image
              src={ProfilePlaceholder}
              alt="profile png"
              className="rounded-full object-cover"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </nav>
  </>)
}