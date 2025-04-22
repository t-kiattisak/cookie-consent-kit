import { renderHook, act } from "@testing-library/react"
import { useCookieConsent } from "./useCookieConsent"
import { describe, it, expect, beforeEach } from "vitest"
import { CookieConsentProvider } from "../../presentation/CookieConsentProvider"

describe("useCookieConsent", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CookieConsentProvider cookieKey='hook_test'>
      {children}
    </CookieConsentProvider>
  )

  beforeEach(() => {
    document.cookie = "hook_test=; max-age=0; path=/"
    document.cookie = "hook_test_prefs=; max-age=0; path=/"
  })

  it("should default to 'undecided'", () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })
    expect(result.current.consent).toBe("undecided")
  })

  it("should accept all and update state", () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.acceptAll()
    })

    expect(result.current.consent).toBe("accepted")
  })

  it("should decline all and update state", () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.declineAll()
    })

    expect(result.current.consent).toBe("declined")
  })

  it("should allow manually toggling banner visibility", () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.hideBanner()
    })
    expect(result.current.isBannerVisible).toBe(false)

    act(() => {
      result.current.showBanner()
    })
    expect(result.current.isBannerVisible).toBe(true)
  })
})
