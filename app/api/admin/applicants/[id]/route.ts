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
    const result = await collection.findByIdAndUpdate(
      new ObjectId(params.id),
      {
        $set: {
          status,
          crew_notes: crew_notes || '',
        },
      },
      { returnDocument: 'after' }
    )

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
