"use client"

import React, { Suspense, useEffect, useState } from "react";
import ListLoadingUI from "./LoadingUI/ListLoadingUI";
import { useSession } from "next-auth/react";
import { useCategoryStore } from "@/store/category";

export type ListingType = {
  id: string;
  category: string;
  country: string;
  location: number[];
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  userId: string,
  createdAt: Date;
  updatedAt: Date;
};

const ListingCard = React.lazy(() => import('./ListringCard'))

export default function Listing() {

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [listing, setListing] = useState<ListingType[]>([]);
  const [filteredListing, setFilteredListing] = useState<ListingType[]>([])
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const categoryOptn = useCategoryStore((state) => state.categoryOptn);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        setUserFavorites(data.user.favorites)

      } catch (error) {
        console.log(error)
      }
    }

    getUserData();
  }, [userId])

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listing`, {
          method: "GET",
        });

        const data = await response.json();

        if (data) {
          setListing(data.listing);
          setFilteredListing(data.listing);
        }

      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchListing();
  }, []);

  useEffect(() => {

    if (!categoryOptn) {
      setFilteredListing(listing)
    } else {
      const filtered = listing.filter(item =>
        item.category === categoryOptn
      );

      setFilteredListing(filtered);
    }
  }, [categoryOptn, listing]);

  return (
    <>
      <Suspense fallback={<ListLoadingUI />}>

        {filteredListing.length > 0 ? (
          <section className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 py-5 md:py-8 gap-6 ">
            {filteredListing.map((item) => (
              <ListingCard
                item={item}
                key={item.id}
                favorites={userFavorites}
              />
            ))}
          </section>
        ) : (
          <div className="text-3xl font-bold">not found</div>
        )}

      </Suspense >
    </>
  );
}

