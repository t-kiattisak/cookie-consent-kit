import { useCookieConsent } from "../application/hooks/useCookieConsent"
import { ConsentContext } from "./ConsentContext"

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useCookieConsent()
  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  )
}
