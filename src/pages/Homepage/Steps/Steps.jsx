import SubSteps from "./SubSteps";
import React from "react";
import Title from "../components/Title";
import GetSecuredNow from "../components/GetSecuredNow";

const stepsData = [
  {
    id: 1,
    title: "Choose what to protect",
    description:
      "Pick what you want to protect from business, cars, home, health or more.",
  },
  {
    id: 2,
    title: "See your price",
    description:
      "Get instant quote after comparing options from personalized recommendations.",
  },
  {
    id: 3,
    title: "Pay easily",
    description:
      "Pay with card, bank transfer or automate weekly transfers to ease stress.",
  },
  {
    id: 4,
    title: "Relax. You’re secured",
    description:
      "If something happens, file a claim via WhatsApp, web, or app and get paid fast.",
  },
];

const Steps = () => {
  return (
    <div className="bg-[#FF70430A] p-22 font-poppins">
      <div>
        <Title text="Get secured in 4 easy steps" textColor="text-[#453939]" />
      </div>
      <div className="flex items-start justify-center gap-5 ">
        {stepsData.map((step) => {
          const { id, title, description } = step;
          return <SubSteps id={id} title={title} description={description} />;
        })}
      </div>
      <div className="flex items-center justify-center mt-10">
        <GetSecuredNow />
      </div>
    </div>
  );
};

export default Steps;
