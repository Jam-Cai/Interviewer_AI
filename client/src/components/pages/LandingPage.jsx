"use client"
import { useNavigate } from "react-router-dom"
import FeatureShowcase from "../components/FeatureShowcase"
import InteractiveTabs from "../components/InteractiveTabs"
import { ArrowRight, Github, Code, Sparkles, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

function LandingPage() {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for subtle gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      title: "Voice-Powered AI",
      description: "Speak your code and get real-time feedback from our AI assistant",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "LeetCode Integration",
      description: "Practice with real interview questions from LeetCode's database",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "Performance Analysis",
      description: "Get detailed feedback on your code's time and space complexity",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.1), rgba(124, 58, 237, 0.05), transparent 50%)`,
          transition: "background 0.5s ease",
        }}
      />

      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-r from-purple-700 to-violet-900 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-r from-emerald-600 to-teal-700 rounded-full blur-[120px]" />
      </div>

      <header className="w-full py-6 px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 transition-all hover:scale-105 group"
          >
            <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-400 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
              <Code className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              MeetCode
            </span>
          </button>

          <a
            href="https://github.com/Jam-Cai/MeetCode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-full transition-all border border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 group"
          >
            <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </header>

      <section className="relative z-10 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm w-fit">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white/80">AI-Powered Interview Prep</span>
                </div>

                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    MeetCode:
                  </span>{" "}
                  Your New Favourite LeetCode Preparation Tool
                </h1>

                <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                  Built to enable Software Engineers around the world to excel at their next technical rounds with a
                  Voice-AI LeetCode interview tool.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-medium flex items-center gap-2">
                    <span className="h-px w-5 bg-gradient-to-r from-emerald-400 to-teal-500"></span>
                    Contributors
                  </h2>
                  <div className="flex items-center -space-x-3">
                    <a
                      href="https://www.linkedin.com/in/aayush-grover-06"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-110 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                      <img
                        src="AayushHeadshot.png"
                        alt="Aayush Grover"
                        className="relative w-12 h-12 rounded-full border-2 border-emerald-400 object-cover"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jam-cai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-110 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                      <img
                        src="JamesHeadshot.jpeg"
                        alt="James Cai"
                        className="relative w-12 h-12 rounded-full border-2 border-emerald-400 object-cover"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/-larrypan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-110 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                      <img
                        src="LarryHeadshot.jpg"
                        alt="Larry Pan"
                        className="relative w-12 h-12 rounded-full border-2 border-emerald-400 object-cover"
                      />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/interview")}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-medium py-3.5 px-8 rounded-full transition-all w-fit group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  <span className="font-bold">Try It Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black to-black/80">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              MeetCode combines the best of LeetCode with AI-powered interview preparation to help you ace your next
              technical interview.
            </p>
          </div>

          <FeatureShowcase />
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black/80 to-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Try It Yourself
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience the intuitive interface and powerful features that make MeetCode the ultimate LeetCode
              companion.
            </p>
          </div>

          <InteractiveTabs />
        </div>
      </section>

      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-400 p-2 rounded-lg">
              <Code className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">MeetCode</span>
          </div>

          <div className="text-white/50 text-sm">© 2023 MeetCode. All rights reserved.</div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

