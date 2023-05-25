import * as Separator from "@radix-ui/react-separator"
import clsx from "clsx"

export default function SeparatorComponent({ className }) {
  return (
    <Separator.Root
      className={clsx(
        className,
        "mx-1 w-px rounded bg-radix-gray-7 dark:bg-radix-grayDark-7 -sm:hidden"
      )}
      orientation="vertical"
      decorative
    />
  )
}
