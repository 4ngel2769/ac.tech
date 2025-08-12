import { siteContent } from '../../config/content.js'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            content: siteContent
        }
    }
})
