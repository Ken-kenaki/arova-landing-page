"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Signup failed. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0C0F]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/[0.04] backdrop-blur-2xl rounded-[32px] border border-white/[0.08] shadow-2xl p-8 sm:p-12"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link
              href="/"
              className="inline-block group hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Arova Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-2xl font-medium text-white tracking-tight flex items-center justify-center gap-2.5">
              Create your account
              <Sparkles size={18} className="text-purple-400" />
            </h1>
            <p className="text-sm text-[#A7ABB3] mt-2 leading-relaxed">
              Join Arova and transform how you present.
            </p>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl text-xs overflow-hidden bg-red-500/15 border border-red-500/20 text-[#F2F3F5] shadow-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 flex-shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="signup-name"
                className="block font-semibold text-[11px] uppercase tracking-[0.15em] pl-0.5 text-[#A7ABB3]"
              >
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A7ABB3]/50" size={16} />
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-[#A7ABB3]/30 outline-none transition-all duration-300 bg-white/[0.04] border border-white/[0.08] focus:bg-white/[0.07] focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/10"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block font-semibold text-[11px] uppercase tracking-[0.15em] pl-0.5 text-[#A7ABB3]"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A7ABB3]/50" size={16} />
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-[#A7ABB3]/30 outline-none transition-all duration-300 bg-white/[0.04] border border-white/[0.08] focus:bg-white/[0.07] focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/10"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="block font-semibold text-[11px] uppercase tracking-[0.15em] pl-0.5 text-[#A7ABB3]"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A7ABB3]/50" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  placeholder="Min. 8 characters"
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-[#A7ABB3]/30 outline-none transition-all duration-300 bg-white/[0.04] border border-white/[0.08] focus:bg-white/[0.07] focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A7ABB3]/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-[#A7ABB3]/60 pl-0.5">
                Must be at least 8 characters
              </p>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="relative w-full py-4 mt-4 rounded-xl font-bold text-sm text-[#0B0C0F] bg-white hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.08)] transition-all cursor-pointer overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 rounded-full border-2 border-[#0B0C0F]/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0B0C0F] animate-spin" />
                  </div>
                  Creating Account...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  Create Account
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </motion.button>

            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="text-[#A7ABB3] hover:text-white text-xs transition-colors"
              >
                Already have an account?{" "}
                <span className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in
                </span>
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 flex flex-col items-center border-t border-white/[0.06] gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]" />
              <span className="text-[10px] text-[#A7ABB3] font-semibold uppercase tracking-widest">
                Secure Registration
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
