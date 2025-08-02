import GetSecuredNow from './components/GetSecuredNow';
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed flex items-center justify-between w-full px-10 py-1 font-poppins z-100 bg-black/30">
      <div className=" text-[#FF7043] mix-blend-difference">InsureLink</div>
      <div className="flex items-center gap-24">
        <div className="flex gap-6 text-white mix-blend-difference">
          <Link to="/">Home</Link>
          <Link to="/business">Business</Link>
          <Link to="/auto">Auto</Link>
          <Link to="/health">Health</Link>
          <Link to="/about">About us</Link>
        </div>
        <GetSecuredNow />
      </div>
    </div>
  );
};

export default Navbar;