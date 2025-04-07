import React from "react";
import { Loader2 } from "lucide-react";

function StartOverlay({ onStart, isLoading }) {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <button
        onClick={onStart}
        disabled={isLoading}
        className={`cursor-pointer bg-(--hero) px-5 py-3 rounded-full text-lg font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-opacity ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Starting...</span>
          </>
        ) : (
          "START INTERVIEW"
        )}
      </button>
    </div>
  );
}

export default StartOverlay;
