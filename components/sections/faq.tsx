'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const faqs = [
    {
      q: 'Do I need to be an experienced musician?',
      a: 'Absolutely not! OTS Tribe is for everyone from complete beginners to advanced players. The challenges scale to your level.',
    },
    {
      q: 'What happens after I apply?',
      a: 'Our crew reviews your application and adds you to the WhatsApp group within 24 hours. Welcome message incoming!',
    },
    {
      q: 'Is there a time commitment?',
      a: 'Just 7 minutes per day for the challenge. You engage as much as you want with the community.',
    },
    {
      q: 'What if I miss a challenge?',
      a: 'No pressure! Catch the next one. The beauty of a community is showing up when you can.',
    },
    {
      q: 'How do I know if this is for me?',
      a: "If you love music, want to grow, and appreciate real community, you're already part of OTS Tribe. Apply now!",
    },
    {
      q: 'Is there a fee to join?',
      a: 'Tribe membership is free. We keep it accessible so more musicians can grow together.',
    },
  ]

  const [expanded, setExpanded] = useState(null as number | null)

  return (
    <section className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">FAQs</h2>
        <p className="text-center text-slate-400 text-lg mb-12">Got questions? We got answers.</p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full text-left bg-slate-900/50 border border-slate-700 hover:border-cyan-500/30 rounded-xl p-5 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white pr-4">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform ${
                    expanded === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {expanded === idx && <p className="mt-4 text-slate-400">{faq.a}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
