"use client"

import { useState, useEffect } from "react"
import { Code, MessageSquare, Play } from 'lucide-react'

const InteractiveTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // auto rotates tabs every 8 seconds unless user is hovering
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 2 ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [isHovering])

  const tabs = [
    {
      id: 0,
      title: "Select Interview",
      description: "Solve LeetCode Questions Directly",
      icon: <Code className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500",
      videoSrc: "ScreenRecording1.mov",
    },
    {
      id: 1,
      title: "Discuss Highlighted Code",
      description: "Get AI feedback on your code",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      borderColor: "border-blue-500",
      videoSrc: "ScreenRecording2.mov",
    },
    {
      id: 2,
      title: "Compile Code",
      description: "Test your solutions instantly",
      icon: <Play className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      borderColor: "border-purple-500",
      videoSrc: "ScreenRecording3.mov",
    },
  ]

  return (
    <div
      className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-center mb-6">
        <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white`
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[450px] rounded-xl overflow-hidden">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${tabs[activeTab].color} rounded-xl opacity-50`}></div>

        <div className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 h-full">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeTab === tab.id ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative h-full w-full overflow-hidden">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={tab.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                  <div className={`px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm ${tab.textColor} border ${tab.borderColor}/30`}>
                    <div className="flex items-center gap-2">
                      {tab.icon}
                      <span className="font-medium">{tab.title}</span>
                    </div>
                  </div>
                  
                  <div className="text-white/80 text-sm bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                    {tab.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeTab === tab.id ? `bg-gradient-to-r ${tab.color} w-8` : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InteractiveTabs;