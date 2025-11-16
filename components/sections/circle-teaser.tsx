import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CircleTeaser() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
          <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Premium Tier Coming Soon
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready for Deeper Mentorship?</h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          OTS Circle (launching Q2 2025) will offer 1-on-1 mentorship with world-class musicians, advanced workshops, and exclusive opportunities.
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-slate-300">First 100 members get lifetime founder pricing</span>
        </div>
      </div>
    </section>
  )
}
