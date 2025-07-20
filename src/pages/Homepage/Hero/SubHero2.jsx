import React from "react";
import bg2 from "../../../assets/heroBg2.png";
import GetSecuredNow from "../components/GetSecuredNow";

const SubHero2 = () => {
  return (
    <div className="relative w-[100vw] h-screen font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/35 z-10"></div>
      <div
        style={{ backgroundImage: `url(${bg2})` }}
        className="absolute inset-0 z-0 bg-cover bg-no-repeat  flex items-center justify-center"
      ></div>

      {/* Content */}
      <div className="relative z-20 top-1/2 text-[#fdfdfdd4] px-22 flex flex-col items-start gap-4 w-1/2">
        <h1 className="text-5xl ">
          Secure your future with as little as <span className="text-[#FF7043]">₦500/wk</span>
        </h1>
        <h3>
          You don’t have to break a bank to get insured! With InsureLink, you can be secured with what you can afford.
        </h3>
        <div className="flex gap-4 mt-4">
          <GetSecuredNow />
          <button className="hover:underline hover:scale-105 p-5">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHero2;
