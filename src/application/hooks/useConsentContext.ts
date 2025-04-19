import { useContext } from "react"
import { ConsentContext } from "../../presentation/ConsentContext"

export const useConsentContext = () => {
  const ctx = useContext(ConsentContext)
  if (!ctx)
    throw new Error(
      "useConsentContext must be used within <CookieConsentProvider>"
    )
  return ctx
}
