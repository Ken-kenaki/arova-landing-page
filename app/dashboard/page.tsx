"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Rocket, Clock, ArrowRight, LogOut, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  name: string
  email: string
  $id: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [waitlistJoined, setWaitlistJoined] = useState(false)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [formData, setFormData] = useState({
    presentationType: "",
    frequency: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          router.push("/login")
        }
      } catch {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch {
      router.push("/")
    }
  }

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError("")

    try {
      const res = await fetch("/api/dashboard/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setWaitlistJoined(true)
        setShowWaitlistForm(false)
      } else {
        const data = await res.json()
        setFormError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setFormError("An error occurred. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-400 animate-spin" />
          </div>
          <span className="text-sm text-[#A7ABB3]">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Nav */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Arova Logo" className="h-8 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="text-sm text-[#A7ABB3]">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#A7ABB3] bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[640px] w-full mx-auto text-center"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#A7ABB3]">
              In Development
            </span>
          </div>

          {/* Welcome */}
          <h1 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-4">
            Hey{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </h1>

          <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-6 max-w-[520px] mx-auto">
            We&apos;re currently building Arova — your AI presentation copilot that listens while you present and automatically controls your slides.
          </p>

          {/* Building illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative p-8 md:p-12 rounded-[28px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm mb-8"
          >
            {/* Animated construction dots */}
            <div className="flex justify-center gap-3 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-pink-400/60"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: Rocket,
                  title: "Voice Navigation",
                  desc: "Slides move when you speak",
                  color: "pink",
                },
                {
                  icon: Sparkles,
                  title: "Smart Highlighting",
                  desc: "Content lights up in real-time",
                  color: "purple",
                },
                {
                  icon: Clock,
                  title: "Coming Soon",
                  desc: "Early access launching soon",
                  color: "pink",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div
                    className={`p-3 rounded-xl ${
                      item.color === "pink"
                        ? "bg-pink-500/10 text-pink-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-[11px] text-[#A7ABB3]">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-[#A7ABB3] leading-relaxed">
                The product isn&apos;t live yet — but we&apos;re getting close.
                <br />
                Join the waitlist and be among the first to try Arova.
              </p>
            </div>
          </motion.div>

          {/* Waitlist CTA */}
          <AnimatePresence mode="wait">
            {waitlistJoined ? (
              <motion.div
                key="joined"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check size={16} className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white">You&apos;re on the list!</h3>
                </div>
                <p className="text-sm text-[#A7ABB3]">
                  We&apos;ll reach out to <span className="text-white font-medium">{user?.email}</span> when early access opens.
                </p>
              </motion.div>
            ) : showWaitlistForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <h3 className="text-lg font-serif font-medium text-white mb-1">A couple quick questions</h3>
                <p className="text-xs text-[#A7ABB3] mb-6">So we can tailor the early access experience for you.</p>

                {formError && (
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl text-xs bg-red-500/15 border border-red-500/20 text-[#F2F3F5] mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 flex-shrink-0" />
                    {formError}
                  </div>
                )}

                <form onSubmit={handleJoinWaitlist} className="space-y-5">
                  <div className="text-left">
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#A7ABB3] mb-2 font-semibold">
                      What do you usually present?
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.presentationType}
                        onChange={(e) => setFormData({ ...formData, presentationType: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white outline-none focus:border-pink-400/40 transition-all text-sm appearance-none pr-10"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="university">University / Class</option>
                        <option value="teaching">Teaching / Lecturing</option>
                        <option value="sales">Sales / Client Presentations</option>
                        <option value="corporate">Corporate / Business</option>
                        <option value="startup">Startup / Founder</option>
                        <option value="speaking">Public Speaking</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A7ABB3] pointer-events-none" />
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#A7ABB3] mb-2 font-semibold">
                      How often do you present?
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white outline-none focus:border-pink-400/40 transition-all text-sm appearance-none pr-10"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="rarely">Less than once a month</option>
                        <option value="monthly">1–3 times a month</option>
                        <option value="weekly">1–2 times a week</option>
                        <option value="frequent">3+ times a week</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A7ABB3] pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowWaitlistForm(false)}
                      className="flex-1 py-3.5 rounded-xl text-sm font-medium text-[#A7ABB3] bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="flex-1 py-3.5 rounded-xl text-sm font-bold text-[#0B0C0F] bg-white hover:bg-white/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="relative w-4 h-4 inline-block">
                            <span className="absolute inset-0 rounded-full border-2 border-[#0B0C0F]/20" />
                            <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0B0C0F] animate-spin" />
                          </span>
                          Joining...
                        </span>
                      ) : (
                        "Join Waitlist"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowWaitlistForm(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-[#0B0C0F] bg-white hover:bg-white/90 shadow-[0_4px_24px_rgba(255,255,255,0.08)] transition-all"
                >
                  <Sparkles size={16} />
                  Join the Early Access Waitlist
                  <ArrowRight size={16} />
                </motion.button>
                <p className="mt-4 text-[11px] text-[#A7ABB3]">
                  Be among the first to experience Arova when we launch.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6 px-6 text-center">
        <p className="text-[11px] text-[#A7ABB3]">
          © 2026 Arova. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
