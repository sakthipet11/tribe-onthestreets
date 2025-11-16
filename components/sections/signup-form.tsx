'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, AlertCircle } from 'lucide-react'
import { trackEvent, EVENTS } from '@/lib/analytics'

interface SignupFormProps {
  onSuccess?: () => void
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    city: '',
    primary_instrument: '',
    experience_level: '',
    heard_from: '',
    note: '',
    circle_interest: false,
    starter_pack_ack: false,
  })

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required'
    if (!validatePhone(formData.phone_number)) newErrors.phone_number = 'Valid Indian phone number required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.primary_instrument) newErrors.primary_instrument = 'Please select an instrument'
    if (!formData.experience_level) newErrors.experience_level = 'Please select your level'
    if (!formData.starter_pack_ack) newErrors.starter_pack_ack = 'Please confirm'
    if (formData.note.length > 250) newErrors.note = 'Max 250 characters'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      trackEvent(EVENTS.FORM_ERROR, { error_count: Object.keys(newErrors).length })
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }),
      })

      if (!response.ok) throw new Error('Submission failed')

      trackEvent(EVENTS.FORM_SUBMIT, {
        instrument: formData.primary_instrument,
        level: formData.experience_level,
        circle_interest: formData.circle_interest,
      })

      setSuccess(true)
      setFormData({
        full_name: '',
        phone_number: '',
        city: '',
        primary_instrument: '',
        experience_level: '',
        heard_from: '',
        note: '',
        circle_interest: false,
        starter_pack_ack: false,
      })

      setTimeout(() => {
        setSuccess(false)
        onSuccess?.()
      }, 5000)
    } catch (error) {
      setErrors({ submit: 'Failed to submit. Please try again.' })
      trackEvent(EVENTS.FORM_ERROR, { error_message: 'Submission failed' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/50 rounded-2xl p-12 text-center">
        <Check className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to OTS Tribe!</h3>
        <p className="text-slate-300 mb-4">Check your WhatsApp—the crew will add you within 24 hours.</p>
        <p className="text-sm text-slate-400">Your Starter Pack PDF has been sent to your email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">Apply to Join Tribe</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
        <input
          type="text"
          placeholder="Your name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        />
        {errors.full_name && <p className="text-red-400 text-sm mt-1">{errors.full_name}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Phone Number (India) *</label>
        <input
          type="tel"
          placeholder="98XXXXXXXX"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        />
        {errors.phone_number && <p className="text-red-400 text-sm mt-1">{errors.phone_number}</p>}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">City *</label>
        <input
          type="text"
          placeholder="Your city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        />
        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
      </div>

      {/* Instrument */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Primary Instrument *</label>
        <select
          value={formData.primary_instrument}
          onChange={(e) => setFormData({ ...formData, primary_instrument: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        >
          <option value="">Select instrument</option>
          <option value="guitar">Guitar</option>
          <option value="bass">Bass</option>
          <option value="drums">Drums</option>
          <option value="keyboard">Keyboard</option>
          <option value="vocals">Vocals</option>
          <option value="other">Other</option>
        </select>
        {errors.primary_instrument && <p className="text-red-400 text-sm mt-1">{errors.primary_instrument}</p>}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Experience Level *</label>
        <select
          value={formData.experience_level}
          onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        >
          <option value="">Select level</option>
          <option value="beginner">Beginner (0-1 year)</option>
          <option value="intermediate">Intermediate (1-3 years)</option>
          <option value="advanced">Advanced (3+ years)</option>
        </select>
        {errors.experience_level && <p className="text-red-400 text-sm mt-1">{errors.experience_level}</p>}
      </div>

      {/* Heard From */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">How did you hear about us?</label>
        <input
          type="text"
          placeholder="e.g., Friend, Instagram, Podcast"
          value={formData.heard_from}
          onChange={(e) => setFormData({ ...formData, heard_from: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Anything else? (max 250 chars)</label>
        <textarea
          placeholder="Tell us what inspired you to join..."
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value.slice(0, 250) })}
          rows={4}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
        />
        <p className="text-slate-500 text-xs mt-1">{formData.note.length}/250</p>
        {errors.note && <p className="text-red-400 text-sm mt-1">{errors.note}</p>}
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.starter_pack_ack}
            onChange={(e) => setFormData({ ...formData, starter_pack_ack: e.target.checked })}
            className="mt-1 w-4 h-4 accent-cyan-500"
          />
          <span className="text-slate-300 text-sm">I'm ready to commit to daily challenges and be part of this community *</span>
        </label>
        {errors.starter_pack_ack && <p className="text-red-400 text-sm">{errors.starter_pack_ack}</p>}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.circle_interest}
            onChange={(e) => setFormData({ ...formData, circle_interest: e.target.checked })}
            className="mt-1 w-4 h-4 accent-purple-500"
          />
          <span className="text-slate-300 text-sm">I'm interested in OTS Circle (1-on-1 mentorship)</span>
        </label>
      </div>

      {errors.submit && (
        <div className="flex gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Apply to Join'}
      </Button>
    </form>
  )
}
