import { describe, it, expect, beforeEach } from "vitest"
import { createConsentStorage } from "./consentStorage"

describe("consentStorage", () => {
  beforeEach(() => {
    document.cookie = "cookie_consent_state=; max-age=0; path=/"
  })

  it("should return 'undecided' when no cookie is set", () => {
    const storage = createConsentStorage({})
    expect(storage.get()).toBe("undecided")
  })

  it("should store and return 'accepted'", () => {
    const storage = createConsentStorage({})
    storage.set("accepted")
    expect(storage.get()).toBe("accepted")
  })

  it("should store and return 'declined'", () => {
    const storage = createConsentStorage({})
    storage.set("declined")
    expect(storage.get()).toBe("declined")
  })

  it("should return full data with updatedAt", () => {
    const storage = createConsentStorage({})
    storage.set("accepted")
    const data = storage.getFull()
    expect(data.consent).toBe("accepted")
    expect(typeof data.updatedAt).toBe("string")
  })

  it("should clear cookie", () => {
    const storage = createConsentStorage({})
    storage.set("accepted")
    storage.clear()
    expect(storage.get()).toBe("undecided")
  })

  it("should respect custom cookieKey", () => {
    const storage = createConsentStorage({ cookieKey: "custom_key" })
    storage.set("declined")
    expect(storage.get()).toBe("declined")
    document.cookie = "custom_key=; max-age=0; path=/"
  })

  it("returns 'undecided' on server-side (no document)", () => {
    const orig = globalThis.document
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete globalThis.document
    const storage = createConsentStorage({})
    expect(storage.get()).toBe("undecided")
    expect(storage.getFull().consent).toBe("undecided")
    globalThis.document = orig
  })
})
