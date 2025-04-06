import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const TimerInput = ({ label, setValue, value }) => {
  const handleIncrease = () => setValue((prev) => (prev < 99 ? prev + 1 : 99));
  const handleDecrease = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,2}$/.test(val)) {
      setValue(val === "" ? 0 : parseInt(val));
    }
  };

  return (
    <div className="relative w-full">
      <p className="uppercase font-[Inter] text-[14px] font-light text-white">
        {label}
        <span className="text-[#FEDB6B]">*</span>
      </p>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          placeholder="00"
          onChange={handleChange}
          className="px-1 py-3 border bg-[#000000] border-[#766E53] text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none w-full text-center"
          maxLength={2}
        />
        {/* Custom Arrows */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
          <button type="button" onClick={handleIncrease}>
            <FaChevronUp className="text-[#FEDB6B] hover:text-white cursor-pointer" />
          </button>
          <button type="button" onClick={handleDecrease}>
            <FaChevronDown className="text-[#FEDB6B] hover:text-white cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerInput;
