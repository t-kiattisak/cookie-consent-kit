import { useState } from "react"
import "./preferences-modal.css"
import { ConsentPreferences, defaultPreferences } from "../domain/models"
import { createPortal } from "react-dom"

type Props = {
  visible: boolean
  onClose: () => void
  onSave: (prefs: ConsentPreferences) => void
}

export const ConsentPreferencesModal = ({
  visible,
  onClose,
  onSave,
}: Props) => {
  const [prefs, setPrefs] = useState<ConsentPreferences>(defaultPreferences)

  const toggle = (key: keyof ConsentPreferences) => {
    if (key === "essential") return
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!visible) return null

  return createPortal(
    <div className='consent-modal'>
      <div className='consent-modal__overlay' onClick={onClose} />
      <div className='consent-modal__content'>
        <h2>Cookie Preferences</h2>

        <ul className='consent-modal__list'>
          {Object.entries(prefs).map(([key, value]) => (
            <li key={key}>
              <label className='consent-modal__item'>
                <input
                  type='checkbox'
                  checked={value}
                  disabled={key === "essential"}
                  onChange={() => toggle(key as keyof ConsentPreferences)}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </li>
          ))}
        </ul>

        <div className='consent-modal__actions'>
          <button className='btn btn-outline' onClick={onClose}>
            Cancel
          </button>
          <button
            className='btn btn-primary'
            onClick={() => {
              onSave(prefs)
              onClose()
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
