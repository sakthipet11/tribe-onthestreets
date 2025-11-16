import { getApplicantsCollection } from '@/lib/db'
import { sendEmailNotification } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['full_name', 'phone_number', 'city', 'primary_instrument', 'experience_level', 'starter_pack_ack']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create applicant record
    const applicantData = {
      ...body,
      created_at: new Date(),
      status: 'New',
      user_agent: request.headers.get('user-agent'),
      ip_hash: hashIP(request.headers.get('x-forwarded-for') || ''),
      crew_notes: '',
      added_to_whatsapp_by: null,
      added_to_whatsapp_on: null,
    }

    const collection = await getApplicantsCollection()
    const result = await collection.insertOne(applicantData)

    // Send email notification
    await sendEmailNotification(applicantData)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function hashIP(ip: string): string {
  // Simple hash - in production use proper crypto
  return Buffer.from(ip).toString('base64')
}
