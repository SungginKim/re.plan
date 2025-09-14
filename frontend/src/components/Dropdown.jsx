import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const Dropdown = ({ items = [], placeholder, onChange }) => {
  return (
    <div className="w-full">
      {" "}
      <Select>
        <SelectTrigger className="w-full">
          {" "}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="w-[var(--radix-select-trigger-width)]"
          style={{ width: "var(--radix-select-trigger-width)" }}
        >
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item}
                value={item.toLowerCase()}
                onChange={onChange}
                className="w-full"
              >
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
