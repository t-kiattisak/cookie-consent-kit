import { createPortal } from "react-dom"
import { useConsentContext } from "../application/hooks/useConsentContext"
import "./cookie-banner.css"

export const CookieBanner = () => {
  const { consent, acceptAll, declineAll, isBannerVisible } =
    useConsentContext()

  if (consent !== "undecided" || !isBannerVisible) return null

  return createPortal(
    <div className='cookie-banner'>
      <div className='cookie-banner__content'>
        <strong className='cookie-banner__heading'>
          Would You Like A Cookie? 🍪
        </strong>
        <p className='cookie-banner__message'>
          We value your privacy. Choose which cookies you want to allow.
          Essential cookies are always enabled as they are necessary for the
          website to function properly.
        </p>

        <div className='cookie-banner__footer'>
          <a href='#' className='cookie-banner__link'>
            Privacy Policy
          </a>

          <div className='cookie-banner__actions'>
            <button className='btn btn-outline' onClick={declineAll}>
              Decline All
            </button>
            <button className='btn btn-primary' onClick={acceptAll}>
              Accept All
            </button>
            <button className='btn btn-secondary'>Manage Cookies</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
