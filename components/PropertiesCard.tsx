"use client"

import { HomeData } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type PropertiesCardProps = {
  list: HomeData
}

export default function PropertiesCard({ list }: PropertiesCardProps) {

  const router = useRouter();

  const handleDeleteProperty = async () => {

    const loadingState = toast.loading("Deleting listing... ")

    try {
      const response = await fetch(`/api/listingDetails/${list.id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        toast.dismiss(loadingState)
        toast.success("Successfully deleted")
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
          alt={list?.title}
          src={list?.imageUrl}
          fill
          className="rounded-xl object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="text-xl font-semibold">{list.country}</div>
      <div className="text-gray-500 text-lg">{list.category}</div>
      <div>
        <button onClick={(e) => {
          e.stopPropagation();
          handleDeleteProperty();
        }} className="w-full text-center bg-rose-500 text-white py-2 rounded-lg">Delete Property</button>
      </div>
    </div>
  </>)
}