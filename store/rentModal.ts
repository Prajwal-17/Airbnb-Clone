import { create } from 'zustand'

type RentModalStore = {
  rentModal: boolean,
  setRentModal: () => void,
}

export const useRentModalStore = create<RentModalStore>((set) => ({
  rentModal: false,
  setRentModal: () => set((state) => ({
    rentModal: !state.rentModal,
  }))
}))
