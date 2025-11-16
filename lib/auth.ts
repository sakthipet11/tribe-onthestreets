import jwt from 'jsonwebtoken'

export function verifyAdminToken(token: string): boolean {
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return true
  } catch {
    return false
  }
}
