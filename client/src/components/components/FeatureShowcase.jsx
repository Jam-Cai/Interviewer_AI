"use client"

import { useState, useEffect, useRef } from "react"
import { Code, MessageSquare, Play, Terminal, Zap } from 'lucide-react'

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const showcaseRef = useRef(null)
  
  // Auto-rotate features every 6 seconds unless user is hovering
  useEffect(() => {
    if (isHovering) return
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === 2 ? 0 : prev + 1))
    }, 6000)
    
    return () => clearInterval(interval)
  }, [isHovering])

  const features = [
    { 
      id: 0, 
      title: "Select Interview", 
      description: "Choose from a variety of LeetCode problems to practice",
      icon: <Code className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    { 
      id: 1, 
      title: "AI Code Feedback", 
      description: "Get instant feedback on your code quality and approach",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    { 
      id: 2, 
      title: "Test & Submit", 
      description: "Run your code against test cases and submit solutions",
      icon: <Play className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
  ]

  return (
    <div 
      ref={showcaseRef}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-center mb-8">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                activeFeature === feature.id
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                  : "text-white/70 hover:text-white"
              }`}
            >
              <div className={`transition-all duration-300 ${activeFeature === feature.id ? "scale-110" : ""}`}>
                {feature.icon}
              </div>
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${features[activeFeature].color} rounded-2xl blur opacity-30 animate-pulse transition-colors duration-500`}></div>
        
        <div className="relative bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 h-full">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeFeature === feature.id ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {feature.id === 0 && (
                <div className="h-full flex flex-col">
                  <div className="bg-black/60 border-b border-white/10 p-4 flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-sm">Select Interview</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 font-mono text-sm overflow-hidden">
                    <div className="flex items-center text-emerald-400 mb-4">
                      <span className="mr-2">$</span>
                      <span className="typing-animation">meetcode --select-problem</span>
                    </div>
                    
                    <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-white mb-2 font-semibold">Available Problems:</div>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-semibold text-xs">Easy</div>
                          <div>
                            <div className="text-white group-hover:text-emerald-400 transition-colors">Two Sum</div>
                            <div className="text-white/50 text-xs">Array, Hash Table</div>
                          </div>
                          <div className="ml-auto">
                            <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">Select</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-semibold text-xs">Med</div>
                          <div>
                            <div className="text-white group-hover:text-emerald-400 transition-colors">Add Two Numbers</div>
                            <div className="text-white/50 text-xs">Linked List, Math</div>
                          </div>
                          <div className="ml-auto">
                            <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">Select</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-semibold text-xs">Hard</div>
                          <div>
                            <div className="text-white group-hover:text-emerald-400 transition-colors">Median of Two Sorted Arrays</div>
                            <div className="text-white/50 text-xs">Array, Binary Search</div>
                          </div>
                          <div className="ml-auto">
                            <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">Select</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center text-white/70">
                      <span className="mr-2">$</span>
                      <span className="typing-animation-cursor">_</span>
                    </div>
                  </div>
                </div>
              )}
              
              {feature.id === 1 && (
                <div className="h-full flex flex-col">
                  <div className="bg-black/60 border-b border-white/10 p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-mono text-sm">AI Feedback</span>
                    </div>
                    <div className="text-white/40 text-sm">two_sum.py</div>
                  </div>
                  
                  <div className="flex-1 flex">
                    <div className="w-1/2 border-r border-white/10 p-4 font-mono text-sm overflow-hidden bg-black/40">
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">1</div>
                        <div><span className="text-purple-400">def</span> <span className="text-cyan-400">two_sum</span><span className="text-white">(</span><span className="text-orange-300">nums</span>, <span className="text-orange-300">target</span><span className="text-white">):</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">2</div>
                        <div><span className="text-white/80">    </span><span className="text-green-400"># Brute force approach</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">3</div>
                        <div><span className="text-white/80">    </span><span className="text-purple-400">for</span> <span className="text-cyan-300">i</span> <span className="text-purple-400">in</span> <span className="text-cyan-400">range</span><span className="text-white">(</span><span className="text-cyan-400">len</span><span className="text-white">(</span><span className="text-orange-300">nums</span><span className="text-white">)):</span></div>
                      </div>
                      <div className="flex bg-blue-500/10">
                        <div className="text-white/30 w-8 text-right pr-4">4</div>
                        <div><span className="text-white/80">        </span><span className="text-purple-400">for</span> <span className="text-cyan-300">j</span> <span className="text-purple-400">in</span> <span className="text-cyan-400">range</span><span className="text-white">(</span><span className="text-cyan-300">i</span> <span className="text-white">+</span> <span className="text-green-400">1</span>, <span className="text-cyan-400">len</span><span className="text-white">(</span><span className="text-orange-300">nums</span><span className="text-white">)):</span></div>
                      </div>
                      <div className="flex bg-blue-500/10">
                        <div className="text-white/30 w-8 text-right pr-4">5</div>
                        <div><span className="text-white/80">            </span><span className="text-purple-400">if</span> <span className="text-orange-300">nums</span><span className="text-white">[</span><span className="text-cyan-300">i</span><span className="text-white">] + </span><span className="text-orange-300">nums</span><span className="text-white">[</span><span className="text-cyan-300">j</span><span className="text-white">] == </span><span className="text-orange-300">target</span><span className="text-white">:</span></div>
                      </div>
                      <div className="flex bg-blue-500/10">
                        <div className="text-white/30 w-8 text-right pr-4">6</div>
                        <div><span className="text-white/80">                </span><span className="text-purple-400">return</span> <span className="text-white">[</span><span className="text-cyan-300">i</span>, <span className="text-cyan-300">j</span><span className="text-white">]</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">7</div>
                        <div><span className="text-white/80">    </span><span className="text-purple-400">return</span> <span className="text-white">[]</span></div>
                      </div>
                      <div className="flex mt-4">
                        <div className="text-white/30 w-8 text-right pr-4">8</div>
                        <div><span className="text-white/80">    </span><span className="text-green-400"># Time Complexity: O(n²)</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">9</div>
                        <div><span className="text-white/80">    </span><span className="text-green-400"># Space Complexity: O(1)</span></div>
                      </div>
                    </div>
                    
                    <div className="w-1/2 p-4 bg-black/60 overflow-hidden">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                        <div className="text-blue-400 font-medium mb-1">Performance Issue</div>
                        <p className="text-white/80 text-sm">The highlighted code uses a nested loop approach with O(n²) time complexity. This can be inefficient for large input arrays.</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
                        <div className="text-white font-medium mb-1">Suggested Improvement</div>
                        <p className="text-white/80 text-sm mb-2">Consider using a hash map to achieve O(n) time complexity:</p>
                        <div className="bg-black/30 p-2 rounded font-mono text-xs">
                          <div><span className="text-purple-400">def</span> <span className="text-cyan-400">two_sum</span><span className="text-white">(</span><span className="text-orange-300">nums</span>, <span className="text-orange-300">target</span><span className="text-white">):</span></div>
                          <div><span className="text-white/80">    </span><span className="text-orange-300">num_map</span> <span className="text-white">=</span> <span className="text-white">{}</span></div>
                          <div><span className="text-white/80">    </span><span className="text-purple-400">for</span> <span className="text-cyan-300">i</span>, <span className="text-cyan-300">num</span> <span className="text-purple-400">in</span> <span className="text-cyan-400">enumerate</span><span className="text-white">(</span><span className="text-orange-300">nums</span><span className="text-white">):</span></div>
                          <div><span className="text-white/80">        </span><span className="text-orange-300">complement</span> <span className="text-white">=</span> <span className="text-orange-300">target</span> <span className="text-white">-</span> <span className="text-orange-300">num</span></div>
                          <div><span className="text-white/80">        </span><span className="text-purple-400">if</span> <span className="text-orange-300">complement</span> <span className="text-purple-400">in</span> <span className="text-orange-300">num_map</span><span className="text-white">:</span></div>
                          <div><span className="text-white/80">            </span><span className="text-purple-400">return</span> <span className="text-white">[</span><span className="text-orange-300">num_map</span><span className="text-white">[</span><span className="text-orange-300">complement</span><span className="text-white">], </span><span className="text-cyan-300">i</span><span className="text-white">]</span></div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <div className="text-emerald-400 font-medium mb-1">Interview Tip</div>
                        <p className="text-white/80 text-sm">Always discuss the time and space complexity trade-offs. The hash map approach uses O(n) extra space but improves time complexity to O(n).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {feature.id === 2 && (
                <div className="h-full flex flex-col">
                  <div className="bg-black/60 border-b border-white/10 p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30">
                      <Play className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 font-mono text-sm">Test & Submit</span>
                    </div>
                    <div className="text-white/40 text-sm">two_sum.py</div>
                  </div>
                  
                  <div className="flex-1 flex">
                    <div className="w-1/2 border-r border-white/10 p-4 font-mono text-sm overflow-hidden bg-black/40">
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">1</div>
                        <div><span className="text-purple-400">def</span> <span className="text-cyan-400">two_sum</span><span className="text-white">(</span><span className="text-orange-300">nums</span>, <span className="text-orange-300">target</span><span className="text-white">):</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">2</div>
                        <div><span className="text-white/80">    </span><span className="text-orange-300">num_map</span> <span className="text-white">=</span> <span className="text-white">{}</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">3</div>
                        <div><span className="text-white/80">    </span><span className="text-purple-400">for</span> <span className="text-cyan-300">i</span>, <span className="text-cyan-300">num</span> <span className="text-purple-400">in</span> <span className="text-cyan-400">enumerate</span><span className="text-white">(</span><span className="text-orange-300">nums</span><span className="text-white">):</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">4</div>
                        <div><span className="text-white/80">        </span><span className="text-orange-300">complement</span> <span className="text-white">=</span> <span className="text-orange-300">target</span> <span className="text-white">-</span> <span className="text-orange-300">num</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">5</div>
                        <div><span className="text-white/80">        </span><span className="text-purple-400">if</span> <span className="text-orange-300">complement</span> <span className="text-purple-400">in</span> <span className="text-orange-300">num_map</span><span className="text-white">:</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">6</div>
                        <div><span className="text-white/80">            </span><span className="text-purple-400">return</span> <span className="text-white">[</span><span className="text-orange-300">num_map</span><span className="text-white">[</span><span className="text-orange-300">complement</span><span className="text-white">], </span><span className="text-cyan-300">i</span><span className="text-white">]</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">7</div>
                        <div><span className="text-white/80">        </span><span className="text-orange-300">num_map</span><span className="text-white">[</span><span className="text-orange-300">num</span><span className="text-white">] =</span> <span className="text-cyan-300">i</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">8</div>
                        <div><span className="text-white/80">    </span><span className="text-purple-400">return</span> <span className="text-white">[]</span></div>
                      </div>
                      <div className="flex mt-4">
                        <div className="text-white/30 w-8 text-right pr-4">9</div>
                        <div><span className="text-green-400"># Test cases</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">10</div>
                        <div><span className="text-purple-400">print</span><span className="text-white">(</span><span className="text-cyan-400">two_sum</span><span className="text-white">([</span><span className="text-green-400">2</span>, <span className="text-green-400">7</span>, <span className="text-green-400">11</span>, <span className="text-green-400">15</span><span className="text-white">], </span><span className="text-green-400">9</span><span className="text-white">))</span></div>
                      </div>
                      <div className="flex">
                        <div className="text-white/30 w-8 text-right pr-4">11</div>
                        <div><span className="text-purple-400">print</span><span className="text-white">(</span><span className="text-cyan-400">two_sum</span><span className="text-white">([</span><span className="text-green-400">3</span>, <span className="text-green-400">2</span>, <span className="text-green-400">4</span><span className="text-white">], </span><span className="text-green-400">6</span><span className="text-white">))</span></div>
                      </div>
                    </div>
                    
                    <div className="w-1/2 p-4 bg-black/60 overflow-hidden flex flex-col">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-sm mb-4 flex-1">
                        <div className="text-white/60 mb-2">$ python two_sum.py</div>
                        <div className="text-white">[0, 1]</div>
                        <div className="text-white">[1, 2]</div>
                        <div className="text-white/60 mt-2">Process completed with exit code 0</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <div className="text-emerald-400 font-medium mb-1">All Tests Passed</div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Runtime:</span>
                            <span className="text-white">36 ms (faster than 92%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Memory:</span>
                            <span className="text-white">14.2 MB (better than 85%)</span>
                          </div>
                        </div>
                        
                        <button className="w-full p-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all flex items-center justify-center gap-2">
                          <Play className="w-4 h-4" />
                          <span>Submit Solution</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeFeature === feature.id
                  ? `bg-gradient-to-r ${feature.color} w-8`
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureShowcase
