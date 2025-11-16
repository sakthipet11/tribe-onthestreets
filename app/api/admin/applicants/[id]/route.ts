import { getApplicantsCollection } from '@/lib/db'
import { verifyAdminToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status, crew_notes } = await request.json()

    const collection = await getApplicantsCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          crew_notes: crew_notes || '',
        },
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    return NextResponse.json(result.value)
  } catch (error) {
    console.error('[v0] Update status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
