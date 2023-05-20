"use client";

import useClickOutside from "@/libs/useClickOutside";
import { Dispatch, SetStateAction, useState } from "react";

interface props {
  default_name: string;
  list: string[];
  state: string;
  setter: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ default_name, list, state, setter }: props) => {
  const [open, setopen] = useState<boolean>(false);
  const ref_dropdown = useClickOutside(() => setopen(false));
  return (
    <div className="relative" ref={ref_dropdown}>
      <div
        className="flex items-center justify-between border bg-white p-4 hover:cursor-pointer"
        onClick={() => setopen((state) => !state)}
      >
        <div className="font-bold">
          {state === "전체" ? default_name : state}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-3 w-3 ${open && "rotate-180"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className={`absolute w-full ${!open && "hidden"}`}>
        <div className="flex flex-col border bg-white px-4 py-2">
          {list.map((el) => (
            <div
              className={`items-center justify-between py-2 text-xs hover:cursor-pointer hover:font-bold`}
              key={el}
              onClick={() => {
                setter(el);
                setopen(false);
              }}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
