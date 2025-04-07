import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveTabs from '../components/InteractiveTabs';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation */}
      <div className="mt-7 border-1 border-white/10 mx-30 rounded-full flex justify-between items-center">

        <button onClick={() => navigate("/")}>
          <div className="flex items-center ml-5 py-2 cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <div className="text-white text-xl font-semibold">MeetCode</div>
          </div>
        </button>
        <div className="my-2">
          <button 
              className="mr-3 h-full w-28 border-3 border-(--hero) rounded-full bg-(--hero) text-white transition duration-300 cursor-pointer"
              onClick={() => navigate("/interview")}
            >
              Try It Now
          </button>
        </div>
        
      </div>
      
      
      {/* Main Content */}
      <div className="h-[80vh] w-full px-8 md:px-16 lg:px-40 flex flex-col md:flex-row items-center justify-center py-12">
        <div className="w-full md:w-1/2 lg:w-[37vw] flex flex-col gap-4 mb-8 md:mb-0"> 
          <h1 className="text-3xl md:text-4xl lg:text-[38px] leading-tight font-black">
            <span className="text-white bg-(--hero) px-2">MeetCode:</span> Your New Favourite LeetCode Preparation Tool
          </h1> 
          <p className="text-[16px] text-white/60">
            Built to enable Software Engineers around the world to excel at their next technical rounds with a Voice-AI LeetCode interview tool.
          </p> 

          <div className="flex flex-row items-center">
            <h1 className="text-[20px] font-semibold">Contributors:</h1>
            <a target="_blank" href="https://www.linkedin.com/in/aayush-grover-06"><img src="AayushHeadshot.png" className="w-6 h-6 rounded-full ml-3"></img></a>
            <a target="_blank" href="https://www.linkedin.com/in/jam-cai"><img src="JamesHeadshot.jpeg" className="w-6 h-6 rounded-full ml-3"></img></a>
            <a target="_blank" href="https://www.linkedin.com/in/-larrypan"><img src="LarryHeadshot.jpg" className="w-6 h-6 rounded-full ml-3"></img></a>
          </div>

          <button 
            className="pl-4 group mt-2 py-1 h-10 w-37 inline-flex border-3 border-(--hero) rounded-full bg-(--hero) text-white text-md font-bold transition duration-300 cursor-pointer items-center gap-1" 
            onClick={() => navigate("/interview")}
          > 
            Try It Now 
            <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1.5">
              <img src="rarrow.png" className="w-3" />
            </span> 
          </button> 
        </div>
        <InteractiveTabs />
      </div>

    </div>
  )
}

export default LandingPage