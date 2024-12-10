"use client"

import { CategoryBox } from "@/components/Categories/CategoryBox";
import Listing from "@/components/Listing";
import { categories } from "@/constants/categories";
import { useCategoryStore } from "@/store/category";

export const dynamic = 'force-dynamic';

export default function Home() {

  const categoryOptn = useCategoryStore((state) => state.categoryOptn)
  const setCategoryOptn = useCategoryStore((state) => state.setCategoryOptn);

  const selectCategory = (categoryLabel: string) => {

    if (categoryOptn === categoryLabel) {
      setCategoryOptn(null)
    } else {
      setCategoryOptn(categoryLabel)
    }

  }

  return (
    <div>
      <section className="flex mx-4 md:px-5 gap-3 pt-4 pb-2 justify-between text-sm font-medium border-b-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => selectCategory(category.label)}
          >
            <CategoryBox
              key={index}
              label={category.label}
              icon={category.icon}
              place="homepage"
              selected={false}
            />
          </div>
        ))}
      </section>

      <Listing />

    </div>
  )
}
