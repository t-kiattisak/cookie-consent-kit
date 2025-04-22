import { describe, it, expect, beforeEach } from "vitest"
import { createPreferencesStorage } from "./preferencesStorage"
import type { ConsentPreferences } from "../domain/models"

describe("preferencesStorage", () => {
  const prefs: ConsentPreferences = {
    essential: true,
    analytics: true,
    marketing: false,
  }

  beforeEach(() => {
    document.cookie = "cookie_consent_state_prefs=; max-age=0; path=/"
  })

  it("should return default when no cookie is set", () => {
    const storage = createPreferencesStorage({
      cookieKey: "cookie_consent_state",
    })
    const result = storage.get()
    expect(result).toEqual({
      essential: true,
      analytics: false,
      marketing: false,
    })
  })

  it("should store and retrieve preferences correctly", () => {
    const storage = createPreferencesStorage({
      cookieKey: "cookie_consent_state",
    })
    storage.set(prefs)
    const result = storage.get()
    expect(result).toEqual(prefs)
  })

  it("should clear the cookie", () => {
    const storage = createPreferencesStorage({
      cookieKey: "cookie_consent_state",
    })
    storage.set(prefs)
    storage.clear()
    expect(storage.get()).toEqual({
      essential: true,
      analytics: false,
      marketing: false,
    })
  })

  it("should respect custom cookieKey", () => {
    const storage = createPreferencesStorage({ cookieKey: "custom_key" })
    storage.set(prefs)
    const result = storage.get()
    expect(result).toEqual(prefs)

    // cleanup
    document.cookie = "custom_key_prefs=; max-age=0; path=/"
  })
})
