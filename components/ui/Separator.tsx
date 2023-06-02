import * as Separator from "@radix-ui/react-separator"
import clsx from "clsx"

interface SeparatorProps {
  className?: string
}

export default function SeparatorComponent({ className }: SeparatorProps) {
  return (
    <Separator.Root
      className={clsx(
        className,
        "rounded bg-radix-gray-7 dark:bg-radix-grayDark-7"
      )}
      orientation="vertical"
      decorative
    />
  )
}
