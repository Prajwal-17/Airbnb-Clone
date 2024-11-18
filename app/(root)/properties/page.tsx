"use client"

import PropertiesCard from "@/components/PropertiesCard";
import { HomeData } from "@/types";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Properties() {

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [properties, setProperties] = useState<HomeData[]>([])

  useEffect(() => {

    const getUserData = async () => {
      try {
        const response = await fetch(`/api/properties/${userId}`, {
          method: "GET",
        })

        const data = await response.json();
        setProperties(data.properties);

      } catch (error) {
        console.log(error)
      }
    }

    getUserData();
  }, [userId])

  return (<>
    <div className="mx-3 my-7 sm:mx-5 md:mx-10 lg:mx-16">
      <div className="text-2xl font-bold">Properties</div>
      <div className="text-gray-500">List of properties you have!</div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
          {properties.map((list) => (

            <PropertiesCard
              key={list.id}
              list={list}
            />
          ))}
        </div>
      ) : (
        <div className="h-[60vh] w-full flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">No Properties Found</p>
          <p className="text-gray-500">Looks like you have no properties.</p>
        </div>
      )}
    </div>
  </>)
}