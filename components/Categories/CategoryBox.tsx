import { IconType } from "react-icons"

type CategoryBox = {
  label: string,
  place: string,
  icon: IconType,
  selected?: boolean,
}

//renaming icon => Icon for readability
export const CategoryBox = ({ label, place, icon: Icon, selected }: CategoryBox) => {

  return (<>

    <div
      className={`${place === "homepage" ? "p-3 flex flex-col gap-1 text-gray-500 hover:text-black hover:cursor-pointer items-center" : "border-2 rounded-lg p-4 flex flex-col gap-2 font-semibold hover:cursor-pointer hover:border-black"} ${selected ? "border-2 border-black" : ""}`}>
      <Icon className="text-center" size={28} />
      <div>{label}</div>
    </div >

  </>)
}