import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faArrowUpRightFromSquare, 
  faAt, 
  faLocationDot, 
  fas, 
  faRocket, 
  faArrowLeft,
  faInfoCircle,
  faLightbulb,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
import { fab, faYoutube, faDev, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { defineNuxtPlugin } from '#app'

config.autoAddCss = false

library.add(
  faLocationDot,
  faArrowUpRightFromSquare,
  faAt,
  faRocket,
  faArrowLeft,
  faGithub,
  faYoutube,
  faDev,
  faTwitter,
  faLinkedin,
  faInstagram,
  // Alert icons
  faInfoCircle,
  faLightbulb,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
