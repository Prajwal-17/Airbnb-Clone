"use client"

import { getListing } from "@/actions/registerHome";
import React, { Suspense, useEffect, useState } from "react";
import ListLoadingUI from "./LoadingUI/ListLoadingUI";

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
  const [listing, setListing] = useState<ListingType[] | undefined>(undefined);

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

  return (
    <>
      <Suspense fallback={<ListLoadingUI />}>
        <section className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 py-5 md:py-8 gap-6 ">
          {
            listing && listing.map((item) => (
              <ListingCard item={item} key={item.id} />
            ))
          }
        </section>
      </Suspense>
    </>
  );
}
