// CountriesInput.tsx
"use client"
import useCountries from "@/hooks/useCountries";
import { useState } from "react";
import Select from "react-select";

export default function CountriesInput() {

  const { getAll } = useCountries();
  const [value, setValue] = useState();

  function handleCountryChange(selectedOption: undefined) {
    setValue(selectedOption);
  }

  return (
    <div className="relative z-20">
      <Select
        className="z-20"
        isClearable
        value={value}
        onChange={handleCountryChange}
        options={getAll()}
        placeholder="Anywhere"
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 ">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg ",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...(theme?.colors ?? {}),
            primary: "black",
            primary25: "#ffe4e6",
            primary50: "#ffcacd",
          },
        })}
      />
    </div>
  );
}
