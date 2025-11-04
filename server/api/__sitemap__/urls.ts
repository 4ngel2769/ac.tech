import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const contentList = await serverQueryContent(e).find()
  
  // Static pages that should be included
  const staticRoutes = [
    { loc: '/blog', priority: 1.0 },
    { loc: '/about', priority: 1.0 },
    { loc: '/contact', priority: 1.0 },
    { loc: '/circuit', priority: 1.0 },
  ]
  
  // Dynamic content routes
  const contentRoutes = contentList
    .filter(c => c._path && !c._path.includes('/_')) // Exclude partials and drafts
    .map((c) => {
      return asSitemapUrl({
        loc: c._path!,
        lastmod: c.updatedAt || c.createdAt || new Date().toISOString(),
        // Higher priority for main pages (blog, projects index)
        // Lower priority for individual posts/projects
        priority: c._path!.split('/').length === 2 ? 1.0 : 0.8,
      })
    })
  
  // Combine static routes with content routes
  return [
    ...staticRoutes.map(route => asSitemapUrl(route)),
    ...contentRoutes
  ]
})
