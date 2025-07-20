import GetSecuredNow from './components/GetSecuredNow';
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="font-poppins flex justify-between items-center p-4 fixed w-full z-100">
      <div className=" text-[#FF7043]">InsureLink</div>
      <div className="flex items-center gap-24">
        <div className="flex gap-2 text-[#fdfdfdd4]">
          <div>Home</div>
          <div>Business</div>
          <div>Auto</div>
          <div>Health</div>
          <div>About us</div>
        </div>
<GetSecuredNow     />
      </div>
    </div>
  );
};

export default Navbar;