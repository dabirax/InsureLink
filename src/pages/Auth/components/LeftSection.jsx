import React from "react";
import logoImage from "../../../assets/InsureLink.jpg";
import  '../../../index.css'

const LeftSection = () => {
  return (
    <div className="fixed h-screen md:w-1/2 items-center justify-center flex-1 hidden overflow-hidden lg:flex bg-[#FF7043] bg-hexagon-pattern">
        <img
          src={logoImage}
          alt="InsureLink"
          className="object-cover w-40 h-20 transition-opacity rounded-3xl"
        />
    </div>
  );
};

export default LeftSection;
