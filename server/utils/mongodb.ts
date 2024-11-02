import { MongoClient, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const uri = process.env.MONGODB_URI || process.env.MONGO_URI
// You can also provide a default fallback if needed
// const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/your_database'

if (!uri) {
    throw new Error('Please add your Mongo URI to .env (MONGODB_URI or MONGO_URI)')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    clientPromise = client.connect()
}

export default clientPromise 