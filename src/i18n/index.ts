/**
 * i18n configuration with feature-based translations
 */

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { en } from "./locales/en"
import { pt } from "./locales/pt"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false, // NOTE: React already escapes values
  },

  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
})

export default i18n
