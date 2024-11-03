import { CategoryBox } from "@/components/Categories/CategoryBox";
import Listing from "@/components/Listing";
import { categories } from "@/constants/categories";

export default function Home() {

  return (
    <div>
      <section className="flex mx-4 md:px-5 gap-3 pt-4 pb-2 justify-between text-sm font-medium border-b-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            label={category.label}
            icon={category.icon}
            place="homepage"
          />
        ))}
      </section>

      <Listing />

    </div>
  )
}
