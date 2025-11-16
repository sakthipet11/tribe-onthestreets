"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import SignupForm from "./signup-form"
import { trackEvent, EVENTS } from "@/lib/analytics"

export default function Hero() {
  const [showForm, setShowForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    trackEvent(EVENTS.PAGE_VIEW, { page_title: 'Hero Section' })
  }, [])

  const handleApplyClick = () => {
    trackEvent(EVENTS.APPLY_CTA_CLICK)
    setShowForm(true)
    trackEvent(EVENTS.FORM_START)
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-950 to-black px-4 py-20">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Logo/Badge */}
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30">
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                Welcome to the Movement
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Play. Learn.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400">
                Grow.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-2xl text-slate-400 mb-8 leading-relaxed">
              OTS Tribe is a music community where daily challenges, real mentorship, and authentic connections build your skills and confidence.
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleApplyClick}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold px-8 py-6 rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Apply to Join
            </Button>

            {/* Social Proof */}
            <p className="text-sm text-slate-500 mt-6">✓ 500+ members growing daily</p>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute -top-10 right-0 text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
              <SignupForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
