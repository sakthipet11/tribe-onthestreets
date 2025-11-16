'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Applicant {
  _id: string
  full_name: string
  phone_number: string
  city: string
  primary_instrument: string
  experience_level: string
  status: string
  created_at: string
  heard_from: string
  note: string
  circle_interest: boolean
}

interface ApplicantTableProps {
  applicants: Applicant[]
  onStatusChange: (id: string, status: string) => void
}

export default function ApplicantTable({ applicants, onStatusChange }: ApplicantTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const statusColors: Record<string, string> = {
    New: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    Reviewed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Added: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  const getStatusColor = (status: string) => statusColors[status] || 'bg-slate-500/20 text-slate-400'

  if (applicants.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-12 text-center">
        <p className="text-slate-400">No applicants found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
      {applicants.map((applicant) => (
        <div key={applicant._id} className="border-b border-slate-700 last:border-b-0">
          {/* Row */}
          <button
            onClick={() => setExpandedId(expandedId === applicant._id ? null : applicant._id)}
            className="w-full hover:bg-slate-800/50 transition-colors p-4 text-left flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedId === applicant._id ? 'rotate-180' : ''
                  }`}
                />
                <div>
                  <p className="font-semibold text-white">{applicant.full_name}</p>
                  <p className="text-sm text-slate-400">{applicant.city} · {applicant.primary_instrument}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                {new Date(applicant.created_at).toLocaleDateString()}
              </span>
              <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(applicant.status)}`}>
                {applicant.status}
              </span>
            </div>
          </button>

          {/* Expanded Detail */}
          {expandedId === applicant._id && (
            <div className="bg-slate-800/30 px-4 py-4 space-y-4 border-t border-slate-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Phone</p>
                  <p className="text-white font-mono">{applicant.phone_number}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Experience</p>
                  <p className="text-white capitalize">{applicant.experience_level}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Heard From</p>
                  <p className="text-white">{applicant.heard_from || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Circle Interest</p>
                  <p className="text-white">{applicant.circle_interest ? '✓ Yes' : '✗ No'}</p>
                </div>
              </div>

              {applicant.note && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">Applicant Note</p>
                  <p className="text-white">{applicant.note}</p>
                </div>
              )}

              {/* Status Update */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['New', 'Reviewed', 'Approved', 'Added', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(applicant._id, status)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        applicant.status === status
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
