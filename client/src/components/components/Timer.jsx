import React, { useState, useEffect } from "react";

function Timer({ hasStarted, handleDoneInterview }) {
  const [time, setTime] = useState(1800);

  useEffect(() => {
    if (time == 0) {
      handleDoneInterview();
    }
  }, [time])

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-(--hero) text-white text-xs py-1 px-3 w-13 flex justify-center rounded-full font-semibold">
      {formatTime(time)}
    </div>
  );
}

export default Timer;
