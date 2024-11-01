"use client"

import { useRentHomeStore } from "@/store/rentHome";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function AmenitiesCounter() {

  const guestCount = useRentHomeStore((state) => state.guestCount)
  const roomCount = useRentHomeStore((state) => state.roomCount)
  const bathroomCount = useRentHomeStore((state) => state.bathroomCount)
  const setGuestCount = useRentHomeStore((state) => state.setGuestCount)
  const setRoomCount = useRentHomeStore((state) => state.setRoomCount)
  const setBathroomCount = useRentHomeStore((state) => state.setBathroomCount)

  return (<>
    <div className="px-6">

      <div className="flex justify-between items-center gap-3 border-b-2 py-7">

        <div>
          <div>Guests</div>
          <div className="text-[#737373]">How many guests do you allow?</div>
        </div>

        <div className="flex items-center gap-3 text-xl">
          <button onClick={() => { setGuestCount(guestCount - 1) }} className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {guestCount}
          </div>
          <button onClick={() => { setGuestCount(guestCount + 1) }} className="p-2 rounded-full border-2">
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 border-b-2 py-7">

        <div>
          <div>Rooms</div>
          <div className="text-[#737373]">How many rooms do you have?</div>
        </div>

        <div className="flex items-center gap-3 text-xl">
          <button onClick={() => { setRoomCount(roomCount - 1) }} className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {roomCount}
          </div>
          <button onClick={() => { setRoomCount(roomCount + 1) }} className="p-2 rounded-full border-2">
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 py-7">

        <div>
          <div>Bathrooms</div>
          <div className="text-[#737373]">How many bathrooms do you have?</div>
        </div>

        <div className="flex items-center gap-3 text-xl">
          <button onClick={() => { setBathroomCount(bathroomCount - 1) }} className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {bathroomCount}
          </div>
          <button onClick={() => { setBathroomCount(bathroomCount + 1) }} className="p-2 rounded-full border-2">
            <AiOutlinePlus />
          </button>
        </div>
      </div>


    </div>
  </>)
}