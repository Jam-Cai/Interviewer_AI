import React, { useState, useEffect, useRef } from "react";

const MuteButton = ({ hasStarted, averageVolume, startRecording, stopRecording, status, isRecording }) => {
  const [amplitude, setAmplitude] = useState(0);
  const [barMultipliers, setBarMultipliers] = useState([1, 1, 1]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText] = useState("Recording...");
  const isKeyPressedRef = useRef(false);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Add hover handlers
  const handleMouseMove = (e) => {
    setHoverPosition({
      x: e.clientX + 15,
      y: e.clientY + 15
    });
  };
  

  const statusRef = useRef(status);

  // Keep the ref updated with the latest status
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const turnOnMic = async() => {
    try {
      await startRecording(); 
    } catch (err) {
      console.error("Error toggling recording:", err);
    }
  }

  const turnOffMic = async() => {
    try {
      await stopRecording(); 
    } catch (err) {
      console.error("Error toggling recording:", err);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
    
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
    
        if (statusRef.current === "Ready to record" && !isKeyPressedRef.current && !isRecording) {
          isKeyPressedRef.current = true;
          setShowOverlay(true);
          turnOnMic();
        }
      }
    };
  
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "meta" || e.key.toLowerCase() === "control") {
        e.preventDefault();
        if (isKeyPressedRef.current && isRecording) {
          isKeyPressedRef.current = false;
          setShowOverlay(false);
          turnOffMic();
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording, averageVolume, hasStarted]);

  // Handle amplitude based on averageVolume
  useEffect(() => {
    if (!hasStarted || !isRecording) {
      setAmplitude(0.1);
      return;
    }

    const clampedVolume = Math.min(averageVolume, 60);
    const normalized = Math.max(Math.min(clampedVolume / 30, 1), 0.2);
    setAmplitude(normalized);
  }, [isRecording, hasStarted, averageVolume]);

  // Bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasStarted || !isRecording) {
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
  }, [isRecording, hasStarted]);

  return (
    <>

      {isHovered && !showOverlay && (
        <div 
          className="fixed z-50 px-3 py-2 text-sm text-black bg-white rounded-sm pointer-events-none"
          style={{
            left: `${hoverPosition.x-215}px`,
            top: `${hoverPosition.y -25}px`,
            transform: 'translateY(-50%)'
          }}
        >
          Hold CTRL / ⌘CMD + D 
          <br></br>to speak
          <div className="absolute w-2 h-2 transform rotate-45 -right-1 top-[70%] -translate-y-1/2 bg-white" />
        </div>
      )}

      
      {/* Mute Overlay */}
      {showOverlay && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-black/30 text-white px-6 py-3 rounded-xl text-xl font-semibold 
                        opacity-90 fade-out pointer-events-none z-50">
          {overlayText}
        </div>
      )}

      {/* Processing Overlay */}
      {status === "Processing audio..." && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-black/30 text-white px-6 py-3 rounded-xl text-xl font-semibold 
                        opacity-90 pointer-events-none z-50">
          The Interviewer is Thinking...
        </div>
      )}

      {/* Mute Button + Bars */}
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
          className={`cursor-pointer w-12 h-12 rounded-full bg-(--mute-bg) text-white flex items-center justify-center shadow-md transition-all z-50 ${
            isRecording 
              ? 'scale-105 bg-green-500 shadow-lg shadow-green-500/50'
              : 'bg-(--mute-bg)'
          }`}
          aria-label={!isRecording ? "Unmute" : "Mute"}
          disabled={!hasStarted}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {!isRecording ? (
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

    </>
  );
};

export default MuteButton;
