"use client"

import Calendar from "@/components/Calendar";
import { ListingType } from "@/components/Listing";
import ListDetailsUI from "@/components/LoadingUI/ListDetailsUI";
import Map from "@/components/MapForm/Map";
import { categories } from "@/constants/categories";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListingDetails({ params }: {
  params: { id: string }
}) {

  const id = params.id;
  const [home, setHome] = useState<ListingType | undefined>();
  // const [hostedBy, setHostedBy] = useState("");

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        setHome(undefined)
        const listing = await fetch(`http://localhost:3000/api/listingDetails/${id}`, {
          method: "GET",
        })
        const response = await listing.json();
        setHome(response.listing);

      } catch (error) {
        console.log(error)
      }
    }

    fetchListingDetails();
  }, [id])

  if (!home) {
    return (
      <ListDetailsUI />
    )
  }

  return (<>

    <div className="px-56 py-8">

      <div>
        <div className="text-2xl font-bold leading-9">
          {home?.title}
        </div>
        <div className=" text-gray-500 text-lg">
          {home?.country}
        </div>
      </div>

      <div className="relative h-96 w-full group hover:cursor-pointer my-7">
        <Image
          src={home?.imageUrl || ""}
          // width={300}
          // height={300}
          alt={home?.title || ""}
          fill
          className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex gap-8 items-start">

        <div className="mt-10 p-4">

          <div className="font-semibold text-xl">
            Hosted by {home?.userId}
          </div>

          <div className="flex gap-3 my-3 text-gray-500 mb-8">
            <div>{home?.guestCount} guests</div>
            <div>{home?.roomCount} rooms</div>
            <div>{home?.bathroomCount} bathrooms</div>
          </div>

          <div className="border-t-2 border-b-2 flex items-center gap-3 py-8">
            <div className="text-4xl  text-gray-500 p-2">
              {categories.map((item) => (
                <div key={item.label}>
                  {home?.category === item.label && <div>
                    <item.icon />
                  </div>}
                </div>
              ))}
            </div>
            <div>
              <div className="text-lg font-semibold">{home?.category}</div>
              <div className=" text-gray-500 ">This property is in the {home?.category}</div>
            </div>
          </div>

          <div className="text-gray-500 text-lg border-b-2 py-7">
            {home?.description}
          </div>

          <div>
            <Map />
          </div>

        </div>

        <div className="mt-10 border-2 rounded-xl">
          <div className="text-2xl py-4 px-3 border-b-2">
            <span className="font-semibold">$</span>
            <span className="font-semibold"> {home?.price}</span>
            <span> / night</span>
          </div>

          <Calendar />

          <div className="py-4 px-2 border-t-2">
            <button className="w-full bg-rose-500 text-white rounded-lg py-3">Reserve</button>
          </div>

          <div className="px-3 pb-2 text-xl">
            <span>Total</span>
          </div>
        </div>


      </div>
    </div>
  </>)
}