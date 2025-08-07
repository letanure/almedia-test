import type { Meta, StoryObj } from "@storybook/react"
import { Divider } from "./Divider"
import { Flex } from "./Flex"
import { Stack } from "./Stack"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orientation: "horizontal",
    decorative: false,
    className: "w-96",
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-96",
    children: "Demo content",
  },
  render: (args) => (
    <Stack spacing="md">
      <Text tag="p">Content above the divider</Text>
      <Divider {...args} />
      <Text tag="p">Content below the divider</Text>
    </Stack>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-24",
    children: "Demo content",
  },
  render: (args) => (
    <Flex align="center" gap="md">
      <Text tag="p">Left content</Text>
      <Divider {...args} />
      <Text tag="p">Right content</Text>
    </Flex>
  ),
}

export const Decorative: Story = {
  args: {
    decorative: true,
    className: "w-96",
    children: "Demo content",
  },
  render: (args) => (
    <Stack spacing="md">
      <Text tag="p">
        When decorative is true, the divider has role="presentation" instead of
        role="separator"
      </Text>
      <Divider {...args} />
      <Text tag="p">This is useful for purely visual separators</Text>
    </Stack>
  ),
}

export const InContent: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <Text tag="h2">Section One</Text>
        <Text tag="p">
          This is the first section with some content. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </Text>
      </div>

      <Divider />

      <div>
        <Text tag="h2">Section Two</Text>
        <Text tag="p">
          This is the second section separated by a horizontal divider. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
      </div>

      <Divider />

      <div>
        <Text tag="h2">Section Three</Text>
        <Text tag="p">
          This is the third section, also separated by dividers. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum.
        </Text>
      </div>
    </div>
  ),
}

export const InSidebar: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <Flex gap="md" className="h-64">
      <div className="w-48 bg-gray-50 p-4">
        <Stack spacing="sm">
          <Text tag="h4">Navigation</Text>
          <Text tag="p" size="sm">
            Home
          </Text>
          <Text tag="p" size="sm">
            About
          </Text>
          <Text tag="p" size="sm">
            Services
          </Text>
        </Stack>
      </div>

      <Divider orientation="vertical" />

      <div className="flex-1 p-4">
        <Text tag="h3">Main Content Area</Text>
        <Text tag="p" variant="muted">
          This is the main content area separated from the sidebar by a vertical
          divider.
        </Text>
      </div>
    </Flex>
  ),
}

export const CustomStyling: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <Stack spacing="lg" className="max-w-md">
      <div>
        <Text tag="h4">Default Border</Text>
        <Divider className="my-4" />
        <Text tag="p" size="sm" variant="muted">
          Default border color and thickness
        </Text>
      </div>

      <div>
        <Text tag="h4">Thick Red Border</Text>
        <Divider className="my-4 border-red-500 border-2" />
        <Text tag="p" size="sm" variant="muted">
          Custom thick red border
        </Text>
      </div>

      <div>
        <Text tag="h4">Dashed Border</Text>
        <Divider className="my-4 border-dashed" />
        <Text tag="p" size="sm" variant="muted">
          Dashed border style
        </Text>
      </div>

      <div>
        <Text tag="h4">Dotted Blue Border</Text>
        <Divider className="my-4 border-dotted border-blue-500" />
        <Text tag="p" size="sm" variant="muted">
          Dotted blue border style
        </Text>
      </div>
    </Stack>
  ),
}
