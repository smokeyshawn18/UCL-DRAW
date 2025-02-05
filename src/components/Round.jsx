import React from "react";
import UCLLOGO from "../assets/ucl-logo.webp";

const Round = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
          Road to Munich 24/25
        </h1>
        <img
          src={UCLLOGO}
          alt="UCL LOGO"
          className="w-50 h-30 rounded-xl mt-4"
        />
      </div>
    </>
  );
};

export default Round;
