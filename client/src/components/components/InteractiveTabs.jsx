import React, { useState } from 'react';

const InteractiveTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    "Solve LeetCode Questions Directly",
    "Compile Code",
    "Discuss Highlighted Code"
  ];

  return (
    <div className="ml-20 border-1 border-white/10 h-95 w-2/3 flex-grow rounded-lg flex flex-row">
      <div className="flex flex-2 flex-col justify-between w-full text-md">
        <div onClick={() => setActiveTab(0)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 0 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Select <br></br>Interview</div>
        <div onClick={() => setActiveTab(1)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 1 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Discuss <br></br>Highlighted Code</div>
        <div onClick={() => setActiveTab(2)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 2 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Compile <br></br>Code</div>
      </div>
      <div className="flex flex-6 justify-center items-center px-3.5 py-3">
        <div className="rounded-md h-full w-full flex text-black text-center">
          {activeTab === 0 && (
            <div className="flex">
              <video 
                className="w-full h-full object-cover rounded-lg" 
                src="ScreenRecording1.mov" 
                autoPlay 
                muted 
                controls={false} 
                onEnded={() => console.log("Video ended.")}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <video 
                className="w-full h-full object-cover rounded-lg" 
                src="ScreenRecording2.mov" 
                autoPlay 
                muted 
                controls={false} 
                onEnded={() => console.log("Video ended.")}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <video 
                className="w-full h-full object-cover rounded-lg" 
                src="ScreenRecording3.mov" 
                autoPlay 
                muted 
                controls={false} 
                onEnded={() => console.log("Video ended.")}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTabs;
