import * as cookie from "cookie"
import { ConsentPreferences } from "../domain/models"
import { safeJsonParse } from "../application/utils/safeJsonParse"

type Options = {
  cookieKey?: string
}

export function createPreferencesStorage({ cookieKey }: Options = {}) {
  const key = (cookieKey ?? "cookie_consent_state") + "_prefs"

  return {
    get(): ConsentPreferences {
      try {
        const cookies = cookie.parse(document.cookie || "")
        const raw = cookies[key]
        return safeJsonParse(raw, {
          essential: true,
          analytics: false,
          marketing: false,
        })
      } catch (error) {
        console.error("Failed to get preferences from cookies:", error)
        return {
          essential: true,
          analytics: false,
          marketing: false,
        }
      }
    },

    set(prefs: ConsentPreferences) {
      document.cookie = cookie.serialize(key, JSON.stringify(prefs), {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
    },

    clear() {
      document.cookie = cookie.serialize(key, "", {
        maxAge: 0,
        path: "/",
      })
    },
  }
}
