import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const Dropdown = ({items, placeholder}) => {
  return (
    <Select>
        <SelectTrigger>
            <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent align='end'>
            <SelectGroup>
                {items.map((item) => 
                    <SelectItem value={item.toLowerCase()}>{item}</SelectItem>
                )}
            </SelectGroup>
        </SelectContent>
      </Select>
  )
}

export default Dropdown