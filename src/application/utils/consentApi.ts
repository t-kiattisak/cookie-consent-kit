import {
  ConsentCategory,
  ConsentData,
  ConsentPreferences,
  ConsentState,
} from "../../domain/models"
import { createConsentStorage } from "../../infrastructure/consentStorage"
import { createPreferencesStorage } from "../../infrastructure/preferencesStorage"

const DEFAULT_KEY = "cookie_consent_state"
let currentKey = DEFAULT_KEY

const storage = () => createConsentStorage({ cookieKey: currentKey })
const prefStorage = () => createPreferencesStorage({ cookieKey: currentKey })

type CookieConsentAPI = {
  config: (options: { cookieKey: string }) => void
  get: () => ConsentData
  getState: () => ConsentState
  acceptAll: () => void
  declineAll: () => void
  clear: () => void
  showBanner: () => void
  hideBanner: () => void
  _externalSetBanner?: (_visible: boolean) => void

  savePreferences: (prefs: ConsentPreferences) => void
  getPreferences: () => ConsentPreferences
  hasConsentedTo: (category: ConsentCategory) => boolean
}

export const CookieConsent: CookieConsentAPI = {
  config: ({ cookieKey }) => {
    currentKey = cookieKey
  },

  get: () => storage().getFull(),

  getState: () => storage().get(),

  acceptAll: () => {
    storage().set("accepted")
  },

  declineAll: () => {
    storage().set("declined")
  },

  clear: () => {
    storage().clear()
  },

  showBanner: () => {
    CookieConsent._externalSetBanner?.(true)
  },

  hideBanner: () => {
    CookieConsent._externalSetBanner?.(false)
  },

  savePreferences: (prefs) => {
    prefStorage().set({ ...prefs, essential: true })
  },

  getPreferences: () => prefStorage().get(),

  hasConsentedTo: (category) => {
    return prefStorage().get()[category] === true
  },
}
