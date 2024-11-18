"use client"

import { ReservationType } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type ReservationsCardProps = {
  list: ReservationType,
}

export default function ReservationsCard({ list }: ReservationsCardProps) {

  const router = useRouter();

  const handleCancelReservation = async () => {

    const loadingState = toast.loading("Canceling reservation... ")

    try {
      const response = await fetch(`/api/reservations/${list.id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        toast.dismiss(loadingState)
        toast.success("Reservation canceled")
      } else {
        toast.dismiss(loadingState)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <div
      onClick={() => router.push(`/listingDetails/${list.id}`)}
      className="flex flex-col gap-2 group"
    >
      <div className="relative h-72">
        <Image
          alt={list.Listing.title}
          src={list.Listing.imageUrl}
          fill
          className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="text-xl font-semibold">{list.Listing.country}</div>
      <div className="text-xl font-semibold">$ {list.total}</div>
      <div>
        <button onClick={(e) => {
          e.stopPropagation();
          handleCancelReservation();
        }} className="w-full text-center bg-rose-500 text-white py-2 rounded-lg">Cancel Reservation</button>
      </div>
    </div>
  </>)
}