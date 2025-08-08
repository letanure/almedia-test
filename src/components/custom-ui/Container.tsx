import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
  },
  defaultVariants: {
    size: "md",
    padding: "none",
  },
})

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size, padding, asChild = false, as = "div", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    )
  },
)
Container.displayName = "Container"

export { Container, containerVariants }
