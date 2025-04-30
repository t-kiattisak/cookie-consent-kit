# 🍪 cookie-consent-kit

> A lightweight, accessible, and customizable cookie consent banner and preferences manager for React apps. Built with privacy compliance (GDPR, CCPA) in mind.

---

## ✨ Features

- ✅ **Banner** with Accept / Decline / Manage buttons
- ✅ **Preferences Modal** with granular toggles (analytics, marketing)
- ✅ **Global API** (`CookieConsent`) to read/set consent state anywhere
- ✅ **Dark mode + responsive UI**
- ✅ **Customizable styles via CSS variables**
- ✅ **Pluggable storage (via cookie)**
- ✅ **Type-safe with TypeScript**
- ✅ **Full test coverage**

---

## 🛠 Installation

```bash
pnpm add cookie-consent-kit
```

> React 18+ and Vite or similar ESM-compatible setup is recommended.

---

## 🚀 Quick Start

### 1. Wrap your app with `CookieConsentProvider`

```tsx
import { CookieConsentProvider } from "cookie-consent-kit"

;<CookieConsentProvider cookieKey='cookie_consent_state'>
  <App />
</CookieConsentProvider>
```

### 2. Drop in the banner

```tsx
import { CookieBanner } from "cookie-consent-kit"

function App() {
  return (
    <>
      <CookieBanner />
      {/* ...your app */}
    </>
  )
}
```

### 3. Use global API

```ts
import { CookieConsent } from "cookie-consent-kit"

if (CookieConsent.hasConsentedTo("analytics")) {
  loadGoogleAnalytics()
}
```

---

## 🧩 Customization

### CSS Variables (Dark mode ready)

```css
:root {
  --cookie-bg: #fff;
  --cookie-bg-dark: #1f2937;
  --cookie-text: #111;
  --cookie-text-dark: #eee;
  --cookie-border-radius: 0.75rem;
  --cookie-link: #4f46e5;
}
```

---

## 📚 API Reference

### Global API: `CookieConsent`

```ts
CookieConsent.acceptAll()
CookieConsent.declineAll()
CookieConsent.get() // full data with updatedAt
CookieConsent.getState() // "accepted" | "declined" | "undecided"
CookieConsent.savePreferences(prefs)
CookieConsent.getPreferences()
CookieConsent.hasConsentedTo("analytics")
CookieConsent.showBanner()
CookieConsent.hideBanner()
```

---

## 🧪 Testing

All logic and UI components are fully covered via **Vitest** and **@testing-library/react**.

```bash
pnpm test
```

---

## 📦 License

MIT © 2025 Kiattisak Jomram
