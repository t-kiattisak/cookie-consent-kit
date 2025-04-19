import { useState } from "react"
import { ConsentData } from "../../domain/models"
import { createConsentStorage } from "../../infrastructure/consentStorage"
import { useConsentConfig } from "../utils/CookieConsentConfigContext"

export function useCookieConsent() {
  const { cookieKey } = useConsentConfig()
  const storage = createConsentStorage({ cookieKey })

  const [consent, setConsent] = useState<ConsentData>(() => storage.getFull())
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  const acceptAll = () => {
    storage.set("accepted")
    setConsent(storage.getFull())
  }

  const declineAll = () => {
    storage.set("declined")
    setConsent(storage.getFull())
  }

  const showBanner = () => setIsBannerVisible(true)
  const hideBanner = () => setIsBannerVisible(false)

  return {
    ...consent,
    showBanner,
    hideBanner,
    isBannerVisible,
    raw: consent,
    acceptAll,
    declineAll,
  }
}
