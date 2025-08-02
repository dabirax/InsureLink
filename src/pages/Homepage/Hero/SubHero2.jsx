import React from "react";
import bg2 from "../../../assets/heroBg2.png";
import GetSecuredNow from "../components/GetSecuredNow";

const SubHero2 = () => {
  return (
    <div className="relative w-[100vw] h-screen font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 z-10 bg-black/35"></div>
      <div
        style={{ backgroundImage: `url(${bg2})` }}
        className="absolute inset-0 z-0 flex items-center justify-center bg-no-repeat bg-cover"
      ></div>

      {/* Content */}
      <div className="relative z-20 top-1/3 text-[#fdfdfdd4] px-22 flex flex-col items-start gap-4 w-1/2">
        <h1 className="text-5xl ">
          Secure your future with as little as <span className="text-[#FF7043]">₦500/wk</span>
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

export default SubHero2;
