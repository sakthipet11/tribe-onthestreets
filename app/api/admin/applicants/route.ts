import { getApplicantsCollection } from '@/lib/db'
import { verifyAdminToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collection = await getApplicantsCollection()
    const applicants = await collection
      .find({})
      .sort({ created_at: -1 })
      .toArray()

    return NextResponse.json(applicants)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
