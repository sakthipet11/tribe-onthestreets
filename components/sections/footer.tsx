import Link from 'next/link'
import { Mail, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">OTS Tribe</h3>
            <p className="text-slate-400 text-sm">Building a real music community. One challenge at a time.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-cyan-400 transition">Discord</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">WhatsApp</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Instagram</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-cyan-400 transition">About OTS</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:crew@onthestreets.in" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition text-sm">
                <Mail className="w-4 h-4" /> crew@onthestreets.in
              </a>
              <div className="flex gap-3">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2025 On The Streets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
