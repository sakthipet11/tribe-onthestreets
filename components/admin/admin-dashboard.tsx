'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, LogOut, Filter, Search } from 'lucide-react'
import ApplicantTable from './applicant-table'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [applicants, setApplicants] = useState([])
  const [filteredApplicants, setFilteredApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [stats, setStats] = useState({ total: 0, new: 0, reviewed: 0, approved: 0 })

  useEffect(() => {
    fetchApplicants()
  }, [])

  useEffect(() => {
    filterApplicants()
  }, [applicants, searchTerm, statusFilter])

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/applicants', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setApplicants(data)
      calculateStats(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: any[]) => {
    setStats({
      total: data.length,
      new: data.filter((a) => a.status === 'New').length,
      reviewed: data.filter((a) => a.status === 'Reviewed').length,
      approved: data.filter((a) => a.status === 'Approved').length,
    })
  }

  const filterApplicants = () => {
    let filtered = applicants

    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.phone_number.includes(searchTerm) ||
          a.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((a) => a.status === statusFilter)
    }

    setFilteredApplicants(filtered)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/applicants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update')

      setApplicants(applicants.map((a) => (a._id === id ? { ...a, status: newStatus } : a)))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Phone', 'City', 'Instrument', 'Level', 'Status', 'Applied', 'Notes']
    const rows = filteredApplicants.map((a) => [
      a.full_name,
      a.phone_number,
      a.city,
      a.primary_instrument,
      a.experience_level,
      a.status,
      new Date(a.created_at).toLocaleDateString(),
      a.note || '',
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')

    const link = document.createElement('a')
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    link.download = `ots-tribe-applicants-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    onLogout()
  }

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading applicants...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tribe Dashboard</h1>
            <p className="text-slate-400">Manage OTS Tribe applicants</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Total Applicants</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">New</p>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{stats.new}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Reviewed</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.reviewed}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Approved</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.approved}</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="px-6 py-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, phone, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 text-white px-4 py-2 rounded-lg focus:border-cyan-500 focus:outline-none"
          >
            <option>All</option>
            <option>New</option>
            <option>Reviewed</option>
            <option>Approved</option>
            <option>Added</option>
            <option>Rejected</option>
          </select>

          {/* Export Button */}
          <Button
            onClick={handleExportCSV}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        <ApplicantTable
          applicants={filteredApplicants}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  )
}
