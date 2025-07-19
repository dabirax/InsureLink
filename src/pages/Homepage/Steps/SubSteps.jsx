import React from "react";

const SubSteps = ({ id, title, description }) => {
  return (
    <div key={id} className="p-5 flex flex-col items-center  gap-3 ">
      <h1 className="text-4xl bg-[#FF7043] rounded-full text-white font-bold h-20 w-20 flex items-center justify-center">
        {id}
      </h1>
      <h2 className="text-xl font-bold text-[#453939] text-center  ">
        {title}
      </h2>
      <p className="text-[#453939] text-sm">{description}</p>
    </div>
  );
};
export default SubSteps;
