import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (e) => {
  const contentList = await queryCollection(e, 'content')
    .select('path')
    .all()
  
  // Static pages that should be included
  const staticRoutes = [
    { loc: '/blog', priority: 1.0 },
    { loc: '/about', priority: 1.0 },
    { loc: '/contact', priority: 1.0 },
    { loc: '/circuit', priority: 1.0 },
  ]
  
  // Dynamic content routes
  const contentRoutes = contentList
    .filter((c: any) => c.path && !String(c.path).includes('/_')) // Exclude partials and drafts
    .map((c: any) => {
      const depth = String(c.path).split('/').filter(Boolean).length
      return asSitemapUrl({
        loc: c.path,
        lastmod: new Date().toISOString(),
        priority: depth === 1 ? 1.0 : 0.8,
      })
    })
  
  // Combine static routes with content routes
  return [
    ...staticRoutes.map(route => asSitemapUrl(route)),
    ...contentRoutes
  ]
})
