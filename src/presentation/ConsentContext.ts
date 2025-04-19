import { createContext } from "react"
import { useCookieConsent } from "../application/hooks/useCookieConsent"

export const ConsentContext = createContext<ReturnType<
  typeof useCookieConsent
> | null>(null)
