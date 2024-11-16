"use client"

import Calendar from "@/components/Calendar";
import { ListingType } from "@/components/Listing";
import ListDetailsUI from "@/components/LoadingUI/ListDetailsUI";
import Map from "@/components/MapForm/Map";
import { categories } from "@/constants/categories";
import { useReservationStore } from "@/store/reservation";
import { ReservePropType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ListingDetails({ params }: {
  params: { id: string }
}) {

  const { data: session } = useSession();
  const id = params.id;
  const [home, setHome] = useState<ListingType | undefined>();
  const dateRange = useReservationStore((state) => state.dateRange)

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

  const handleReserve = async (dateRange: ReservePropType) => {

    if (!session?.user.id) {
      toast.error("Please Login to Reserve")
      return
    }

    if (dateRange.selection.startDate && dateRange.selection.endDate) {

      const startDate = dateRange.selection.startDate.toISOString();
      const endDate = dateRange.selection.endDate.toISOString();

      const totalPrice = (dateRange: ReservePropType) => {

        const startTime: number = dateRange.selection.startDate?.getTime() ?? 0;
        const endTime: number = dateRange.selection.endDate?.getTime() ?? 0;

        const timeDiff = endTime - startTime;

        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

        const price = home.price

        const total = days * price;

        return total
      }

      const reservationData = {
        startDate,
        endDate,
        total: totalPrice(dateRange),
        listingId: id,
        userId: session?.user.id,
      }

      try {
        const response = await fetch(`/api/listingDetails/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData)
        })

        const data = await response.json();

        if (data.success) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    } else {
      toast.error("Date not Selected")
    }
  }

  return (<>

    <div className="px-3 py-3 md:px-16 lg:px-28 md:py-8">

      {/* title */}
      <div>
        <div className="text-2xl font-bold leading-9">
          {home?.title}
        </div>
        <div className=" text-gray-500 text-lg">
          {home?.country}
        </div>
      </div>

      {/* image */}
      <div className="relative h-96 w-full group hover:cursor-pointer my-7">
        <Image
          src={home?.imageUrl || ""}
          // width={300}
          // height={300}
          alt={home?.title || ""}
          fill
          priority={false}
          className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="md:flex md:gap-5 items-start">

        {/* Left div */}
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

          <div className="flex justify-center py-4">
            <Calendar />
          </div>

          <div className="py-4 px-2 border-t-2">
            <button onClick={() => handleReserve(dateRange)} className="w-full bg-rose-500 text-white rounded-lg py-3">Reserve</button>
          </div>

          <div className="px-3 pb-2 text-xl">
            <span>Total</span>
          </div>
        </div>

      </div>
    </div>
  </>)
}