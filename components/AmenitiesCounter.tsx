"use client"

import { useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function AmenitiesCounter() {

  const [guestCount, setGuestCount] = useState(1)
  const [guestRoom, setGuestRoom] = useState(1)
  const [guestBathroom, setGuestBathroom] = useState(1)

function Dummy (){
  setGuestCount(1);
  setGuestRoom(1);
  setGuestBathroom(1);
}

  return (<>
    <div className="px-6">

      <div className="flex justify-between items-center gap-3 border-b-2 py-7">

        <div>
          <div>Guests</div>
          <div className="text-[#737373]">How many guests do you allow?</div>
        </div>

        <div className="flex items-center gap-3 text-xl">
          <button className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {guestCount}
          </div>
          <button className="p-2 rounded-full border-2">
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
          <button className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {guestRoom}
          </div>
          <button className="p-2 rounded-full border-2">
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
          <button className="p-2 rounded-full border-2">
            <AiOutlineMinus />
          </button>
          <div>
            {guestBathroom}
          </div>
          <button className="p-2 rounded-full border-2">
            <AiOutlinePlus />
          </button>
        </div>
      </div>


    </div>
  </>)
}