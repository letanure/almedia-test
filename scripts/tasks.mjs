#!/usr/bin/env node

import { execSync } from "node:child_process"
import inquirer from "inquirer"

// Script categories with descriptions and context
const scriptCategories = {
  Development: {
    dev: {
      desc: "Start development server with hot reload",
      context: "Opens localhost:5173, watches for changes",
    },
    build: {
      desc: "Build for production",
      context: "Creates optimized bundle in dist/ folder",
    },
    preview: {
      desc: "Preview production build locally",
      context: "Serves dist/ folder, tests production build",
    },
  },

  Testing: {
    test: {
      desc: "Run unit tests in watch mode",
      context: "Vitest with hot reload, runs affected tests",
    },
    "test:unit": {
      desc: "Run unit tests once",
      context: "CI-friendly, no watch mode",
    },
    "test:ui": {
      desc: "Run unit tests with UI",
      context: "Opens Vitest UI at localhost:51204",
    },
    "test:coverage": {
      desc: "Run tests with coverage report",
      context: "Generates coverage/ folder with HTML report",
    },
    "test:e2e": {
      desc: "Run E2E tests with Playwright",
      context: "Full browser testing, uses snapshots",
    },
    "test:e2e:ui": {
      desc: "Run E2E tests with Playwright UI",
      context: "Interactive test runner with debugging",
    },
    "test:e2e:update:local": {
      desc: "Update E2E snapshots locally",
      context: "Refreshes visual regression baselines",
    },
    "test:e2e:update:ci": {
      desc: "Update E2E snapshots in CI environment",
      context: "Docker-based, matches CI exactly",
    },
    "test:e2e:update:readme": {
      desc: "Update snapshots AND regenerate README GIF",
      context: "Combines snapshot update + marketing materials",
    },
  },

  "Code Quality": {
    lint: {
      desc: "Check code style and errors",
      context: "TypeScript + Biome linting rules",
    },
    "lint:fix": {
      desc: "Fix auto-fixable lint issues",
      context: "Auto-formats and fixes common issues",
    },
    format: {
      desc: "Format code with Biome",
      context: "Consistent code formatting across team",
    },
    "format:check": {
      desc: "Check if code is formatted",
      context: "CI-friendly, no changes made",
    },
    "type:check": {
      desc: "Check TypeScript types",
      context: "Compile-time type checking without build",
    },
  },

  Documentation: {
    storybook: {
      desc: "Start Storybook development server",
      context: "Component documentation at localhost:6006",
    },
    "storybook:build": {
      desc: "Build Storybook for production",
      context: "Generates static Storybook site",
    },
    "docs:readme:gif": {
      desc: "Generate animated README GIF from E2E snapshots",
      context: "Creates marketing demo showing user flow",
    },
  },

  "Build & Deploy": {
    "build:analyze": {
      desc: "Analyze bundle size and composition",
      context: "Visual bundle analyzer with treemap",
    },
    "size:check": {
      desc: "Check bundle size limits",
      context: "Enforces size limits for performance",
    },
    "size:why": {
      desc: "Visual bundle analyzer (same as build:analyze)",
      context: "Opens interactive bundle analyzer in browser",
    },
  },

  Docker: {
    "docker:dev": {
      desc: "Start development with Docker",
      context: "Full development environment in containers",
    },
    "docker:prod": {
      desc: "Start production Docker setup",
      context: "Production-ready containers",
    },
  },
}

async function showInteractiveMenu() {
  // Build choices with categories
  const choices = []

  Object.entries(scriptCategories).forEach(([category, scripts]) => {
    // Add category separator
    choices.push(new inquirer.Separator(`\n${category}`))
    choices.push(new inquirer.Separator("─".repeat(50)))

    // Add scripts in this category
    Object.entries(scripts).forEach(([script, info]) => {
      choices.push({
        name: `${script.padEnd(25)} │ ${info.desc}`,
        value: script,
        short: script,
      })
    })
  })

  choices.push(new inquirer.Separator("\n"))
  choices.push({
    name: "Exit",
    value: "exit",
    short: "exit",
  })

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "script",
      message: "Select a task to run:",
      choices,
      pageSize: 20,
    },
  ])

  if (answers.script === "exit") {
    console.log("Goodbye!")
    process.exit(0)
  }

  return answers.script
}

async function confirmAndRun(scriptName) {
  // Find script info
  let scriptInfo = null
  Object.values(scriptCategories).forEach((category) => {
    if (category[scriptName]) {
      scriptInfo = category[scriptName]
    }
  })

  console.log(`\n📋 ${scriptInfo?.desc || "Run npm script"}`)
  console.log(`📋 ${scriptInfo?.context || "No additional context"}`)

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Run 'npm run ${scriptName}'?`,
      default: true,
    },
  ])

  if (confirm) {
    console.log(`\nRunning: npm run ${scriptName}\n`)
    try {
      execSync(`npm run ${scriptName}`, { stdio: "inherit" })
    } catch (error) {
      console.log(`\nCommand failed with exit code ${error.status}`)
      process.exit(error.status)
    }
  }

  // Ask if they want to run another command
  const { runAnother } = await inquirer.prompt([
    {
      type: "confirm",
      name: "runAnother",
      message: "Run another command?",
      default: true,
    },
  ])

  if (runAnother) {
    main()
  } else {
    console.log("Goodbye!")
  }
}

async function main() {
  try {
    console.clear()
    console.log("Project Task Runner\n")

    const script = await showInteractiveMenu()
    await confirmAndRun(script)
  } catch (error) {
    if (error.isTtyError) {
      console.log("Interactive prompts not supported in this environment")
      process.exit(1)
    } else {
      console.log("An error occurred:", error.message)
      process.exit(1)
    }
  }
}

// Handle direct script execution
const scriptName = process.argv[2]
if (scriptName) {
  await confirmAndRun(scriptName)
} else {
  await main()
}
