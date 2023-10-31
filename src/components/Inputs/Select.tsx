import React, { useState, useEffect } from "react";
import ArrowSvg from "../../../public/images/arrow.svg";

interface Props
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label?: string;
  options: Array<{ label: string; value: string }>;
  onChange(value: string): void;
  value: string;
}

export default function InputSelect({
  label,
  options,
  onChange,
  value,
  placeholder,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value !== inputValue) setInputValue(value);
  }, [value]);

  return (
    <div className="w-full bg-white">
      <span className="font-bold text-xs">{label}</span>

      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={value} onChange={e => onChange(e.target.value)}>
        <option selected>{ placeholder }</option>
        {Array.isArray(options) &&
          options.length > 0 &&
          options.map((option, i) => (
            <option
              key={option.label + i}
            >
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
