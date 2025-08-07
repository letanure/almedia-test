import type { Meta, StoryObj } from "@storybook/react"
import { Container } from "./Container"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
    as: {
      control: { type: "select" },
      options: ["div", "main", "section", "article"],
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "md",
    className: "bg-blue-50 min-h-32",
    children: (
      <Text tag="p" align="center">
        This is a medium container (max-w-4xl)
      </Text>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    padding: "md",
    className: "bg-green-50 min-h-32",
    children: (
      <Text tag="p" align="center">
        This is a small container (max-w-2xl) with medium padding
      </Text>
    ),
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    padding: "lg",
    className: "bg-yellow-50 min-h-32",
    children: (
      <Text tag="p" align="center">
        This is a large container (max-w-6xl) with large padding
      </Text>
    ),
  },
}

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    padding: "lg",
    className: "bg-purple-50 min-h-32",
    children: (
      <Text tag="p" align="center">
        This is an extra large container (max-w-7xl) with large padding
      </Text>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    size: "full",
    padding: "md",
    className: "bg-pink-50 min-h-32",
    children: (
      <Text tag="p" align="center">
        This is a full width container (max-w-full) with medium padding
      </Text>
    ),
  },
}

export const WithContent: Story = {
  args: {
    size: "lg",
    padding: "lg",
    className: "bg-white",
    children: (
      <div className="space-y-6">
        <Text tag="h1" align="center">
          Welcome to Our Application
        </Text>
        <Text tag="p" size="lg" align="center" variant="muted">
          This is a hero section inside a large container with proper spacing
          and typography.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <Text tag="h3">Feature One</Text>
            <Text tag="p" variant="muted">
              Description of the first feature with some details about what it
              does.
            </Text>
          </div>
          <div className="text-center">
            <Text tag="h3">Feature Two</Text>
            <Text tag="p" variant="muted">
              Description of the second feature with some details about what it
              does.
            </Text>
          </div>
          <div className="text-center">
            <Text tag="h3">Feature Three</Text>
            <Text tag="p" variant="muted">
              Description of the third feature with some details about what it
              does.
            </Text>
          </div>
        </div>
      </div>
    ),
  },
}

export const AllSizes: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text tag="h4" className="mb-4">
          Small (max-w-2xl)
        </Text>
        <Container size="sm" className="bg-blue-50 min-h-16">
          <Text tag="p" align="center">
            Small container content
          </Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Medium (max-w-4xl) - Default
        </Text>
        <Container size="md" className="bg-green-50 min-h-16">
          <Text tag="p" align="center">
            Medium container content
          </Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Large (max-w-6xl)
        </Text>
        <Container size="lg" className="bg-yellow-50 min-h-16">
          <Text tag="p" align="center">
            Large container content
          </Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Extra Large (max-w-7xl)
        </Text>
        <Container size="xl" className="bg-purple-50 min-h-16">
          <Text tag="p" align="center">
            Extra large container content
          </Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Full Width (max-w-full)
        </Text>
        <Container size="full" className="bg-pink-50 min-h-16">
          <Text tag="p" align="center">
            Full width container content
          </Text>
        </Container>
      </div>
    </div>
  ),
}

export const AllPadding: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text tag="h4" className="mb-4">
          No Padding
        </Text>
        <Container
          size="md"
          padding="none"
          className="bg-gray-100 border-2 border-dashed border-gray-300"
        >
          <Text tag="p">Content with no padding</Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Small Padding (px-4)
        </Text>
        <Container
          size="md"
          padding="sm"
          className="bg-gray-100 border-2 border-dashed border-gray-300"
        >
          <Text tag="p">Content with small padding</Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Medium Padding (px-6)
        </Text>
        <Container
          size="md"
          padding="md"
          className="bg-gray-100 border-2 border-dashed border-gray-300"
        >
          <Text tag="p">Content with medium padding</Text>
        </Container>
      </div>
      <div>
        <Text tag="h4" className="mb-4">
          Large Padding (px-8)
        </Text>
        <Container
          size="md"
          padding="lg"
          className="bg-gray-100 border-2 border-dashed border-gray-300"
        >
          <Text tag="p">Content with large padding</Text>
        </Container>
      </div>
    </div>
  ),
}
