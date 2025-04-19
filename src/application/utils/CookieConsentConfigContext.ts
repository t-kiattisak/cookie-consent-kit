import { createContext, useContext } from "react"

type Config = {
  cookieKey: string
}

export const CookieConsentConfigContext = createContext<Config | null>(null)

export const useConsentConfig = () => {
  const ctx = useContext(CookieConsentConfigContext)
  if (!ctx) throw new Error("Missing <CookieConsentProvider>")
  return ctx
}
