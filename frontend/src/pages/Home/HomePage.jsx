import React from "react";
import bg from '@/assets/images/bg.png'

const user = { name: "Sunggin Kim" };

const HomePage = () => {
  return (
    <div className="bg-[#F5F6FA] w-full h-full md:p-8 p-3">
      <div className="flex flex-col flex-1 gap-2">
        <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold">{`Welcome, ${user.name}!`}</h1>
        <div className="w-fit h-fit relative">
          <img className="w-full md:rounded-lg rounded-md" src={bg} alt="background image" />
          <div className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 flex flex-col lg:gap-5 md:gap-3">
            <h2 className="lg:text-5xl md:text-3xl sm:text-xl font-bold text-white">
              Re.plan your <br/> kitchen routine
            </h2>
            <h3 className="lg:text-xl md:text-md text-[10px] text-white">
              Keep all your favorite recipes in one place
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
