/**
 * MSW Node Setup
 *
 * Sets up MSW for testing in Node.js environment
 */

import { setupServer } from "msw/node"
import { handlers } from "./handlers"

export const server = setupServer(...handlers)
