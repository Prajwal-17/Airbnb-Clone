"use client"

import Image from "next/image";
import { ListingType } from "./Listing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ListingCardProps {
  item: ListingType,
  favorites: string[],
}

export default function ListingCard({ item, favorites }: ListingCardProps) {

  const router = useRouter();
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    function looping() {
      favorites.forEach((ids) => {
        if (ids === item.id) {
          setHeart(true)
        }
      })
    }
    looping();
  }, [favorites, item.id])

  const handleFavorite = async (listingId: string, userId: string) => {

    const loadingState = toast.loading("Please wait")
    setHeart(!heart)

    try {
      const response = await fetch(`/api/favorites/${userId}?listingId=${listingId}`, {
        method: "POST"
      })

      const data = await response.json();
      favorites = data.user;
      if (response.ok) {
        if (!heart) {
          toast.dismiss(loadingState)
          toast.success("Added to Favorites")
        } else {
          toast.dismiss(loadingState)
          toast.success("Removed from Favorites")
        }
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingState)
      toast.error("Something went wrong")
    }
  }

  return (<>
    <div className="relative">

      <div
        onClick={() => {
          handleFavorite(item.id, item.userId)
        }}
        className="absolute z-10 p-2 top-1 right-1 text-white cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={`${heart ? "red" : "none"}`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-heart"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      <div
        onClick={() => {
          router.push(`/listingDetails/${item.id}`)
        }}
        className="flex flex-col gap-2 group hover:cursor-pointer">

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
    </div>
  </>)
}