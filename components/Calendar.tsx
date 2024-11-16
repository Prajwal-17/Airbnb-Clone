"use client";

import { totalPrice } from "@/lib/totalPrice";
import { useReservationStore } from "@/store/reservation";
import { ReservationType } from "@/types";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";

export default function DateRangePicker({ id, price }: { id: string; price: number }) {
  const dateRange = useReservationStore((state) => state.dateRange);
  const setDate = useReservationStore((state) => state.setDate);
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [disabledArray, setDisabledArray] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDisabledDates = async (listingId: string) => {
      try {
        const response = await fetch(`/api/listingDetails/${listingId}/reservations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setReservations(data.reservations);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    fetchDisabledDates(id);
  }, [id]);

  useEffect(() => {
    const compute = () => {
      const disableDates: Date[] = [];
      const sortedArray: string[] = [];

      reservations.forEach((item) => {
        sortedArray.push(item.startDate);
        sortedArray.push(item.endDate);
      });

      for (let i = 0; i <= sortedArray.length - 1; i += 2) {
        const startDate = new Date(sortedArray[i]);
        const endDate = new Date(sortedArray[i + 1]);
        const currentDate = new Date(startDate);

        while (currentDate < endDate) {
          disableDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }

      setDisabledArray((prevArray) => [...prevArray, ...disableDates]);
    };

    if (reservations.length > 0) {
      compute();
    }
  }, [reservations]);

  return (
    <div>
      <DateRange
        rangeColors={["#262626"]}
        editableDateInputs={true}
        onChange={(item) => {
          const key = item.selection.key ?? "selection";
          const updatedRange = {
            [key]: {
              startDate: item.selection.startDate || undefined,
              endDate: item.selection.endDate || undefined,
              key,
            },
          };
          setDate(updatedRange);
          totalPrice(dateRange, price);
        }}
        moveRangeOnFirstSelection={false}
        ranges={Object.values(dateRange)}
        minDate={new Date()}
        direction="vertical"
        showDateDisplay={false}
        disabledDates={disabledArray}
      />
    </div>
  );
}
