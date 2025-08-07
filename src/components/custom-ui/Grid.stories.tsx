import type { Meta, StoryObj } from "@storybook/react"
import { Grid, GridItem } from "./Grid"

const meta: Meta<typeof Grid> = {
  title: "Custom UI/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 6, 12],
    },
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "stretch"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

const DemoBox = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`rounded-md bg-slate-100 p-4 text-center text-sm ${className || ""}`}
  >
    {children}
  </div>
)

export const Default: Story = {
  args: {
    cols: 2,
    gap: "md",
  },
  render: (args) => (
    <Grid {...args}>
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Grid>
  ),
}

export const MixedColumns: Story = {
  args: {
    cols: 12,
    gap: "md",
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem span={6}>
        <DemoBox>First Name (half)</DemoBox>
      </GridItem>
      <GridItem span={6}>
        <DemoBox>Last Name (half)</DemoBox>
      </GridItem>
      <GridItem span={12}>
        <DemoBox>Email (full)</DemoBox>
      </GridItem>
      <GridItem span={4}>
        <DemoBox>City (third)</DemoBox>
      </GridItem>
      <GridItem span={4}>
        <DemoBox>State (third)</DemoBox>
      </GridItem>
      <GridItem span={4}>
        <DemoBox>ZIP (third)</DemoBox>
      </GridItem>
    </Grid>
  ),
}

export const ResponsiveLayout: Story = {
  args: {
    cols: 3,
    gap: "lg",
  },
  render: (args) => (
    <Grid {...args}>
      <DemoBox>Card 1</DemoBox>
      <DemoBox>Card 2</DemoBox>
      <DemoBox>Card 3</DemoBox>
      <DemoBox>Card 4</DemoBox>
      <DemoBox>Card 5</DemoBox>
      <DemoBox>Card 6</DemoBox>
    </Grid>
  ),
}

export const WithSpanVariations: Story = {
  args: {
    cols: 6,
    gap: "sm",
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem span={1}>
        <DemoBox>1</DemoBox>
      </GridItem>
      <GridItem span={2}>
        <DemoBox>2 cols</DemoBox>
      </GridItem>
      <GridItem span={3}>
        <DemoBox>3 cols</DemoBox>
      </GridItem>
      <GridItem span={6}>
        <DemoBox>Full width (6 cols)</DemoBox>
      </GridItem>
      <GridItem span={4}>
        <DemoBox>4 cols</DemoBox>
      </GridItem>
      <GridItem span={2}>
        <DemoBox>2</DemoBox>
      </GridItem>
    </Grid>
  ),
}
