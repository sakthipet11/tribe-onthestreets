import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Verify password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    })

    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
