import { useState } from "react"
import { ConsentData } from "../../domain/models"
import { createConsentStorage } from "../../infrastructure/consentStorage"
import { useConsentConfig } from "../../presentation/CookieConsentConfigContext"

export function useCookieConsent() {
  const { cookieKey } = useConsentConfig()
  const storage = createConsentStorage({ cookieKey })

  const [consent, setConsent] = useState<ConsentData>(() => storage.getFull())

  const acceptAll = () => {
    storage.set("accepted")
    setConsent(storage.getFull())
  }

  const declineAll = () => {
    storage.set("declined")
    setConsent(storage.getFull())
  }

  return {
    ...consent,
    raw: consent,
    acceptAll,
    declineAll,
  }
}
