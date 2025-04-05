import React, { useState, useEffect } from "react";

const MuteButton = ({ hasStarted }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [barMultipliers, setBarMultipliers] = useState([1, 1, 1]);

  const toggleMute = () => {
    if (!hasStarted) return;
    setIsMuted((prev) => !prev);
  };

  // Simulate amplitude changes
  useEffect(() => {
    if (!hasStarted || isMuted) {
      setAmplitude(0.1);
      return;
    }

    const interval = setInterval(() => {
      const randomAmplitude = Math.random();
      setAmplitude(randomAmplitude);
    }, 100);

    return () => clearInterval(interval);
  }, [isMuted, hasStarted]);

  // Simulate bar movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasStarted || isMuted) {
        setBarMultipliers([1, 1, 1]);
      } else {
        setBarMultipliers([
          0.3 + Math.random() * 0.5,
          0.7 + Math.random() * 0.3,
          0.3 + Math.random() * 0.5,
        ]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isMuted, hasStarted]);

  return (
    <div className="fixed bottom-10 right-10 bg-(--mute-bg-light) rounded-full flex">
      {/* Bars */}
      <div className="flex items-center justify-end pr-3.5 pl-5">
        <div className="flex space-x-[3px] items-center h-6">
          {barMultipliers.map((multiplier, i) => (
            <div
              key={i}
              className="w-[3px] bg-white rounded-full transition-transform transition-all duration-250"
              style={{
                transform: `scaleY(${amplitude * multiplier})`,
                transformOrigin: "center",
                height: "28px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        className="cursor-pointer w-12 h-12 rounded-full bg-(--mute-bg) text-white flex items-center justify-center shadow-md hover:bg-(--red) hover:scale-102 transition-all active:scale-95 z-50"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        disabled={!hasStarted}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MuteButton;
