import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-radix-gray-2",
  {
    variants: {
      intent: {
        primary:
          "bg-radix-grayDark-2 text-radix-grayDark-12 enabled:hover:bg-radix-grayDark-4 focus:ring-radix-gray-10",
        secondary:
          "bg-radix-gray-4 text-radix-gray-12 enabled:hover:bg-radix-gray-5 focus:ring-radix-gray-8",
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

export default function ButtonComponent({
  intent,
  type,
  roundness,
  disabled,
  children,
  ...props
}) {
  return (
    <button
      className={buttonVariants({ intent, type, roundness, disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
