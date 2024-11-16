import { ReservePropType } from "@/types";

export const totalPrice = (dateRange: ReservePropType, homePrice: number) => {

  const startTime: number = dateRange.selection.startDate?.getTime() ?? 0;
  const endTime: number = dateRange.selection.endDate?.getTime() ?? 0;

  const timeDiff = endTime - startTime;

  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

  const price = homePrice

  const total = days * price;

  return total || price
}