import React from "react";

const Title = ({ text, textColor }) => {
  return (
    <div>
      <h1
        className={`text-3xl ${textColor} font-bold text-center py-12 bg-inherit`}
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;
