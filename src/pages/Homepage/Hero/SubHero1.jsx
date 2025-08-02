import React from "react";
import bg1 from "../../../assets/heroBg1.png";
import GetSecuredNow from "../components/GetSecuredNow";

const SubHero1 = () => {
  return (
    <div className="relative w-[100vw] h-screen font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 z-10 bg-black/35"></div>
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="absolute inset-0 z-0 flex items-center justify-center bg-bottom bg-no-repeat bg-cover"
      ></div>

      {/* Content */}
      <div className="relative z-20 top-1/3 text-[#fdfdfdd4] p-4 md:px-22 flex flex-col item-start md:items-start gap-4 md:w-1/2">
        <h1 className= "text-2xl md:text-5xl">
          Life happens but <span className="text-[#FF7043]">InsureLink</span> dey your back gidigbam!
        </h1>
        <h3>
          You don’t have to break a bank to get insured! With InsureLink, you can be secured with what you can afford.
        </h3>
        <div className="flex gap-4 mt-4">
          <GetSecuredNow />
          <button className="p-5 hover:underline hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHero1;
