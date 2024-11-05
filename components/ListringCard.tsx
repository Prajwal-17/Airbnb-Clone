import Image from "next/image";
import { ListingType } from "./Listing";

interface ListingCardProps {
  item: ListingType;
}

export default function ListingCard({ item }: ListingCardProps) {

  return (<>
    <div className="flex flex-col gap-2 group hover:cursor-pointer">

      <div className="relative h-72">

        <Image
          className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105 "
          src={item.imageUrl}
          fill
          alt="images"
        />
      </div>

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