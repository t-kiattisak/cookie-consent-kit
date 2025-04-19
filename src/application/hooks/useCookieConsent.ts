import { useState } from "react"
import { ConsentData } from "../../domain/models"
import { consentStorage } from "../../infrastructure/consentStorage"

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentData>(() =>
    consentStorage.getFull()
  )

  const acceptAll = () => {
    consentStorage.set("accepted")
    setConsent(consentStorage.getFull())
  }

  const declineAll = () => {
    consentStorage.set("declined")
    setConsent(consentStorage.getFull())
  }

  return {
    ...consent,
    raw: consent,
    acceptAll,
    declineAll,
  }
}
