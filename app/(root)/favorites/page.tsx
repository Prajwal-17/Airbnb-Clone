"use client";

import FavoritesCard from "@/components/FavoritesCard";
import { HomeData } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Favorites() {
  const { data: session } = useSession();
  const userId = session?.user.id || "";
  const [favoriteList, setFavoriteList] = useState<HomeData[]>([]);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getUsersList = async (userId: string) => {
      try {
        const response = await fetch(`/api/favorites/${userId}`, {
          method: "GET",
        });
        const data = await response.json();

        setFavoriteList(data.listings);
        setUserFavorites(data.userFav);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (userId) {
      getUsersList(userId);
    }
  }, [userId]);

  // Callback to update userFavorites
  const updateUserFavorites = (newFavorites: string[]) => {
    setUserFavorites(newFavorites);
  };

  return (
    <div className="mx-3 my-7 sm:mx-5 md:mx-10 lg:mx-16">
      <div className="text-2xl font-bold">Favorites</div>
      <div className="text-gray-500">List of places you have favorited!</div>

      {favoriteList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
          {favoriteList.map((list, index) => (
            <FavoritesCard
              key={list.id}
              index={index}
              list={list}
              favorites={userFavorites}
              updateUserFavorites={updateUserFavorites}
            />
          ))}
        </div>
      ) : (
        <div className="h-[60vh] w-full flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">No Favorites Found</p>
          <p className="text-gray-500">Looks like you have no favorites.</p>
        </div>
      )}
    </div>
  );
}
