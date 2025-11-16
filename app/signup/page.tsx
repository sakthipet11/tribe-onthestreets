import SignupForm from '@/components/sections/signup-form'
import Footer from '@/components/sections/footer'

export const metadata = {
  title: 'Apply to Join OTS Tribe',
  description: 'Fill out the application to join OTS Tribe community.',
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="py-24 px-4">
        <SignupForm />
      </div>
      <Footer />
    </main>
  )
}
