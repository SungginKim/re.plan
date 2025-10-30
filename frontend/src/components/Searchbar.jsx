import React from 'react'
import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div className="relative w-fit h-fit flex items-center">
      <Search color="gray" className="absolute right-5" />
      <input
        name="search"
        className="bg-[#F5F6FA] border-[#D5D5D5] border-1 rounded-full h-8 px-5 outline-0"
        placeholder="Search"
      />
    </div>
  );
}

export default Searchbar