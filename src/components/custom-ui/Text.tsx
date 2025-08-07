import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      lead: "text-xl font-normal",
      bold: "font-bold",
      italic: "italic",
      underline: "underline underline-offset-4",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
})

// Tag-specific defaults
const tagDefaults = {
  h1: {
    size: "4xl" as const,
    weight: "bold" as const,
    leading: "tight" as const,
  },
  h2: {
    size: "3xl" as const,
    weight: "bold" as const,
    leading: "tight" as const,
  },
  h3: {
    size: "2xl" as const,
    weight: "semibold" as const,
    leading: "tight" as const,
  },
  h4: {
    size: "xl" as const,
    weight: "semibold" as const,
    leading: "normal" as const,
  },
  h5: {
    size: "lg" as const,
    weight: "medium" as const,
    leading: "normal" as const,
  },
  h6: {
    size: "base" as const,
    weight: "medium" as const,
    leading: "normal" as const,
  },
  p: {
    size: "base" as const,
    weight: "normal" as const,
    leading: "relaxed" as const,
  },
  span: {
    size: "base" as const,
    weight: "normal" as const,
    leading: "normal" as const,
  },
  small: {
    size: "sm" as const,
    weight: "normal" as const,
    variant: "muted" as const,
  },
  code: { size: "sm" as const, variant: "code" as const },
  strong: { weight: "bold" as const },
  em: { variant: "italic" as const },
  pre: { size: "sm" as const },
}

type TagType = keyof typeof tagDefaults | "div" | "label"

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<VariantProps<typeof textVariants>> {
  tag: TagType
  asChild?: boolean
}

export function Text({
  tag,
  variant,
  size,
  weight,
  align,
  leading,
  asChild = false,
  className,
  ...props
}: TextProps) {
  // Get defaults for the tag
  const defaults = (
    tag in tagDefaults ? tagDefaults[tag as keyof typeof tagDefaults] : {}
  ) as {
    variant?: VariantProps<typeof textVariants>["variant"]
    size?: VariantProps<typeof textVariants>["size"]
    weight?: VariantProps<typeof textVariants>["weight"]
    leading?: VariantProps<typeof textVariants>["leading"]
  }

  // Merge props with tag defaults (props override defaults)
  const finalVariant = variant ?? defaults.variant ?? "default"
  const finalSize = size ?? defaults.size ?? "base"
  const finalWeight = weight ?? defaults.weight ?? "normal"
  const finalAlign = align ?? "left"
  const finalLeading = leading ?? defaults.leading ?? "normal"

  const Comp = asChild ? Slot : tag

  return (
    <Comp
      className={`${textVariants({
        variant: finalVariant,
        size: finalSize,
        weight: finalWeight,
        align: finalAlign,
        leading: finalLeading,
      })} ${className || ""}`.trim()}
      {...props}
    />
  )
}
Text.displayName = "Text"
