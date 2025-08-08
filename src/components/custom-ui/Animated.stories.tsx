import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Animated, AnimatedGroup } from "./Animated"

const meta: Meta<typeof Animated> = {
  title: "Custom UI/Animated",
  component: Animated,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Animation wrapper component using Framer Motion for consistent animations across the app.",
      },
    },
  },
  argTypes: {
    effect: {
      control: "select",
      options: [
        "fade",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "scale",
        "pop",
        "blur",
      ],
      description: "Animation for both enter and exit (simple mode)",
    },
    in: {
      control: "select",
      options: [
        "fade",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "scale",
        "pop",
        "blur",
      ],
      description: "Animation when element enters (advanced mode)",
    },
    out: {
      control: "select",
      options: [
        "fade",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "scale",
        "pop",
        "blur",
      ],
      description: "Animation when element exits (advanced mode)",
    },
    transformOrigin: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "center-left",
        "center",
        "center-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description:
        "Transform origin for scale animations (kebab-case, converts to CSS)",
    },
    delay: {
      control: { type: "number", min: 0, max: 2, step: 0.1 },
      description: "Animation delay in seconds",
    },
    duration: {
      control: { type: "select" },
      options: ["fast", "normal", "slow", 200, 500, 750, 1000],
      description:
        "Animation duration - semantic (fast/normal/slow) or milliseconds",
    },
    ease: {
      control: "select",
      options: ["standard", "emphasized", "gentle", "bounce"],
      description:
        "Professional easing curves (standard=Material, gentle=Apple, bounce=playful)",
    },
  },
}

export default meta
type Story = StoryObj<typeof Animated>

// Simple mode - same animation for in and out
export const FadeEffect: Story = {
  args: {
    effect: "fade",
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Fade Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Simple fade in and fade out</Text>
        </CardContent>
      </Card>
    ),
  },
}

export const SlideEffect: Story = {
  args: {
    effect: "slideUp",
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Slide Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Slides up in, slides down out</Text>
        </CardContent>
      </Card>
    ),
  },
}

export const ScaleEffect: Story = {
  args: {
    effect: "scale",
    ease: "emphasized",
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Scale Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Scales from top-left with emphasized easing</Text>
        </CardContent>
      </Card>
    ),
  },
}

export const PopEffect: Story = {
  args: {
    effect: "pop",
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Pop Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Quick bounce scale - great for new items!</Text>
        </CardContent>
      </Card>
    ),
  },
}

// Advanced mode - different in and out
export const MixedAnimations: Story = {
  args: {
    in: "slideLeft",
    out: "slideRight",
    ease: "gentle",
    delay: 0.1,
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Mixed Animations</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Slides with Apple-style gentle easing</Text>
        </CardContent>
      </Card>
    ),
  },
}

export const BlurToScale: Story = {
  args: {
    in: "blur",
    out: "scale",
    duration: 600,
    children: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Blur to Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <Text tag="p">Blurs in, scales out (600ms)</Text>
        </CardContent>
      </Card>
    ),
  },
}

// Timing examples
export const TimingComparison: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    const timings = [
      { duration: "fast" as const, label: "Fast (200ms)" },
      { duration: "normal" as const, label: "Normal (350ms)" },
      { duration: "slow" as const, label: "Slow (500ms)" },
      { duration: 750, label: "Custom (750ms)" },
    ]

    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"} Cards
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedGroup>
            {show &&
              timings.map((timing, index) => (
                <Animated
                  key={timing.label}
                  effect="scale"
                  duration={timing.duration}
                  delay={index * 0.1}
                >
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle className="text-sm">{timing.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text tag="p" size="sm">
                        Scale animation with different timings
                      </Text>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    )
  },
}

// Transform origin examples
export const TransformOriginDemo: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    const origins = [
      { origin: "top-left" as const, label: "Top Left" },
      { origin: "top-center" as const, label: "Top Center" },
      { origin: "center" as const, label: "Center" },
      { origin: "bottom-right" as const, label: "Bottom Right" },
    ]

    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"} Scale Origins
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedGroup>
            {show &&
              origins.map((config, index) => (
                <Animated
                  key={config.label}
                  effect="scale"
                  transformOrigin={config.origin}
                  delay={index * 0.1}
                  ease="emphasized"
                >
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle className="text-sm">{config.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text tag="p" size="sm">
                        Scaling from {config.origin}
                      </Text>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    )
  },
}

// Easing comparison
export const EasingComparison: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    const easings = [
      { ease: "standard" as const, label: "Standard (Material)" },
      { ease: "gentle" as const, label: "Gentle (Apple)" },
      { ease: "emphasized" as const, label: "Emphasized" },
      { ease: "bounce" as const, label: "Bounce" },
    ]

    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"} Easing Types
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedGroup>
            {show &&
              easings.map((config, index) => (
                <Animated
                  key={config.label}
                  effect="slideUp"
                  ease={config.ease}
                  delay={index * 0.15}
                  duration="slow"
                >
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle className="text-sm">{config.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text tag="p" size="sm">
                        SlideUp with {config.ease} easing
                      </Text>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    )
  },
}

// All effects showcase
export const AllEffectsShowcase: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    const effects = [
      { effect: "fade" as const, label: "Fade" },
      { effect: "slideUp" as const, label: "Slide Up" },
      { effect: "slideDown" as const, label: "Slide Down" },
      { effect: "slideLeft" as const, label: "Slide Left" },
      { effect: "slideRight" as const, label: "Slide Right" },
      { effect: "scale" as const, label: "Scale" },
      { effect: "pop" as const, label: "Pop" },
      { effect: "blur" as const, label: "Blur" },
    ]

    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"} All Effects
        </Button>

        <div className="grid grid-cols-4 gap-3">
          <AnimatedGroup>
            {show &&
              effects.map((config, index) => (
                <Animated
                  key={config.label}
                  effect={config.effect}
                  delay={index * 0.05}
                >
                  <Card className="w-36">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs">{config.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Text tag="p" size="xs">
                        Effect demo
                      </Text>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    )
  },
}

// Interactive todo-style demo
export const InteractiveDemo: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, title: "First Item", description: "This is the first item" },
      { id: 2, title: "Second Item", description: "This is the second item" },
      { id: 3, title: "Third Item", description: "This is the third item" },
    ])
    const [showItems, setShowItems] = useState(true)

    const addItem = () => {
      const newId = Math.max(...items.map((i) => i.id)) + 1
      setItems((prev) => [
        ...prev,
        {
          id: newId,
          title: `Item ${newId}`,
          description: `This is item number ${newId}`,
        },
      ])
    }

    const removeItem = (id: number) => {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setShowItems(!showItems)}>
            {showItems ? "Hide" : "Show"} Items
          </Button>
          <Button onClick={addItem} disabled={!showItems}>
            Add Item
          </Button>
        </div>

        <AnimatedGroup>
          {showItems && (
            <Animated effect="fade">
              <Stack spacing="sm">
                <AnimatedGroup>
                  {items.map((item, index) => (
                    <Animated
                      key={item.id}
                      in="slideUp"
                      out="slideRight"
                      delay={index * 0.05}
                      duration="fast"
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm">
                              {item.title}
                            </CardTitle>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Text tag="p" size="sm">
                            {item.description}
                          </Text>
                        </CardContent>
                      </Card>
                    </Animated>
                  ))}
                </AnimatedGroup>
              </Stack>
            </Animated>
          )}
        </AnimatedGroup>
      </div>
    )
  },
}
