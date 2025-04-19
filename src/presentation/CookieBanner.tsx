import { createPortal } from "react-dom"
import { useConsentContext } from "../application/hooks/useConsentContext"
import "./cookie-banner.css"

export const CookieBanner = () => {
  const { consent, acceptAll, declineAll } = useConsentContext()

  if (consent !== "undecided") return null

  return createPortal(
    <div className='cookie-banner'>
      <p>
        We use cookies to improve your experience.{" "}
        <a href='#' style={{ color: "var(--cookie-text)" }}>
          Learn more
        </a>
      </p>
      <div className='actions'>
        <button className='btn decline' onClick={declineAll}>
          Decline
        </button>
        <button className='btn accept' onClick={acceptAll}>
          Accept
        </button>
      </div>
    </div>,
    document.body
  )
}
