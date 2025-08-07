import {
  AnimatePresence,
  type HTMLMotionProps,
  LayoutGroup,
  MotionConfig,
  motion,
  Reorder,
  useAnimation,
  useCycle,
  useInView,
} from "motion/react"
import type * as React from "react"

// Professional animation timing (responsive to device)
const isMobile = typeof window !== "undefined" && window.innerWidth < 768

const durations = {
  fast: isMobile ? 0.25 : 0.2, // Micro-interactions
  normal: isMobile ? 0.4 : 0.35, // Standard transitions
  slow: isMobile ? 0.55 : 0.5, // Prominent actions
} as const

// Professional easing curves (based on Material Design & Apple)
const easings = {
  standard: [0.4, 0.0, 0.2, 1], // Material Design standard
  emphasized: [0.05, 0.7, 0.1, 1], // For important/dramatic actions
  gentle: [0.25, 0.46, 0.45, 0.94], // Apple-style smooth
  bounce: [0.68, -0.55, 0.265, 1.55], // Playful bounce
} as const

// Refined distances for smooth movement
const distances = {
  subtle: 12, // Professional, minimal
  normal: 20, // Noticeable but smooth
  prominent: 32, // Clear, dramatic movement
} as const

// Animation variants for entering
const enterAnimations = {
  fade: { opacity: 0 },
  slideUp: { opacity: 0, y: distances.normal },
  slideDown: { opacity: 0, y: -distances.normal },
  slideLeft: { opacity: 0, x: distances.normal },
  slideRight: { opacity: 0, x: -distances.normal },
  scale: { opacity: 0, scale: 0.85 },
  pop: { opacity: 0, scale: 0.6 },
  blur: { opacity: 0, filter: "blur(3px)" },
} as const

// Animation variants for exiting
const exitAnimations = {
  fade: { opacity: 0 },
  slideUp: { opacity: 0, y: -distances.subtle },
  slideDown: { opacity: 0, y: distances.subtle },
  slideLeft: { opacity: 0, x: -distances.normal },
  slideRight: { opacity: 0, x: distances.normal },
  scale: { opacity: 0, scale: 0.9 },
  pop: { opacity: 0, scale: 0.85 },
  blur: { opacity: 0, filter: "blur(3px)" },
} as const

// Base animate state (transformOrigin will be added dynamically)
const baseAnimateState = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
}

type AnimationType = keyof typeof enterAnimations
type TransformOrigin =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
type EasingType = "standard" | "emphasized" | "gentle" | "bounce"
type DurationType = "fast" | "normal" | "slow" | number

/**
 * Professional animation wrapper with industry-standard easing and responsive timing
 *
 * @example
 * ```tsx
 * // Simple mode - same animation for in/out
 * <Animated effect="scale">
 *   <Card />
 * </Animated>
 *
 * // Advanced mode - different animations
 * <Animated in="slideUp" out="fade" transformOrigin="top-left">
 *   <TodoItem />
 * </Animated>
 *
 * // Full control with custom timing
 * <Animated
 *   effect="pop"
 *   ease="bounce"
 *   duration="slow"
 *   transformOrigin="center"
 * >
 *   <SuccessMessage />
 * </Animated>
 *
 * // Millisecond precision
 * <Animated effect="fade" duration={750}>
 *   <LoadingSpinner />
 * </Animated>
 * ```
 *
 * **Available Effects:**
 * - `fade` - Simple opacity transition
 * - `slideUp` - Slides from bottom (great for todos, notifications)
 * - `slideDown` - Slides from top (dropdowns, alerts)
 * - `slideLeft` - Slides from right (navigation, page transitions)
 * - `slideRight` - Slides from left (kanban movements)
 * - `scale` - Grows from transformOrigin (cards, UI elements)
 * - `pop` - Bouncy scale (success states, new items)
 * - `blur` - Blur to focus (modern, sophisticated)
 *
 * **Transform Origins:**
 * - `top-left` - Natural for UI elements, cards (default for scale)
 * - `top-center` - Perfect for modals, dropdowns
 * - `center` - Balanced, good for pop effects
 * - `bottom-center` - Rising notifications, mobile sheets
 *
 * **Easing Types:**
 * - `standard` - Material Design (versatile, default)
 * - `gentle` - Apple-style smooth (elegant)
 * - `emphasized` - Dramatic but smooth (important actions)
 * - `bounce` - Playful bounce (auto-applied to pop effect)
 *
 * **Duration Options:**
 * - `"fast"` - Quick micro-interactions (200-250ms)
 * - `"normal"` - Standard transitions (350-400ms, default)
 * - `"slow"` - Prominent actions (500-550ms)
 * - `500` - Custom milliseconds (converted to seconds)
 * - Auto-detects device and adjusts timing
 */
