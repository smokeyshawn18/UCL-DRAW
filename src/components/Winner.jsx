// src/components/Winner.jsx
import React from "react";

const Winner = ({ winner }) => {
  return (
    <div className="text-center mt-8">
      <h3 className="text-2xl font-bold text-yellow-400 mb-2">Winner</h3>
      <div className="flex items-center justify-center gap-4">
        <img
          src={winner.logo}
          alt={winner.name}
          className="w-16 h-16 object-contain md:w-24 md:h-24"
        />
        <span className="text-white text-xl md:text-2xl">{winner.name}</span>
      </div>
    </div>
  );
};

export default Winner;
