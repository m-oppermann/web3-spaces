import { cva } from "class-variance-authority"
import { forwardRef } from "react"

const buttonVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-offset-radix-grayDark-2",
  {
    variants: {
      intent: {
        primary:
          "bg-radix-grayDark-2 text-radix-grayDark-12 enabled:hover:bg-radix-grayDark-4 focus:bg-radix-grayDark-4 focus:ring-radix-gray-10 dark:bg-radix-gray-2 dark:text-radix-gray-12 dark:enabled:hover:bg-radix-gray-4 dark:focus:bg-radix-gray-4 dark:focus:ring-radix-grayDark-10",
        secondary:
          "border border-radix-gray-8 text-radix-gray-12 enabled:hover:bg-radix-gray-4 focus:bg-radix-gray-4 focus:ring-radix-gray-8 dark:border-radix-grayDark-8 dark:text-radix-grayDark-12 dark:enabled:hover:bg-radix-grayDark-4 dark:focus:bg-radix-grayDark-4 dark:focus:ring-radix-grayDark-8",
      },
      type: {
        default: "py-2 px-4",
        icon: "w-10 h-10",
      },
      roundness: {
        rounded: "rounded-xl",
        pill: "rounded-full",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      intent: "primary",
      type: "default",
      roundness: "pill",
      disabled: false,
    },
  }
)

export default forwardRef(function ButtonComponent(
  { intent, type, roundness, disabled, children, ...props },
  ref
) {
  return (
    <button
      className={buttonVariants({ intent, type, roundness, disabled })}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})
