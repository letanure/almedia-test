import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const dividerVariants = cva("border-border", {
  variants: {
    orientation: {
      horizontal: "w-full border-b",
      vertical: "h-full border-l",
    },
    decorative: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    decorative: false,
  },
})

interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof dividerVariants> {
  asChild?: boolean
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, decorative, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={orientation ?? undefined}
        className={cn(dividerVariants({ orientation, decorative }), className)}
        {...props}
      />
    )
  },
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }
