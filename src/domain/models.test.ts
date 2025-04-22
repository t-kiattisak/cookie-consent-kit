import { describe, it, expect } from "vitest"
import {
  ConsentCategory,
  ConsentPreferences,
  defaultPreferences,
} from "./models"

describe("models", () => {
  it("should define all expected consent categories", () => {
    const categories: ConsentCategory[] = [
      "essential",
      "analytics",
      "marketing",
    ]
    expect(categories.includes("essential")).toBe(true)
    expect(categories.includes("analytics")).toBe(true)
    expect(categories.includes("marketing")).toBe(true)
  })

  it("should have defaultPreferences with essential always true", () => {
    const prefs: ConsentPreferences = defaultPreferences
    expect(prefs.essential).toBe(true)
    expect(prefs.analytics).toBe(false)
    expect(prefs.marketing).toBe(false)
  })
})
