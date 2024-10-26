import { IconType } from "react-icons"

type CategoryBox = {
  label: string,
  icon: IconType
}

//renaming icon => Icon for readability
export const CategoryBox = ({ label, icon: Icon }: CategoryBox) => {
  return (<>
    <div className="p-3 flex flex-col gap-1 text-gray-500 hover:text-black hover:cursor-pointer items-center">
      <Icon className="text-center" size={25} />
      <div>{label}</div>
    </div >
  </>)
}