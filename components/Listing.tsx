"use client"

import { getListing } from "@/actions/registerHome";
import React, { Suspense, useEffect, useState } from "react";
import ListLoadingUI from "./LoadingUI/ListLoadingUI";
import { useSession } from "next-auth/react";

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
  const [listing, setListing] = useState<ListingType[] | undefined>(undefined);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const homes = await getListing();
        const listings = homes.listing;

        if (listings) {
          setListing(listings);
        }

      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchListing();
  }, []);

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
  return (
    <>
      <Suspense fallback={<ListLoadingUI />}>
        <section className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 py-5 md:py-8 gap-6 ">
          {
            listing && listing.map((item) => (
              <ListingCard item={item} key={item.id} favorites={userFavorites} />
            ))
          }
        </section>
      </Suspense>
    </>
  );
}
