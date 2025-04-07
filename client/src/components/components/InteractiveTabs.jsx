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
      <div className="flex flex-2 flex-col justify-between w-full">
        <div onClick={() => setActiveTab(0)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 0 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Solve LeetCode Questions Directly</div>
        <div onClick={() => setActiveTab(1)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 1 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Compile Code</div>
        <div onClick={() => setActiveTab(2)} className={`transition-all duration-300 cursor-pointer h-full w-full border-r-1 border-b-1 border-white/10 flex justify-center items-center text-center px-3 ${activeTab === 2 ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-white/60'}`}>Discuss Highlighted Code</div>
      </div>
      <div className="flex flex-4 justify-center items-center px-3.5 py-3">
        <div className="rounded-md bg-white h-full w-full flex items-center justify-center text-black text-center">
          {activeTab === 0 && <div>LeetCode Problem Solving Interface</div>}
          {activeTab === 1 && <div>Code Compilation Panel</div>}
          {activeTab === 2 && <div>Code Discussion Area</div>}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTabs;