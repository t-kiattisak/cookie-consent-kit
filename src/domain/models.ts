export type ConsentState = "undecided" | "accepted" | "declined"

export type ConsentData = {
  consent: ConsentState
  updatedAt?: string
}

export type CookieConsentConfig = {
  cookieKey?: string
}

export type ConsentCategory = "essential" | "analytics" | "marketing"

export type ConsentPreferences = {
  [key in ConsentCategory]: boolean
}

export const defaultPreferences: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
}
