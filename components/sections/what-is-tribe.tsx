import { CheckCircle2, XCircle } from 'lucide-react'

export default function WhatIsTribe() {
  const isIt = [
    'Daily music challenges (7 min commitment)',
    'Mentorship from experienced musicians',
    'Community feedback & support',
    'Growth tracking & recognition',
    'Real connections & friendships',
  ]

  const isntIt = [
    'A subscription service',
    'Pay-to-play competitions',
    'Passive content consumption',
    'Algorithm-driven feed',
    'Isolated learning',
  ]

  return (
    <section className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">What is OTS Tribe?</h2>
        <p className="text-center text-slate-400 text-lg mb-16">A real music community. Not a platform.</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* What It Is */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> What It Is
            </h3>
            <ul className="space-y-4">
              {isIt.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What It Isn't */}
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6" /> What It Isn't
            </h3>
            <ul className="space-y-4">
              {isntIt.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
