import { create } from "zustand";

export type DateType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
};

export type ReservationStore = {
  dateRange: { [key: string]: DateType };
  setDate: (range: { [key: string]: DateType }) => void;
};

const initialDateRange: { [key: string]: DateType } = {
  selection: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
};

export const useReservationStore = create<ReservationStore>((set) => ({
  dateRange: initialDateRange,
  setDate: (range) => {
    set((state) => ({
      dateRange: {
        //...state.dateRange spreads the existing range 
        //and ...range spreads the new dateRange and get it gets due to having the same key "selection"
        ...state.dateRange,
        ...range,
      },
    }));
  },
}));
