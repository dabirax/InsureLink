import React from "react";
import logoImage from "../../../assets/InsureLink.jpg";
import  '../../../index.css'

const LeftSection = () => {
  return (
    <div className="flex-1 h-screen items-center justify-center bg-[#FF7043] bg-hexagon-pattern hidden lg:flex">
      <img
        src={logoImage}
        alt="InsureLink"
        className="w-40 h-20 object-cover rounded-3xl transition-opacity"
        onError={(e) => {
          console.error("Failed to load logo image");
          e.target.style.display = "none";
        }}
      />
    </div>
  );
};

export default LeftSection;
