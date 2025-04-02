"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Globe, Briefcase, Users, Award, Home, FileText, Settings, Trophy, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

// Define types for our perspectives
interface Perspective {
  id: string
  title: string
  description: string
  scale: {
    left: string
    right: string
    value: number // 0-100
    label: string
    color: string
  }
  icon: keyof typeof iconMap
}

// Icon mapping
const iconMap = {
  Briefcase,
  Globe,
  Users,
  Award,
}

// Mock data for perspectives
const perspectives: Perspective[] = [
  {
    id: "economic",
    title: "Economic Perspective",
    description:
      "You favor a balanced approach between economic equality and market freedom, appreciating the importance of both fairness and efficiency in the economy.",
    scale: {
      left: "Equality",
      right: "Markets",
      value: 45,
      label: "Neutral",
      color: "#4fd1c5",
    },
    icon: "Briefcase",
  },
  {
    id: "civil",
    title: "Civil Perspective",
    description:
      "You lean toward authority, emphasizing the importance of rules and social stability. You believe structure is crucial for collective well-being.",
    scale: {
      left: "Liberty",
      right: "Globe",
      value: 35,
      label: "Moderate",
      color: "#38b2ac",
    },
    icon: "Users",
  },
  {
    id: "societal",
    title: "Societal Perspective",
    description:
      "You value traditional social structures while recognizing the need for some progressive reforms. You seek balance between preserving cultural heritage and embracing necessary social changes.",
    scale: {
      left: "Traditional",
      right: "Progressive",
      value: 55,
      label: "Balanced",
      color: "#4fd1c5",
    },
    icon: "Users",
  },
  {
    id: "diplomatic",
    title: "Diplomatic Perspective",
    description:
      "You favor a balanced approach between national sovereignty and global cooperation, aiming to preserve independence while addressing global challenges together.",
    scale: {
      left: "Nation",
      right: "Global",
      value: 50,
      label: "Balanced",
      color: "#38b2ac",
    },
    icon: "Globe",
  },
]

export default function AdvancedInsights() {
  const router = useRouter()
  // State for animations
  const [animatedPerspectives, setAnimatedPerspectives] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  // Animate perspectives one by one
  useEffect(() => {
    setHeaderVisible(true)

    const timer = setTimeout(() => {
      perspectives.forEach((perspective, index) => {
        setTimeout(() => {
          setAnimatedPerspectives((prev) => [...prev, perspective.id])
        }, index * 300)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f2e9e4] to-[#e6e6e6] overflow-y-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#234e52] to-[#285e61] text-white p-4 flex items-center justify-between relative shadow-lg sticky top-0 z-50">
        <button 
          onClick={() => router.push("/insights")}
          className="p-2 rounded-full hover:bg-[#2c7a7b]/50 active:bg-[#2c7a7b]/70 transition-colors transform active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
      </header>

      {/*Advanced Insights Title */}
      <div
        className={`bg-gradient-to-br from-[#285e61] to-[#234e52] pt-4 pb-12 px-4 text-center shadow-xl rounded-b-[40px] mb-10 transition-all duration-1000 ${
          headerVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center mt-6">
          <div className="text-[#f56565] mb-4 animate-pulse">
            <BookOpen size={48} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Advanced Insights</h1>

          {/* Centrist Title Box */}
          <div className="bg-[#2c7a7b]/50 backdrop-blur-sm rounded-xl p-4 w-4/5 max-w-xs mx-auto mb-6 border border-[#4fd1c5]/20 shadow-lg">
            <h2 className="text-3xl font-bold text-white">Centrist</h2>
          </div>

          <p className="text-[#e6fffa] text-lg max-w-md mx-auto">
            Explore how your values align across key ideological dimensions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full overflow-y-auto">
        {/* Perspectives */}
        <div className="space-y-8 md:space-y-10">
          {perspectives.map((perspective, index) => {
            const Icon = iconMap[perspective.icon]
            const isAnimated = animatedPerspectives.includes(perspective.id)
            const isHovered = hoveredCard === perspective.id

            return (
              <div
                key={perspective.id}
                className={`rounded-3xl overflow-hidden shadow-xl transform transition-all duration-500 ${
                  isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${isHovered ? "scale-[1.02]" : "scale-100"}`}
                onMouseEnter={() => setHoveredCard(perspective.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#285e61] to-[#234e52] p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-[#234e52] p-3 rounded-full shadow-lg border border-[#4fd1c5]/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1c5]/20 to-transparent"></div>
                      <Icon size={28} className="text-[#4fd1c5] relative z-10 drop-shadow-md" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{perspective.title}</h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="bg-gradient-to-br from-[#285e61] to-[#234e52] p-6 border-t border-[#4fd1c5]/10">
                  {/* Description Quote */}
                  <div className="relative mb-8 bg-[#234e52]/70 p-5 rounded-xl backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1c5]/5 to-transparent rounded-xl"></div>
                    <div className="absolute -left-2 -top-2 text-[#4fd1c5] opacity-30 text-4xl font-serif">"</div>
                    <p className="text-lg italic leading-relaxed text-[#e6fffa] relative z-10 pl-4">
                      {perspective.description}
                    </p>
                    <div className="absolute -right-2 -bottom-2 text-[#4fd1c5] opacity-30 text-4xl font-serif">"</div>
                  </div>

                  {/* Scale Labels */}
                  <div className="flex justify-between items-center mb-3 px-1">
                    <div className="flex items-center">
                      <div className="h-4 w-4 bg-[#f56565] rounded-full mr-2 shadow-glow-red"></div>
                      <span className="text-lg font-medium text-white">{perspective.scale.left}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-white">{perspective.scale.right}</span>
                      <div className="h-4 w-4 bg-[#e2e8f0] rounded-full ml-2"></div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-6 bg-[#1a3e42] rounded-full overflow-hidden mb-6 shadow-inner relative">
                    <div className="absolute inset-0 bg-[#4fd1c5]/5 rounded-full"></div>
                    <div
                      className={`h-full bg-gradient-to-r from-[#f56565] to-[#fc8181] rounded-full transition-all duration-1500 ease-out relative z-10 ${
                        isAnimated ? "" : "w-0"
                      }`}
                      style={{ width: isAnimated ? `${perspective.scale.value}%` : "0%" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                    </div>
                  </div>

                  {/* Label Button */}
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-[#4fd1c5] to-[#2dd4bf] text-[#285e61] px-10 py-3 rounded-full font-bold text-lg shadow-lg transform transition-transform hover:scale-110 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
                      <span className="relative z-10">{perspective.scale.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Share Button */}
        <div className="flex justify-center mt-8 mb-12">
          <button className="bg-gradient-to-r from-[#E36C59] to-[#d15a48] text-white py-4 px-12 rounded-full font-bold text-xl shadow-lg transform transition-all hover:scale-105 active:scale-95 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
            <span className="relative z-10">Share your results</span>
          </button>
        </div>
      </main>

      {/* Custom CSS for glow effects */}
      <style jsx global>{`
        .shadow-glow-red {
          box-shadow: 0 0 8px 2px rgba(245, 101, 101, 0.5);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

