import { forwardRef } from "react"
import SearchIcon from "../icons/MagnifyingGlass"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default forwardRef<HTMLButtonElement, ButtonProps>(
  function SearchButtonComponent({ ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className="relative flex h-10 w-48 items-center rounded-xl border border-radix-gray-7 bg-white p-2 shadow-sm outline-none focus:border-radix-gray-8 dark:border-radix-grayDark-7 dark:bg-black dark:focus:border-radix-grayDark-8 -sm:w-40 -xs:w-32"
      >
        <span className="absolute left-3 flex items-center gap-2 text-radix-gray-9 dark:text-radix-grayDark-9">
          <SearchIcon
            className="stroke-radix-gray-10 dark:stroke-radix-grayDark-10"
            height={19}
          />
          Search...
        </span>
        <kbd className="absolute right-2 flex h-6 items-center rounded-md border border-radix-gray-7 bg-radix-gray-2 px-1 text-sm text-radix-gray-10 dark:border-radix-grayDark-7 dark:bg-radix-grayDark-2 dark:text-radix-grayDark-10 -sm:hidden">
          <span className="mr-[1px] text-xl">⌘</span>K
        </kbd>
      </button>
    )
  }
)
