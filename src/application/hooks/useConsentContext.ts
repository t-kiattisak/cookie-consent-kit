import { useContext } from "react"
import { ConsentContext } from "../utils/ConsentContext"

export const useConsentContext = () => {
  const ctx = useContext(ConsentContext)
  if (!ctx)
    console.error(
      "useConsentContext must be used within <CookieConsentProvider>"
    )
  throw new Error(
    "useConsentContext must be used within <CookieConsentProvider>"
  )
  return ctx
}
