import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const stackVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      none: "",
      xs: "space-y-1",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
      xl: "space-y-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    spacing: "md",
    align: "stretch",
  },
})

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { className, spacing, align, asChild = false, as = "div", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ spacing, align }), className)}
        {...props}
      />
    )
  },
)
Stack.displayName = "Stack"

export { Stack, stackVariants }
