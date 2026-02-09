import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  fas,
  faArrowUpRightFromSquare, 
  faAt, 
  faLocationDot, 
  faEnvelope,
  faRocket, 
  faArrowLeft,
  faArrowRight,
  faBars,
  faInfoCircle,
  faLightbulb,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle,
  faSun,
  faShare,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
import { 
  faYoutube, 
  faDev, 
  faTwitter, 
  faInstagram, 
  faLinkedin, 
  faGithub,
  fab
} from '@fortawesome/free-brands-svg-icons'
import { defineNuxtPlugin } from '#app'

config.autoAddCss = false

library.add(
  faLocationDot,
  faArrowUpRightFromSquare,
  faAt,
  faEnvelope,
  faRocket,
  faArrowLeft,
  faArrowRight,
  faBars,
  // Alert icons
  faInfoCircle,
  faLightbulb,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle,
  // Theme toggle icons
  faSun,
  faMoon,
  faShare,
  faGithub,
  faYoutube,
  faDev,
  faTwitter,
  faLinkedin,
  faInstagram,
  fab,
  fas
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
