import { cva } from "class-variance-authority"
import { forwardRef } from "react"

const buttonVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-offset-radix-grayDark-2",
  {
    variants: {
      intent: {
        primary:
          "bg-radix-grayDark-2 text-radix-grayDark-12 focus:bg-radix-grayDark-4 focus:ring-radix-gray-10 enabled:hover:bg-radix-grayDark-4 dark:bg-radix-gray-2 dark:text-radix-gray-12 dark:focus:bg-radix-gray-4 dark:focus:ring-radix-grayDark-10 dark:enabled:hover:bg-radix-gray-4",
        secondary:
          "border border-radix-grayA-8 text-radix-gray-12 focus:bg-radix-grayA-4 focus:ring-radix-grayA-8 enabled:hover:bg-radix-grayA-4 dark:border-radix-grayDarkA-8 dark:text-radix-grayDark-12 dark:focus:bg-radix-grayDarkA-4 dark:focus:ring-radix-grayDarkA-8 dark:enabled:hover:bg-radix-grayDarkA-4",
      },
      type: {
        default: "py-2 px-4",
        icon: "w-10 h-10",
      },
      roundness: {
        rounded: "rounded-xl",
        pill: "rounded-full",
      },
      visibility: {
        true: "-sm:hidden",
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
  { intent, type, roundness, visibility, disabled, children, ...props },
  ref
) {
  return (
    <>
      <button
        className={buttonVariants({
          intent,
          type,
          roundness,
          visibility,
          disabled,
        })}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>

      {/* <button className=""></button> */}
    </>
  )
})
