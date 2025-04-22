import { describe, it, expect } from "vitest"
import { safeJsonParse } from "./safeJsonParse"

describe("safeJsonParse", () => {
  it("should parse valid JSON correctly", () => {
    const json = JSON.stringify({ hello: "world" })
    const result = safeJsonParse<{ hello: string }>(json, { hello: "fallback" })
    expect(result).toEqual({ hello: "world" })
  })

  it("should return fallback for invalid JSON", () => {
    const invalidJson = "{ hello: world }"
    const fallback = { hello: "fallback" }
    const result = safeJsonParse(invalidJson, fallback)
    expect(result).toEqual(fallback)
  })

  it("should return fallback if input is undefined", () => {
    const fallback = { hello: "fallback" }
    const result = safeJsonParse(undefined, fallback)
    expect(result).toEqual(fallback)
  })
})
