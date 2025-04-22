import { describe, it, expect, beforeEach } from "vitest"
import { CookieConsent } from "./consentApi"
import { ConsentPreferences } from "../../domain/models"

describe("CookieConsent API", () => {
  const cookieKey = "cookie_consent_test"

  beforeEach(() => {
    // เคลียร์ cookie ทั้ง consent และ preferences
    document.cookie = `${cookieKey}=; max-age=0; path=/`
    document.cookie = `${cookieKey}_prefs=; max-age=0; path=/`
    CookieConsent.config({ cookieKey }) // รีเซต config ให้ใช้ key นี้
  })

  it("should get/set consent state", () => {
    CookieConsent.acceptAll()
    expect(CookieConsent.getState()).toBe("accepted")

    CookieConsent.declineAll()
    expect(CookieConsent.getState()).toBe("declined")
  })

  it("should return full consent data", () => {
    CookieConsent.acceptAll()
    const data = CookieConsent.get()
    expect(data.consent).toBe("accepted")
    expect(typeof data.updatedAt).toBe("string")
  })

  it("should save and retrieve preferences", () => {
    const prefs: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: false,
    }
    CookieConsent.savePreferences(prefs)
    expect(CookieConsent.getPreferences()).toEqual(prefs)
  })

  it("should always keep essential true", () => {
    CookieConsent.savePreferences({
      essential: false,
      analytics: true,
      marketing: true,
    })
    expect(CookieConsent.getPreferences().essential).toBe(true)
  })

  it("should correctly report consent by category", () => {
    CookieConsent.savePreferences({
      essential: true,
      analytics: false,
      marketing: true,
    })
    expect(CookieConsent.hasConsentedTo("analytics")).toBe(false)
    expect(CookieConsent.hasConsentedTo("marketing")).toBe(true)
  })

  it("should allow toggling banner visibility", () => {
    let visible = false
    CookieConsent._externalSetBanner = (val) => {
      visible = val
    }

    CookieConsent.showBanner()
    expect(visible).toBe(true)

    CookieConsent.hideBanner()
    expect(visible).toBe(false)
  })
})
