import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { CookieConsentProvider } from "cookie-consent-kit"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookieConsentProvider>
      <App />
    </CookieConsentProvider>
  </StrictMode>
)
