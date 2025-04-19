import { ConsentData, ConsentState } from "../../domain/models"
import { createConsentStorage } from "../../infrastructure/consentStorage"

const DEFAULT_KEY = "cookie_consent_state"
let currentKey = DEFAULT_KEY

const storage = () => createConsentStorage({ cookieKey: currentKey })

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
}
