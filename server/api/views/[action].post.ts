import clientPromise from '~/server/utils/mongodb'
import { viewCountCache, batchViewCountCache } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
    const action = event.context.params?.action
    const body = await readBody(event)

    try {
        const client = await clientPromise
        const db = client.db(process.env.MONGODB_DB || 'your-db-name')
        const views = db.collection('views')

        switch (action) {
            case 'increment': {
                const { path } = body
                if (!path) {
                    throw createError({
                        statusCode: 400,
                        message: 'Path is required'
                    })
                }

                const result = await views.findOneAndUpdate(
                    { path },
                    { 
                        $inc: { count: 1 },
                        $setOnInsert: { firstView: new Date() },
                        $set: { lastView: new Date() }
                    },
                    { 
                        upsert: true,
                        returnDocument: 'after'
                    }
                )

                // Update cache with the new count
                const newCount = result?.count || 1
                viewCountCache.set(path, newCount)
                
                return { success: true, count: newCount }
            }

            case 'get': {
                const { path } = body
                if (!path) {
                    throw createError({
                        statusCode: 400,
                        message: 'Path is required'
                    })
                }

                // Check cache first
                const cachedCount = viewCountCache.get(path)
                if (cachedCount !== null) {
                    return { count: cachedCount }
                }

                const view = await views.findOne({ path })
                const count = view?.count || 0
                
                // Update cache
                viewCountCache.set(path, count)
                
                return { count }
            }

            case 'get-multiple': {
                const { paths } = body
                if (!paths || !Array.isArray(paths)) {
                    throw createError({
                        statusCode: 400,
                        message: 'Paths array is required'
                    })
                }

                // Check batch cache
                const cacheKey = paths.sort().join(',')
                const cachedCounts = batchViewCountCache.get(cacheKey)
                if (cachedCounts !== null) {
                    return cachedCounts
                }

                const viewCounts = await views.find({
                    path: { $in: paths }
                }).toArray()

                const result = paths.reduce((acc, path) => {
                    const viewCount = viewCounts.find(vc => vc.path === path)
                    acc[path] = viewCount?.count || 0
                    return acc
                }, {} as Record<string, number>)

                // Update batch cache
                batchViewCountCache.set(cacheKey, result)

                return result
            }

            default:
                throw createError({
                    statusCode: 400,
                    message: 'Invalid action'
                })
        }
    } catch (error) {
        console.error('Database error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to process view action'
        })
    }
}) 