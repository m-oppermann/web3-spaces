import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SearchIcon from "../icons/MagnifyingGlass"
import clsx from "clsx"

export default function SearchComponent() {
  const [mounted, setMounted] = useState(false)
  const [matchesMobile, setMatchesMobile] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setMounted(true)

    const matchWindow = window.matchMedia(
      "(max-width: 639px), (max-width: 390px)"
    )
    const search = document.getElementById("search") as HTMLInputElement

    matchWindow.matches && setMatchesMobile(true)

    if (!isFocused) {
      search.value = ""
    }

    const handleFocus = () => {
      setIsFocused(!isFocused)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault()
        search.focus()
      } else if (event.key === "Escape") {
        event.preventDefault()
        search.blur()
      }
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setMatchesMobile(event.matches)
    }

    matchWindow.matches && setMatchesMobile(true)

    search.addEventListener("focus", handleFocus)
    search.addEventListener("blur", handleFocus)
    window.addEventListener("keydown", handleKeyDown)
    matchWindow.addEventListener("change", handleChange)

    return () => {
      search.removeEventListener("focus", handleFocus)
      search.removeEventListener("blur", handleFocus)
      window.removeEventListener("keydown", handleKeyDown)
      matchWindow.removeEventListener("change", handleChange)
    }
  }, [isFocused])

  return (
    <motion.form
      layout
      className={clsx(
        isFocused
          ? "-sm:fixed -sm:top-6 -sm:left-6 -sm:right-6 -sm:z-10 -sm:w-auto"
          : "-sm:w-40",
        "relative box-border flex h-10 w-64 items-center rounded-xl border border-radix-gray-7 bg-white p-2 shadow-sm focus-within:border-radix-gray-8 dark:border-radix-grayDark-7 dark:bg-black dark:focus-within:border-radix-grayDark-8 -md:w-56"
      )}
      style={{ borderRadius: "12px" }}
    >
      <motion.label
        layout="position"
        htmlFor="search"
        className="pointer-events-none absolute left-3"
      >
        <SearchIcon
          className="stroke-radix-gray-10 dark:stroke-radix-grayDark-10"
          height={19}
        />
      </motion.label>
      <motion.input
        layout="position"
        type="text"
        id="search"
        onKeyDown={event => event.key === "Enter" && event.preventDefault()}
        placeholder={matchesMobile ? "Search..." : "Search to filter..."}
        className={clsx(
          !mounted && "placeholder:opacity-0",
          "w-full bg-transparent pr-12 pl-8 outline-none placeholder:text-radix-gray-9 dark:placeholder:text-radix-grayDark-9 -sm:pr-0"
        )}
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
    </motion.form>
  )
}
