export type ConsentState = "undecided" | "accepted" | "declined"

export type ConsentData = {
  consent: ConsentState
  updatedAt?: string
}

export type CookieConsentConfig = {
  cookieKey?: string
}
