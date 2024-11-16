"use client";

import { useReservationStore } from "@/store/reservation";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePicker() {
  const dateRange = useReservationStore((state) => state.dateRange);
  const setDate = useReservationStore((state) => state.setDate);

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
        }}
        moveRangeOnFirstSelection={false}
        ranges={Object.values(dateRange)}
        minDate={new Date()}
        direction="vertical"
        showDateDisplay={false}
      // disabledDates={[
      //   new Date("2024-11-20T00:19:11.000Z"),
      //   new Date("2024-11-25T00:19:11.000Z"),
      // ]}
      />
    </div>
  );
}
