import { MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(process.env.MONGODB_URI!)

  await client.connect()
  const db = client.db('ots_tribe')

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getApplicantsCollection() {
  const { db } = await connectToDatabase()
  return db.collection('applicants')
}
