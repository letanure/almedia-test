import type { Meta, StoryObj } from "@storybook/react"
import { Stack } from "./Stack"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch"],
    },
    as: {
      control: { type: "select" },
      options: ["div", "section", "aside"],
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    spacing: "md",
    align: "stretch",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-yellow-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
}

export const NoSpacing: Story = {
  args: {
    spacing: "none",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-yellow-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
}

export const LargeSpacing: Story = {
  args: {
    spacing: "xl",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-yellow-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
}

export const CenterAligned: Story = {
  args: {
    spacing: "md",
    align: "center",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded w-32">Small item</div>
        <div className="bg-green-100 p-4 rounded w-48">Medium item</div>
        <div className="bg-yellow-100 p-4 rounded w-24">Tiny item</div>
      </>
    ),
  },
}

export const WithText: Story = {
  args: {
    spacing: "sm",
    children: (
      <>
        <Text tag="h3">Stack Title</Text>
        <Text tag="p">This is a paragraph in the stack with some content.</Text>
        <Text tag="small" variant="muted">
          Small muted text at the bottom
        </Text>
      </>
    ),
  },
}

export const AllSpacing: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text tag="h4">None</Text>
        <Stack spacing="none">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
      <div>
        <Text tag="h4">Extra Small (xs)</Text>
        <Stack spacing="xs">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
      <div>
        <Text tag="h4">Small (sm)</Text>
        <Stack spacing="sm">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
      <div>
        <Text tag="h4">Medium (md)</Text>
        <Stack spacing="md">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
      <div>
        <Text tag="h4">Large (lg)</Text>
        <Stack spacing="lg">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
      <div>
        <Text tag="h4">Extra Large (xl)</Text>
        <Stack spacing="xl">
          <div className="bg-blue-100 p-2 rounded">Item 1</div>
          <div className="bg-green-100 p-2 rounded">Item 2</div>
          <div className="bg-yellow-100 p-2 rounded">Item 3</div>
        </Stack>
      </div>
    </div>
  ),
}
