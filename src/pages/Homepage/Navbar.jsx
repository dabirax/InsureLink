import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="font-poppins flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-[#FF7043]">InsureLink</Link>
      <div className="flex items-center gap-24">
        <div className="flex gap-2">
          <div>Home</div>
          <div>Business</div>
          <div>Auto</div>
          <div>Health</div>
          <div>About us</div>
        </div>
        <Link to="/signup">
          <button className="bg-[#FF7043] rounded-sm p-5 hover:scale-105">
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;