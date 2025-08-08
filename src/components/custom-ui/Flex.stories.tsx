import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "./Flex"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Flex",
  component: Flex,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around", "evenly"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
    },
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    wrap: {
      control: { type: "select" },
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
    as: {
      control: { type: "select" },
      options: ["div", "section", "aside"],
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-yellow-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
}

export const Column: Story = {
  args: {
    direction: "column",
    gap: "sm",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-yellow-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
}

export const SpaceBetween: Story = {
  args: {
    justify: "between",
    align: "center",
    className: "w-96",
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Start</div>
        <div className="bg-green-100 p-4 rounded">Middle</div>
        <div className="bg-yellow-100 p-4 rounded">End</div>
      </>
    ),
  },
}

export const Centered: Story = {
  args: {
    justify: "center",
    align: "center",
    className: "w-96 h-32 border-2 border-dashed border-gray-300",
    children: <div className="bg-blue-100 p-4 rounded">Centered Content</div>,
  },
}

export const WithWrap: Story = {
  args: {
    wrap: "wrap",
    gap: "sm",
    className: "w-64",
    children: (
      <>
        {[
          "Item 1",
          "Item 2",
          "Item 3",
          "Item 4",
          "Item 5",
          "Item 6",
          "Item 7",
          "Item 8",
        ].map((item) => (
          <div key={item} className="bg-blue-100 p-2 rounded flex-shrink-0">
            {item}
          </div>
        ))}
      </>
    ),
  },
}

export const WithText: Story = {
  args: {
    align: "center",
    gap: "md",
    children: (
      <>
        <Text tag="span">👋</Text>
        <Text tag="h4">Welcome</Text>
        <Text tag="small" variant="muted">
          Nice to see you
        </Text>
      </>
    ),
  },
}

export const AllDirections: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <Text tag="h4">Row (default)</Text>
        <Flex gap="sm" className="border-2 border-dashed border-gray-200 p-4">
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Column</Text>
        <Flex
          direction="column"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-32"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Row Reverse</Text>
        <Flex
          direction="row-reverse"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Column Reverse</Text>
        <Flex
          direction="column-reverse"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-32"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
    </div>
  ),
}

export const AllJustify: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Text tag="h4">Start (default)</Text>
        <Flex
          justify="start"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Center</Text>
        <Flex
          justify="center"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">End</Text>
        <Flex
          justify="end"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Between</Text>
        <Flex
          justify="between"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Around</Text>
        <Flex
          justify="around"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
      <div>
        <Text tag="h4">Evenly</Text>
        <Flex
          justify="evenly"
          gap="sm"
          className="border-2 border-dashed border-gray-200 p-4 w-96"
        >
          <div className="bg-blue-100 p-2 rounded">1</div>
          <div className="bg-green-100 p-2 rounded">2</div>
          <div className="bg-yellow-100 p-2 rounded">3</div>
        </Flex>
      </div>
    </div>
  ),
}
