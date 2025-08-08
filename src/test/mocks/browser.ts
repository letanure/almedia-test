/**
 * MSW Browser Setup
 *
 * Sets up MSW for development mode in the browser.
 * Only runs when VITE_ENABLE_API_MOCKS=true
 */

import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)
