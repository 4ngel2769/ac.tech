import clientPromise from '../server/utils/mongodb'

async function createIndexes() {
    try {
        const client = await clientPromise
        const db = client.db(process.env.MONGODB_DB || 'actechviews')
        const views = db.collection('views')

        // Create indexes
        await views.createIndexes([
            { 
                key: { path: 1 },
                unique: true 
            },
            { 
                key: { count: -1 },
                name: 'count_desc' 
            },
            { 
                key: { lastView: -1 },
                name: 'lastView_desc' 
            }
        ])

        console.log('Indexes created successfully')
        process.exit(0)
    } catch (error) {
        console.error('Failed to create indexes:', error)
        process.exit(1)
    }
}

createIndexes() 