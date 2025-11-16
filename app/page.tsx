import Hero from '@/components/sections/hero'
import WhatIsTribe from '@/components/sections/what-is-tribe'
import HowItWorks from '@/components/sections/how-it-works'
import StarterPack from '@/components/sections/starter-pack'
import Gallery from '@/components/sections/gallery'
import CircleTeaser from '@/components/sections/circle-teaser'
import FAQ from '@/components/sections/faq'
import Footer from '@/components/sections/footer'

export const metadata = {
  title: 'OTS Tribe – Join the Community',
  description: 'Join OTS Tribe for daily music challenges, community mentorship, and creative growth.',
  openGraph: {
    title: 'OTS Tribe – Join the Community',
    description: 'Daily 7-min challenges. Real mentorship. Growing together.',
    url: 'https://tribe.onthestreets.in',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-black">
      <Hero />
      <WhatIsTribe />
      <HowItWorks />
      <StarterPack />
      <Gallery />
      <CircleTeaser />
      <FAQ />
      <Footer />
    </main>
  )
}
