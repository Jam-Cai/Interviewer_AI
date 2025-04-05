import React from "react";

function StartOverlay({ onStart }) {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <button
        onClick={onStart}
        className="bg-green-600 cursor-pointer px-5 py-3 rounded-full text-lg font-semibold text-white shadow-lg"
      >
        START INTERVIEW
      </button>
    </div>
  );
}

export default StartOverlay;
