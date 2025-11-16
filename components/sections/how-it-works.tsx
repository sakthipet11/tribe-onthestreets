import { Zap, Users, Award } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Zap,
      title: 'Daily Challenge',
      description: '7-minute focused practice on a specific skill. Posted every morning in the group.',
    },
    {
      icon: Users,
      title: 'Share & Get Feedback',
      description: 'Record yourself. Share with the tribe. Get real mentorship and peer feedback.',
    },
    {
      icon: Award,
      title: 'Level Up Together',
      description: 'Track progress, celebrate wins, and grow alongside 500+ musicians.',
    },
  ]

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">How It Works</h2>
        <p className="text-center text-slate-400 text-lg mb-16">A simple, repeatable system for real growth.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                )}
              </div>
            )
          })}
        </div>

        {/* Monthly Meetup */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-2xl p-8 text-center">
          <p className="text-lg text-slate-300">
            <span className="font-bold text-white">Monthly In-Person Meetups</span> for members in your city to jam, network, and celebrate wins together.
          </p>
        </div>
      </div>
    </section>
  )
}
