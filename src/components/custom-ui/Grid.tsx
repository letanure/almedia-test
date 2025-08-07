import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-items-start",
      end: "justify-items-end",
      center: "justify-items-center",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    align: "stretch",
    justify: "stretch",
  },
})

const gridItemVariants = cva("", {
  variants: {
    span: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      6: "col-span-6",
      12: "col-span-12",
      full: "col-span-full",
    },
  },
  defaultVariants: {
    span: 1,
  },
})

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean
  as?: React.ElementType
}

interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      gap,
      align,
      justify,
      asChild = false,
      as = "div",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref}
        className={cn(gridVariants({ cols, gap, align, justify }), className)}
        {...props}
      />
    )
  },
)
Grid.displayName = "Grid"

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, asChild = false, as = "div", ...props }, ref) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref}
        className={cn(gridItemVariants({ span }), className)}
        {...props}
      />
    )
  },
)
GridItem.displayName = "GridItem"

export { Grid, GridItem, gridVariants, gridItemVariants }
