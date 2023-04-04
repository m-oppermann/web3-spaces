import * as Separator from "@radix-ui/react-separator"

export default function SeparatorComponent() {
  return (
    <Separator.Root
      className="mx-1 h-7 w-px rounded bg-radix-gray-7 dark:bg-radix-grayDark-7"
      orientation="vertical"
      decorative
    />
  )
}
