import * as cookie from "cookie"
import { ConsentData, ConsentState } from "../domain/models"

const COOKIE_NAME = "cookie_consent_state"

export const consentStorage = {
  get(): ConsentState {
    if (typeof document === "undefined") return "undecided"
    const cookies = cookie.parse(document.cookie || "")
    const raw = cookies[COOKIE_NAME]
    if (!raw) return "undecided"
    try {
      const data: ConsentData = JSON.parse(raw)
      if (data.consent === "accepted" || data.consent === "declined") {
        return data.consent
      }
    } catch {
      if (raw === "accepted" || raw === "declined") return raw
    }
    return "undecided"
  },

  getFull(): ConsentData {
    if (typeof document === "undefined") return { consent: "undecided" }
    const cookies = cookie.parse(document.cookie || "")
    const raw = cookies[COOKIE_NAME]
    if (!raw) return { consent: "undecided" }
    try {
      const data: ConsentData = JSON.parse(raw)
      return data
    } catch {
      if (raw === "accepted" || raw === "declined") {
        return { consent: raw }
      }
    }
    return { consent: "undecided" }
  },

  set(state: ConsentState) {
    const serialized = cookie.serialize(
      COOKIE_NAME,
      JSON.stringify({ consent: state, updatedAt: new Date().toISOString() }),
      {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      }
    )
    document.cookie = serialized
  },

  clear() {
    const serialized = cookie.serialize(COOKIE_NAME, "", {
      maxAge: 0,
      path: "/",
    })
    document.cookie = serialized
  },
}
