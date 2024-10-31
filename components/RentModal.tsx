"use client";

import { categories } from "@/constants/categories";
import { useRentModalStore } from "@/store/rentModal";
import { X } from "lucide-react";
import { CategoryBox } from "./Categories/CategoryBox";
import { useState } from "react";
import CountriesInput from "./MapForm/CountriesInput";
import Map from "./MapForm/Map";
import AmenitiesCounter from "./AmenitiesCounter";
import { OurUploadDropzone } from "./ImageUpload";
import { BiDollar } from "react-icons/bi";

export default function RentModal() {
  const rentModalPopup = useRentModalStore((state) => state.rentModal);
  const setRentModal = useRentModalStore((state) => state.setRentModal)

  const [currentStepIndex, setCurrentStepIndex] = useState(1)


  function nextPage() {
    setCurrentStepIndex(currentStepIndex + 1)
  }

  function prevPage() {
    setCurrentStepIndex(currentStepIndex - 1)
  }

  console.log("currentStepIndex", currentStepIndex)

  return (<>

    {rentModalPopup &&
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
        <div className="bg-white rounded-lg shadow-lg max-w-xl w-full ">

          <div className=" flex justify-between items-center py-6 px-10 border-b-2">
            <button onClick={setRentModal} className=" w-0.5/12 hover:cursor-pointer" >
              <X size={20} className="text-gray-600 hover:text-gray-800" />
            </button>
            <span className="text-lg w-full font-semibold text-center">Airbnb your home!</span>
          </div>
          {rentModalPopup && currentStepIndex === 1 && (
            <div>

              <div>
                <div className="px-6 pt-6 pb-3">
                  <h2 className="font-bold text-2xl">
                    Which of these best describe your place?
                  </h2>
                  <div className="text-[#737373] pt-2">Pick a category</div>
                </div>

                <div className="grid grid-cols-2  p-6 mb-6 gap-2 overflow-y-scroll max-h-96 ">

                  {categories.map((category, index) => (
                    // <div
                    //   onClick={() => { console.log("hereeeeeee") }}
                    //   className=""
                    // >
                    <CategoryBox
                      key={index}
                      label={category.label}
                      icon={category.icon}
                      place="RentModal"
                    />
                    // </div>
                  ))}

                </div>

              </div>

              <div className="p-3">
                <button
                  onClick={nextPage}
                  className="w-full p-3 rounded-lg bg-rose-500 text-white ">Next</button>
              </div>
            </div>
          )}

          {currentStepIndex === 2 ? (
            <div>
              <div className="px-6 pt-6 pb-3">
                <h2 className="font-bold text-2xl">
                  Where is your place located?
                </h2>
                <div className="text-[#737373] pt-2">Help guests find you!</div>
              </div>

              <div className="px-6 pb-8 flex flex-col gap-5">

                <CountriesInput />
                <Map />
              </div>

              <div className="flex px-6 gap-3 justify-center items-center pb-8 text-center">
                <button
                  onClick={prevPage}
                  className="p-3 rounded-lg border-2 border-black w-full box-border">
                  Back
                </button>
                <button
                  onClick={nextPage}
                  className="p-3 rounded-lg bg-rose-500 w-full text-white border-2 border-transparent box-border">
                  Next
                </button>
              </div>

            </div >
          ) : null
          }

          {
            currentStepIndex === 3 ? (
              <div>
                <div>
                  <div className="px-6 pt-6 pb-3">
                    <h2 className="font-bold text-2xl">
                      Share some basics about your place.
                    </h2>
                    <div className="text-[#737373] pt-2">What amenities do you have?</div>
                  </div>

                </div>

                <div>
                  <AmenitiesCounter />
                </div>

                <div className="flex px-6 gap-3 justify-center items-center pb-8 text-center">
                  <button
                    onClick={prevPage}
                    className="p-3 rounded-lg border-2 border-black w-full box-border">
                    Back
                  </button>
                  <button
                    onClick={nextPage}
                    className="p-3 rounded-lg bg-rose-500 w-full text-white border-2 border-transparent box-border">
                    Next
                  </button>
                </div>
              </div>
            ) : null
          }

          {
            currentStepIndex === 4 ? (

              <div>
                <div>

                  <div className="px-6 pt-6 pb-3">
                    <h2 className="font-bold text-2xl">
                      Add a photo of your place
                    </h2>
                    <div className="text-[#737373] pt-2">Show guests what your place looks like!
                    </div>
                  </div>

                </div>

                <div className="px-6 pb-8">
                  <OurUploadDropzone />
                </div>

                <div className="flex px-6 gap-3 justify-center items-center pb-8 text-center">
                  <button
                    onClick={prevPage}
                    className="p-3 rounded-lg border-2 border-black w-full box-border">
                    Back
                  </button>
                  <button
                    onClick={nextPage}
                    className="p-3 rounded-lg bg-rose-500 w-full text-white border-2 border-transparent box-border">
                    Next
                  </button>
                </div>
              </div>
            ) : null
          }

          {
            currentStepIndex === 5 ? (

              <div>
                <div>

                  <div className="px-6 pt-6 pb-3">
                    <h2 className="font-bold text-2xl">
                      How would you describe your place?
                    </h2>
                    <div className="text-[#737373] pt-2">Short and sweet works best!
                    </div>
                  </div>

                </div>

                <div className="px-6 flex flex-col ">
                  <input type="text" className="border-2 rounded-xl py-5 px-2 mt-4 mb-7" placeholder="Title" />
                  <hr />
                  <input type="text" className="border-2 rounded-xl py-5 px-2 mt-4 mb-7" placeholder="Description" />
                </div>

                <div className="flex px-6 gap-3 justify-center items-center pb-8 text-center">
                  <button
                    onClick={prevPage}
                    className="p-3 rounded-lg border-2 border-black w-full box-border">
                    Back
                  </button>
                  <button
                    onClick={nextPage}
                    className="p-3 rounded-lg bg-rose-500 w-full text-white border-2 border-transparent box-border">
                    Next
                  </button>
                </div>
              </div >
            ) : null
          }

          {
            currentStepIndex === 6 ? (
              <div>
                <div>

                  <div className="px-6 pt-6 pb-3">
                    <h2 className="font-bold text-2xl">
                      Now set your price?
                    </h2>
                    <div className="text-[#737373] pt-2">How much do you charge per night!</div>
                  </div>

                </div>

                <div className="relative px-6 w-full flex">
                  <div className="absolute inset-y-0 left-9 bottom-5 text-xl flex items-center text-black pointer-events-none">
                    <BiDollar />
                  </div>
                  <input
                    type="number"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none mt-2 mb-6 focus:border-black"
                    placeholder="Price"
                    min="1"
                  />
                </div>


                <div className="flex px-6 gap-3 justify-center items-center pb-8 text-center">
                  <button
                    onClick={prevPage}
                    className="p-3 rounded-lg border-2 border-black w-full box-border">
                    Back
                  </button>
                  <button
                    onClick={nextPage}
                    className="p-3 rounded-lg bg-rose-500 w-full text-white border-2 border-transparent box-border">
                    Create
                  </button>
                </div>
              </div >
            ) : null
          }
        </div >
      </div >
    }


  </>)
};