import { create } from "zustand";

type CategoryStoreType = {
  categoryOptn: string | null,
  setCategoryOptn: (label: string | null) => void,
}

export const useCategoryStore = create<CategoryStoreType>((set) => ({
  categoryOptn: null,
  setCategoryOptn: (label) => set(() => ({
    categoryOptn: label,
  })),
}))