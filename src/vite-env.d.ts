/// <reference types="vite/client" />
import "@total-typescript/ts-reset"

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENABLE_API_MOCKS: string
  readonly VITE_DEBUG: string
  readonly VITE_ENABLE_PERFORMANCE_MONITORING: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