interface AnimatedProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "exit"> {
  /** React children to animate */
  children: React.ReactNode
  /** Animation effect for both enter and exit (simple mode) */
  effect?: AnimationType
  /** Animation when element enters (advanced mode) */
  in?: AnimationType
  /** Animation when element exits (advanced mode) */
  out?: AnimationType
  /** Transform origin point for scale animations */
  transformOrigin?: TransformOrigin
  /** Animation delay in seconds */
  delay?: number
  /** Animation duration - semantic values (fast/normal/slow) or milliseconds */
  duration?: DurationType
  /** Professional easing curve */
  ease?: EasingType
}

export function Animated({
  children,
  effect,
  in: inAnimation,
  out: outAnimation,
  transformOrigin,
  delay = 0,
  duration = "normal",
  ease = "standard",
  ...props
}: AnimatedProps) {
  // If effect is provided, use it for both in and out
  const enterAnim = effect ? effect : inAnimation || "slideUp"
  const exitAnim = effect ? effect : outAnimation || "slideDown"

  // Convert kebab-case to CSS format and set smart defaults
  const getTransformOrigin = () => {
    if (transformOrigin) {
      return transformOrigin.replace(/-/g, " ")
    }

    // Smart defaults based on animation type
    if (enterAnim === "scale" || exitAnim === "scale") {
      return "top left" // Natural for UI elements
    }
    if (enterAnim === "pop" || exitAnim === "pop") {
      return "center" // Balanced for pop effects
    }

    return "top left" // Default fallback
  }

  const cssTransformOrigin = getTransformOrigin()

  // Convert duration to seconds
  const getDurationInSeconds = (duration: DurationType): number => {
    if (typeof duration === "number") {
      return duration / 1000 // Convert milliseconds to seconds
    }
    return durations[duration]
  }

  // Professional transition settings with proper easing
  const getTransition = () => {
    const selectedEasing = easings[ease]
    const durationInSeconds = getDurationInSeconds(duration)
    const baseTransition = {
      duration: durationInSeconds,
      ease: selectedEasing,
      delay,
    }

    // Pop effect gets special bounce easing and timing
    if (enterAnim === "pop" || exitAnim === "pop") {
      return {
        ...baseTransition,
        ease: easings.bounce,
        duration: getDurationInSeconds("slow"), // Longer for bounce effect
      }
    }

    // Emphasized easing for scale animations (feels more natural)
    if (enterAnim === "scale" || exitAnim === "scale") {
      return {
        ...baseTransition,
        ease: ease === "standard" ? easings.emphasized : selectedEasing,
      }
    }

    return baseTransition
  }

  // Create animate state with dynamic transform origin
  const animateState = {
    ...baseAnimateState,
    transformOrigin: cssTransformOrigin,
  }

  // Create initial and exit states with transform origin
  const initialState = {
    ...enterAnimations[enterAnim],
    transformOrigin: cssTransformOrigin,
  }

  const exitState = {
    ...exitAnimations[exitAnim],
    transformOrigin: cssTransformOrigin,
  }

  return (
    <motion.div
      initial={initialState}
      animate={animateState}
      exit={exitState}
      transition={getTransition()}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Re-export commonly needed motion features with consistent naming
interface AnimatedGroupProps {
  children: React.ReactNode
  mode?: "sync" | "wait" | "popLayout"
}

export function AnimatedGroup({ children, mode = "wait" }: AnimatedGroupProps) {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>
}
export { useInView as useAnimateOnScroll }
export { MotionConfig as AnimatedProvider }
export { useCycle as useAnimateStates }
export { Reorder as AnimatedReorder }
export { LayoutGroup as AnimatedLayout }
export { useAnimation as useAnimateControls }

// TODO: Add these advanced motion features when needed:
//
// export { useMotionValue, useTransform } from "motion/react"
// - Advanced reactive animations and value transformations
//
// export { useDragControls } from "motion/react"
// - Fine-grained drag interaction control
//
// export { LazyMotion, domAnimation } from "motion/react"
// - Bundle optimization for smaller builds (adds complexity)
