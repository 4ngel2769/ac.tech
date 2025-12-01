import { siteContent } from '../../config/content'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            content: siteContent
        }
    }
})
