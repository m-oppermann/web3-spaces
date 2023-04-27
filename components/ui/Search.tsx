import { useState, useEffect } from "react"
import SearchIcon from "../icons/MagnifyingGlass"
import clsx from "clsx"

export default function SearchComponent() {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const search = document.getElementById("search") as HTMLInputElement

    if (!isFocused) {
      search.value = ""
    }

    function handleFocus() {
      setIsFocused(!isFocused)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey && event.key === "k") {
        event.preventDefault()
        search.focus()
      } else if (event.key === "Escape") {
        event.preventDefault()
        search.blur()
      }
    }

    search.addEventListener("focus", handleFocus)
    search.addEventListener("blur", handleFocus)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      search.removeEventListener("focus", handleFocus)
      search.removeEventListener("blur", handleFocus)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFocused])

  return (
    <form className="relative box-border flex w-72 items-center rounded-xl border border-radix-gray-7 bg-white p-2 shadow-sm focus-within:border-radix-gray-8 dark:border-radix-grayDark-7 dark:bg-black dark:focus-within:border-radix-grayDark-8 -md:w-56  -sm:fixed -sm:bottom-4 -sm:left-6 -sm:right-6 -sm:w-auto">
      <label htmlFor="search" className="pointer-events-none absolute left-3">
        <SearchIcon
          className="stroke-radix-gray-10 dark:stroke-radix-grayDark-10"
          height={19}
        />
      </label>
      <input
        type="text"
        id="search"
        onKeyDown={event => event.key === "Enter" && event.preventDefault()}
        placeholder="Search to filter..."
        className="w-full bg-transparent pr-12 pl-8 outline-none placeholder:text-radix-gray-9 dark:placeholder:text-radix-grayDark-9"
        autoComplete="off"
        spellCheck="false"
      />
      <span
        className={clsx(
          !isFocused && "pointer-events-none",
          "absolute right-2 flex h-6 cursor-pointer items-center rounded-md border border-radix-gray-7 bg-radix-gray-2 px-1 text-sm text-radix-gray-9 dark:border-radix-grayDark-7 dark:bg-radix-grayDark-2 dark:text-radix-grayDark-9 -sm:hidden"
        )}
      >
        {isFocused ? "ESC" : "⌘K"}
      </span>
    </form>
  )
}
