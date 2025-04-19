import { useCookieConsent } from "../application/hooks/useCookieConsent"
import { ConsentContext } from "../application/utils/ConsentContext"
import { CookieBanner } from "./CookieBanner"
import "../styles/variables.css"
import { CookieConsentConfig } from "../domain/models"
import { PropsWithChildren } from "react"
import { CookieConsentConfigContext } from "../application/utils/CookieConsentConfigContext"

type CookieConsentProviderProps = {} & Pick<CookieConsentConfig, "cookieKey">
export const CookieConsentProvider = ({
  children,
  cookieKey = "consent-key",
}: PropsWithChildren<CookieConsentProviderProps>) => {
  return (
    <CookieConsentConfigContext.Provider value={{ cookieKey }}>
      <ConsentContextProvider>
        {children}
        <CookieBanner />
      </ConsentContextProvider>
    </CookieConsentConfigContext.Provider>
  )
}

const ConsentContextProvider = ({ children }: PropsWithChildren) => {
  const value = useCookieConsent()
  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  )
}
