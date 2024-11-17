"use client";

import { HomeData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FavoritesCardProps = {
  index: number;
  list: HomeData;
  favorites?: string[];
  updateUserFavorites: (newFavorites: string[]) => void;
};

export default function FavoritesCard({
  index,
  list,
  favorites = [],
  updateUserFavorites,
}: FavoritesCardProps) {
  const router = useRouter();
  const [heart, setHeart] = useState(true);

  useEffect(() => {
    setHeart(favorites.includes(list.id));
  }, [favorites, list.id]);

  const handleFavorite = async (listingId: string, userId: string) => {
    const loadingState = toast.loading("Please wait");
    setHeart(!heart);

    try {
      const response = await fetch(`/api/favorites/${userId}?listingId=${listingId}`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        updateUserFavorites(data.userFav);

        toast.dismiss(loadingState);
        toast.success(heart ? "Removed from Favorites" : "Added to Favorites");
      } else {
        throw new Error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.dismiss(loadingState);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative" key={list.id}>
      <div
        onClick={() => handleFavorite(list.id, list.userId)}
        className="absolute z-10 p-2 top-1 right-1 text-white cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          // fill="red"
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
        onClick={() => router.push(`/listingDetails/${list.id}`)}
        className="flex flex-col gap-2 group"
      >
        <div className="relative h-72">
          <Image
            alt={list?.title}
            src={list?.imageUrl}
            fill
            className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="text-xl font-semibold">{list.country}</div>
        <div className="text-gray-500 text-lg">{list.category}</div>
        <div className="font-semibold">
          $ {list.price} <span className="font-light">night</span>
        </div>
      </div>
    </div>
  );
}
