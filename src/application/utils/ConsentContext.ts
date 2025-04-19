import { createContext } from "react"
import { useCookieConsent } from "../hooks/useCookieConsent"

export const ConsentContext = createContext<ReturnType<
  typeof useCookieConsent
> | null>(null)
