// "use client"

import Image from "next/image";
import { ListingType } from "./Listing";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  item: ListingType;
}

export default function ListingCard({ item }: ListingCardProps) {

  const router = useRouter();

  return (<>
    <div
      // onClick={() => {
      //   router.push(`/listingDetails/${item.id}`)
      // }}
      className="flex flex-col gap-2 group hover:cursor-pointer">

      <Image
        className="rounded-xl h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105 "
        src={item.imageUrl}
        width={500}
        height={400}
        alt="images"
        objectFit="contain"
      />

      <div className="text-xl font-semibold">
        {item.country}
      </div>
      <div className="text-[#737373] ">
        {item.category}
      </div>
      <div>
        <span>$</span>{item.price} <span>night</span>
      </div>
    </div>
  </>)
}