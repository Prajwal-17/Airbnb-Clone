"use client";

import { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type RangeType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
};

export default function DateRangePicker() {
  const initialDateRange: RangeType = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [state, setState] = useState<{ [key: string]: Range }>({
    [initialDateRange.key]: initialDateRange,
  });

  // console.log(state)
  // console.log(typeof (state.selection.startDate))
  // console.log(state.selection.endDate)
  // console.log(state.key)

  return (
    <div>
      <DateRange
        rangeColors={["#262626"]}
        editableDateInputs={true}
        onChange={(item) => {
          const key = item.selection.key ?? "selection";
          setState({ [key]: item.selection });
        }}
        moveRangeOnFirstSelection={false}
        ranges={Object.values(state)}
        minDate={new Date()}
        // direction="vertical"
        showDateDisplay={false}
      />
    </div>
  );
}
