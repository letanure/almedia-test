import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tag: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "small",
        "code",
        "strong",
        "em",
        "pre",
        "div",
        "label",
      ],
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "muted",
        "primary",
        "destructive",
        "lead",
        "bold",
        "italic",
        "underline",
        "code",
      ],
    },
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ],
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
    },
    leading: {
      control: { type: "select" },
      options: ["none", "tight", "normal", "relaxed", "loose"],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

// Semantic tag examples with defaults
export const Heading1: Story = {
  args: {
    tag: "h1",
    children: "This is a Heading 1",
  },
}

export const Heading2: Story = {
  args: {
    tag: "h2",
    children: "This is a Heading 2",
  },
}

export const Heading3: Story = {
  args: {
    tag: "h3",
    children: "This is a Heading 3",
  },
}

export const Paragraph: Story = {
  args: {
    tag: "p",
    children:
      "This is a paragraph with the default styling. It uses relaxed line height and normal font weight.",
  },
}

export const SmallText: Story = {
  args: {
    tag: "small",
    children: "This is small text with muted color",
  },
}

export const CodeText: Story = {
  args: {
    tag: "code",
    children: "console.log('Hello World')",
  },
}

export const StrongText: Story = {
  args: {
    tag: "strong",
    children: "This text is bold by default",
  },
}

export const EmphasisText: Story = {
  args: {
    tag: "em",
    children: "This text is italic by default",
  },
}

export const PreformattedText: Story = {
  args: {
    tag: "pre",
    children: `function example() {
  console.log("Hello, World!");
  return true;
}`,
  },
}

// Override examples
export const HeadingWithCustomColor: Story = {
  args: {
    tag: "h1",
    variant: "primary",
    children: "Heading with Primary Color",
  },
}

export const ParagraphCentered: Story = {
  args: {
    tag: "p",
    align: "center",
    children: "This paragraph is center-aligned",
  },
}

export const CustomSizeAndWeight: Story = {
  args: {
    tag: "p",
    size: "xl",
    weight: "semibold",
    children: "Custom sized paragraph with semibold weight",
  },
}

export const MutedLargeText: Story = {
  args: {
    tag: "div",
    variant: "muted",
    size: "lg",
    children: "Large muted text using div tag",
  },
}

// Variants showcase
export const AllVariants: Story = {
  args: {
    tag: "p",
  },
  render: () => (
    <div className="space-y-4">
      <Text tag="p" variant="default">
        Default variant
      </Text>
      <Text tag="p" variant="muted">
        Muted variant
      </Text>
      <Text tag="p" variant="primary">
        Primary variant
      </Text>
      <Text tag="p" variant="destructive">
        Destructive variant
      </Text>
      <Text tag="p" variant="lead">
        Lead variant
      </Text>
      <Text tag="p" variant="bold">
        Bold variant
      </Text>
      <Text tag="p" variant="italic">
        Italic variant
      </Text>
      <Text tag="p" variant="underline">
        Underline variant
      </Text>
      <Text tag="code" variant="code">
        Code variant
      </Text>
    </div>
  ),
}

// Sizes showcase
export const AllSizes: Story = {
  args: {
    tag: "div",
  },
  render: () => (
    <div className="space-y-2">
      <Text tag="div" size="xs">
        Extra small text
      </Text>
      <Text tag="div" size="sm">
        Small text
      </Text>
      <Text tag="div" size="base">
        Base text
      </Text>
      <Text tag="div" size="lg">
        Large text
      </Text>
      <Text tag="div" size="xl">
        Extra large text
      </Text>
      <Text tag="div" size="2xl">
        2X large text
      </Text>
      <Text tag="div" size="3xl">
        3X large text
      </Text>
      <Text tag="div" size="4xl">
        4X large text
      </Text>
      <Text tag="div" size="5xl">
        5X large text
      </Text>
      <Text tag="div" size="6xl">
        6X large text
      </Text>
    </div>
  ),
}

// Alignment showcase
export const AllAlignments: Story = {
  args: {
    tag: "p",
  },
  render: () => (
    <div className="w-96 space-y-4 border p-4">
      <Text tag="p" align="left">
        Left aligned text
      </Text>
      <Text tag="p" align="center">
        Center aligned text
      </Text>
      <Text tag="p" align="right">
        Right aligned text
      </Text>
      <Text tag="p" align="justify">
        Justify aligned text that spans multiple lines to show how the text
        distributes evenly across the width of the container.
      </Text>
    </div>
  ),
}
