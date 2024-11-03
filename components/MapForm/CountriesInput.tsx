"use client";
import useCountries from "@/hooks/useCountries";
import { useRentHomeStore } from "@/store/rentHome";
import Select from "react-select";
interface CountryOption {
  label: string;
  latlng: [number, number];
  flag: string;
  region: string;
}

export default function CountriesInput() {

  const { getAll } = useCountries();
  const setCountry = useRentHomeStore((state) => state.setCountry);
  const setLocation = useRentHomeStore((state) => state.setLocation);

  return (
    <div className="relative z-20">
      <Select
        className="z-20"
        isClearable
        onChange={(value: CountryOption | null) => {
          if (value) {
            setCountry(value.label + "," + value.region);
            setLocation(value.latlng);
          }
        }}
        options={getAll()}
        placeholder="Anywhere"
        formatOptionLabel={(option: CountryOption) => (
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
