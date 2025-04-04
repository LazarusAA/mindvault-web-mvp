"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Sparkles, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PremiumInsights() {
  const router = useRouter()
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    setHeaderVisible(true)
    const timer = setTimeout(() => {
      setContentVisible(true)
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

      {/* Premium Insights Title */}
      <div
        className={`bg-gradient-to-br from-[#285e61] to-[#234e52] pt-4 pb-12 px-4 text-center shadow-xl rounded-b-[40px] mb-10 transition-all duration-1000 ${
          headerVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center mt-6">
          <div className="text-[#f56565] mb-4 animate-pulse">
            <Sparkles size={48} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Premium Insights</h1>

          {/* Premium Title Box */}
          <div className="bg-[#2c7a7b]/50 backdrop-blur-sm rounded-xl p-4 w-4/5 max-w-xs mx-auto mb-6 border border-[#4fd1c5]/20 shadow-lg">
            <h2 className="text-3xl font-bold text-white">Deep Analysis</h2>
          </div>

          <p className="text-[#e6fffa] text-lg max-w-md mx-auto">
            Discover your unique psychological profile through advanced AI analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full overflow-y-auto">
        <div className={`transition-all duration-1000 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Premium Content Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#4fd1c5]/20">
            <div className="prose prose-lg max-w-none">
              {/* Gemini API Response will be rendered here */}
              <div className="text-gray-700 space-y-4">
                <p className="text-xl leading-relaxed">
                  Your premium insights will appear here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for premium effects */}
      <style jsx global>{`
        .prose {
          max-width: 65ch;
          color: #2d3748;
        }
        
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
        }
        
        .prose-lg {
          font-size: 1.125rem;
          line-height: 1.7777778;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  )
} 