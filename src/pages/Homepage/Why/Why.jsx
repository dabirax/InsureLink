import SubWhy from "./SubWhy";
import Title from "../components/Title";
import React from "react";
import why1 from "../../../assets/why1.png";
import why2 from "../../../assets/why2.png";
import why3 from "../../../assets/why3.png";
import why4 from "../../../assets/why4.png";

const data = [
  {
    id: 1,
    title: "Affordable Insurance",
    description:
      "Starting from 500/week, secure yourself and loved ones without breaking a bank.",
    img: why1,
  },
  {
    id: 2,
    title: "Fast Claims. No Stories.",
    description:
      "Get paid in hours or days, not weeks. No endless paperwork, no stress.",
    img: why2,
  },
  {
    id: 3,
    title: "No Language Barrier",
    description:
      "Available in Pidgin, Yoruba, Hausa and Igbo. Accessible on WhatsApp, web, or mobile.",
    img: why3,
  },
  {
    id: 4,
    title: "Personalized AI Guidance",
    description:
      "Get personalized insurance recommendations based on your unique needs and budget.",
    img: why4,
  },
];

const Why = () => {
  return (
    <div className="p-22 font-poppins ">
      {/* Title */}
      <div>
        <Title
          text="Why InsureLink is the best for you"
          textColor="text-[#453939]"
        />
      </div>

      {/* Content */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((item) => {
          const { id, title, description, img } = item;
          return (
            <SubWhy id={id} img={img} title={title} description={description} />
          );
        })}
      </div>
    </div>
  );
};

export default Why;
