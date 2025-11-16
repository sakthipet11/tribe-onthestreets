'use client'

import { Download, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StarterPack() {
  const contents = [
    'Daily Challenge Framework',
    'Practice Tracking Sheet',
    'Beginner Fundamentals Guide',
    'Recording Tips & Best Practices',
    'Community Guidelines',
    'Monthly Meetup Locations (India)',
  ]

  return (
    <section className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Starter Pack</h2>
        <p className="text-center text-slate-400 text-lg mb-12">Everything you need to start your journey. Free with membership.</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content List */}
          <div>
            <div className="space-y-4">
              {contents.map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-pink-900/30 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white mb-2">Starter Pack PDF</h3>
            <p className="text-slate-400 mb-6">Get instant access when you sign up. See everything included inside.</p>
            <Button
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/starter-pack.pdf'
                link.download = 'OTS_Tribe_Starter_Pack.pdf'
                link.click()
              }}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold w-full flex items-center justify-center gap-2 py-3 rounded-lg"
            >
              <Download className="w-5 h-5" /> Download PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
