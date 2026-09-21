"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Mic, Sparkles, Presentation, Check, ArrowUpRight, Zap } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.16V9.25a6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.49V8.52a8.28 8.28 0 0 0 4.76 1.5v-3.33a4.86 4.86 0 0 1-1-.001z" />
    </svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
    </svg>
  )
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function XTwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function TerraPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const dynamicWords = ["effortlessly", "naturally", "in flow", "with focus", "confidently"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [dynamicWords.length])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      {/* Fixed Header with Glassmorphism Effect */}
      <header className="fixed top-6 left-6 right-6 md:right-auto md:w-auto z-[60] border border-white/40 backdrop-blur-xl bg-white/80 text-black shadow-xl rounded-full">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
              aria-label="Arova Home"
            >
              <img src="/logo.png" alt="Arova Logo" className="h-8 w-auto object-contain" />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("product")}
                className="text-sm text-zinc-800 hover:text-black font-medium transition-colors duration-300"
              >
                Product
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm text-zinc-800 hover:text-black font-medium transition-colors duration-300"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("early-access")}
                className="text-sm text-zinc-800 hover:text-black font-medium transition-colors duration-300"
              >
                Early Access
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-zinc-800 hover:text-black font-medium transition-colors duration-300"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("early-access")}
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-zinc-800 text-sm font-medium transition-all shadow-sm hover:shadow"
              >
                Join Early Access
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 text-black hover:bg-black/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 md:hidden"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("product")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("early-access")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Early Access
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              FAQ
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="product"
        ref={heroRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          backgroundImage: `url('/hero-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('/hero-image.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/70 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-6xl font-light transition-all duration-500 md:text-8xl ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Present <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-6xl font-light md:text-8xl" style={{ animationDelay: "90ms" }}>
                YOUR PRESENTATION UNDERSTANDS YOU.
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[620px] mx-auto mb-8 leading-relaxed stagger-reveal text-white"
              style={{ animationDelay: "180ms" }}
            >
              Arova is an AI presentation copilot that listens while you present, automatically moves to the relevant slide, and highlights what you're talking about.
            </p>
            <div className="stagger-reveal flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "270ms" }}>
              <Button onClick={() => scrollToSection("early-access")} className="glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white">
                Join Early Access
              </Button>
              <Button onClick={() => scrollToSection("how-it-works")} className="glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white">
                See How It Works
              </Button>
            </div>
            <p className="mt-4 text-xs text-[#A7ABB3] stagger-reveal" style={{ animationDelay: "320ms" }}>
              We're building Arova with our first group of presenters.
            </p>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <video
                  src="/hero-small.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Arova AI Presentation Copilot Interface"
                  className="object-cover dashboard-image w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Feature Showcase Marquee */}
      <section className="relative py-10 border-y border-white/10 bg-[#0B0C0F] overflow-hidden">
        <div className="w-full">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            AROVA MVP CORE CAPABILITIES
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {[
                { label: "Voice-Driven Navigation", desc: "Speech-to-slide flow", icon: Mic },
                { label: "Context-Aware Highlighting", desc: "Highlights data as you speak", icon: Sparkles },
                { label: "Hands-Free Presentation", desc: "No clickers or keyboards needed", icon: Presentation },
                { label: "AI Deck Understanding", desc: "Real-time semantic matching", icon: Zap },
                { label: "Dynamic Audience Focus", desc: "Directs visual attention seamlessly", icon: ArrowUpRight },
                { label: "Instant Speech Alignment", desc: "Sub-second slide response", icon: Check },
                { label: "Voice-Driven Navigation", desc: "Speech-to-slide flow", icon: Mic },
                { label: "Context-Aware Highlighting", desc: "Highlights data as you speak", icon: Sparkles },
                { label: "Hands-Free Presentation", desc: "No clickers or keyboards needed", icon: Presentation },
                { label: "AI Deck Understanding", desc: "Real-time semantic matching", icon: Zap },
                { label: "Dynamic Audience Focus", desc: "Directs visual attention seamlessly", icon: ArrowUpRight },
                { label: "Instant Speech Alignment", desc: "Sub-second slide response", icon: Check },
              ].map((feat, i) => (
                <div key={i} className="px-3 flex-shrink-0">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-pink-500/40 transition-all duration-300">
                    <div className="p-2 rounded-full bg-pink-500/10 text-pink-400">
                      <feat.icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-white tracking-tight">{feat.label}</span>
                      <span className="text-[11px] text-[#A7ABB3]">{feat.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="metrics" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            PRESENTING SHOULDN'T FEEL LIKE OPERATING A{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              COMPUTER
            </span>
          </h2>

          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[640px] mx-auto leading-relaxed">
            When you present, you're already thinking about what to say, how to explain it, where your audience is looking, and whether your message is landing. You shouldn't also have to think about which button to press.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "BREAKING YOUR FLOW", value: "FLOW", desc: "Reaching for the clicker or keyboard interrupts the natural rhythm of your presentation.", color: "pink" },
              { label: "LOOKING AWAY FROM AUDIENCE", value: "FOCUS", desc: "Finding the right slide or controlling your deck pulls your attention back to the screen.", color: "purple" },
              { label: "FINDING THE RIGHT CONTENT", value: "SLIDES", desc: "When your presentation contains dozens of slides, getting to the right information can become distracting.", color: "pink" },
              { label: "MANUALLY POINTING OUT", value: "VISUALS", desc: "You know exactly which number, chart, or section matters. Your audience may not.", color: "purple" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-16"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "pink" ? "bg-pink-400/60" : "bg-purple-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[40px] md:text-[54px] leading-none font-medium text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] leading-relaxed">{metric.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl md:text-2xl font-serif text-white">
              Your job is to present. Not to operate the presentation.
            </p>
          </div>
        </div>
      </section>

      {/* Technology / Feature Section */}
      <section id="how-it-works" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-white text-slate-900 border-y border-slate-200">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-pink-600 mb-6 flex items-center gap-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                AI TECHNOLOGY FOR PRESENTING
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance text-slate-900">
                BUILT AROUND THE MOMENT YOU{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  PRESENT
                </span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-12">
                Arova turns your presentation into an intelligent, responsive layer that understands what you're saying and reacts in real time.
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src={
                      [
                        "/automatic-speech.jpg",
                        "/context-aware-highlighting.jpg",
                        "/laser-clicker.png",
                        "/speech-context-matching.jpg",
                      ][selectedFeature] || "/placeholder.svg"
                    }
                    alt="Feature preview"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Automatic Slide Navigation",
                    desc: "SPEECH → CONTEXT → SLIDE. Stop reaching for the clicker every time your story moves forward.",
                    icon: Mic,
                    image: "/automatic-speech.jpg",
                  },
                  {
                    title: "Context-Aware Highlighting",
                    desc: "SPEECH → ELEMENT → FOCUS. Charts, numbers, diagrams, and sections brought into focus as you explain them.",
                    icon: Sparkles,
                    image: "/context-aware-highlighting.jpg",
                  },
                  {
                    title: "Stay in the Flow",
                    desc: "No clicker. No keyboard. No 'next slide please.' Just present and keep attention on your audience.",
                    icon: Presentation,
                    image: "/laser-clicker.png",
                  },
                  {
                    title: "Speech & Context Matching",
                    desc: "Arova matches your spoken words against the content and structure of your presentation deck in real time.",
                    icon: Zap,
                    image: "/speech-context-matching.jpg",
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-2xl py-5 overflow-hidden ${
                      selectedFeature === i
                        ? "border border-pink-500/40 bg-pink-50/50 shadow-md"
                        : "border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 hover:border-slate-300"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-pink-600" : "text-slate-400"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold mb-1 text-slate-900">{feature.title}</h3>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-pink-100">
                        <div className="h-full bg-pink-600 progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {[
                  {
                    title: "Automatic Slide Navigation",
                    image: "/automatic-speech.jpg",
                  },
                  {
                    title: "Context-Aware Highlighting",
                    image: "/context-aware-highlighting.jpg",
                  },
                  {
                    title: "Stay in the Flow",
                    image: "/laser-clicker.png",
                  },
                  {
                    title: "Speech & Context Matching",
                    image: "/speech-context-matching.jpg",
                  },
                ].map((feature, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-[24px] border border-slate-200 shadow-2xl"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Waitlist Form Section */}
      <section id="early-access" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-[#0B0C0F]">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              EARLY ACCESS
            </div>
            <h2 className="font-serif text-[36px] leading-[1.15] md:text-[54px] md:leading-[1.1] font-medium mb-4">
              WE'RE BUILDING AROVA WITH OUR FIRST PRESENTERS.
            </h2>
            <p className="text-[#A7ABB3] text-base md:text-lg max-w-[600px] mx-auto leading-relaxed">
              We're inviting a small group of students, educators, professionals, founders, and speakers to try the early version of Arova.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-md">
            {waitlistSubmitted ? (
              <div className="text-center py-12">
                <div className="text-2xl font-serif text-white mb-2">You're on the list.</div>
                <p className="text-[#A7ABB3] text-sm">We'll let you know when Arova Early Access opens.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setWaitlistSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A7ABB3] mb-2 font-semibold">Full Name</label>
                  <input required type="text" placeholder="Jane Doe" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-pink-400/60 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A7ABB3] mb-2 font-semibold">Email Address</label>
                  <input required type="email" placeholder="jane@example.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-pink-400/60 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A7ABB3] mb-2 font-semibold">What do you usually present?</label>
                  <select required defaultValue="" className="w-full px-4 py-3 bg-[#0B0C0F] border border-white/10 rounded-xl text-white outline-none focus:border-pink-400/60 transition-all text-sm appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="university">University / Class</option>
                    <option value="teaching">Teaching / Lecturing</option>
                    <option value="sales">Sales / Client Presentations</option>
                    <option value="corporate">Corporate / Business</option>
                    <option value="startup">Startup / Founder</option>
                    <option value="speaking">Public Speaking</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A7ABB3] mb-2 font-semibold">How often do you present?</label>
                  <select required defaultValue="" className="w-full px-4 py-3 bg-[#0B0C0F] border border-white/10 rounded-xl text-white outline-none focus:border-pink-400/60 transition-all text-sm appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="rarely">Less than once a month</option>
                    <option value="monthly">1–3 times a month</option>
                    <option value="weekly">1–2 times a week</option>
                    <option value="frequent">3+ times a week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A7ABB3] mb-2 font-semibold">When is your next presentation? (Optional)</label>
                  <input type="text" placeholder="e.g. Next Tuesday" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-pink-400/60 transition-all text-sm" />
                </div>

                <Button type="submit" className="w-full glass-button py-6 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white font-medium text-base">
                  Join the Waitlist
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Got{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                questions
              </span>
              ?
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Everything you need to know about Arova and our AI presentation copilot platform.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is Arova?",
                answer:
                  "Arova is an AI presentation copilot designed to understand what you're saying while you present and help control the presentation in real time.",
              },
              {
                question: "Does Arova create presentations?",
                answer:
                  "Not at its core. Arova is focused on helping you deliver a presentation you already have. The current product focuses on automatic slide navigation and context-aware highlighting.",
              },
              {
                question: "How does Arova control my presentation?",
                answer:
                  "Arova analyzes your speech together with the content and structure of your presentation to determine what you're talking about and when the presentation should respond.",
              },
              {
                question: "Do I need a clicker?",
                answer:
                  "Arova is designed to reduce the need for manually controlling your slides during a presentation. You can still use traditional controls when needed.",
              },
              {
                question: "What kind of presentations can I use?",
                answer:
                  "Arova is being designed for different presentation contexts including classes, lectures, business presentations, sales presentations, pitches, and public speaking.",
              },
              {
                question: "Is Arova available now?",
                answer:
                  "Arova is currently being built and is opening early access to a small group of presenters.",
              },
              {
                question: "How can I try Arova?",
                answer:
                  "Join the early-access waitlist. We'll invite early presenters as access opens.",
              },
              {
                question: "Is the early access free?",
                answer:
                  "Early access will include a free trial for invited users. Specific plans and pricing may evolve as we learn from our first presenters.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
        style={{
          backgroundImage: `url('/earth-cta.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-[#0B0C0F]/60 to-transparent pointer-events-none" />
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            STOP OPERATING YOUR PRESENTATION. START PRESENTING.
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Join the early access cohort
          </h2>
          <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Let your voice drive the flow while you focus on your audience, your ideas, and your message.
          </p>

          <Button onClick={() => scrollToSection("early-access")} className="glass-button text-base rounded-full bg-white/5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-white px-8 py-6 md:text-base">
            Join Early Access
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="Arova Logo" className="h-7 w-auto object-contain" />
              </div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">
                AI presentation copilot for people who present.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A7ABB3] hover:text-white hover:bg-white/10 transition-all" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A7ABB3] hover:text-white hover:bg-white/10 transition-all" aria-label="TikTok">
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A7ABB3] hover:text-white hover:bg-white/10 transition-all" aria-label="LinkedIn">
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A7ABB3] hover:text-white hover:bg-white/10 transition-all" aria-label="YouTube">
                  <YouTubeIcon className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A7ABB3] hover:text-white hover:bg-white/10 transition-all" aria-label="X (Twitter)">
                  <XTwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Navigation</div>
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection("product")} className="text-left text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  Product
                </button>
                <button onClick={() => scrollToSection("how-it-works")} className="text-left text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection("early-access")} className="text-left text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  Early Access
                </button>
                <button onClick={() => scrollToSection("faq")} className="text-left text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  FAQ
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Social</div>
              <div className="flex flex-col gap-3 text-sm text-[#A7ABB3]">
                <a href="#" className="flex items-center gap-2 hover:text-[#F2F3F5] transition-colors">
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-[#F2F3F5] transition-colors">
                  <TikTokIcon className="w-4 h-4" /> TikTok
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-[#F2F3F5] transition-colors">
                  <LinkedInIcon className="w-4 h-4" /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-[#F2F3F5] transition-colors">
                  <YouTubeIcon className="w-4 h-4" /> YouTube
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-[#F2F3F5] transition-colors">
                  <XTwitterIcon className="w-4 h-4" /> X (Twitter)
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Newsletter</div>
              <p className="text-xs text-[#A7ABB3] mb-3">Get updates on Arova product releases.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/20 transition-all"
                />
                <button className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-pink-500/30 hover:border-pink-500/50 transition-all bg-green-800 border-green-700 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A7ABB3]">
            <div>© 2026 Arova. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
