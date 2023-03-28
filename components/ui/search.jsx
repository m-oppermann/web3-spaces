import { useEffect } from "react"
import SearchIcon from "../icons/MagnifyingGlass"

export default function SearchComponent() {
  useEffect(() => {
    // Focus into input field on pressing command + k
    function handleKeyDown(event) {
      if (event.metaKey && event.key === "k") {
        event.preventDefault() // prevent default browser behavior
        document.getElementById("search").focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown) // add event listener
    return () => window.removeEventListener("keydown", handleKeyDown) // cleanup
  }, [])

  // Focus into input field on clicking on the label (⌘K)
  function handleTipClick() {
    document.getElementById("search").focus()
  }

  return (
    <form className="relative box-border flex w-72 items-center rounded-xl border border-radix-gray-7 bg-white p-2 shadow-sm focus-within:border-radix-gray-8">
      <label htmlFor="search" className="absolute left-3">
        <SearchIcon className="stroke-radix-gray-10" height={19} />
      </label>
      <input
        type="text"
        id="search"
        onKeyDown={event => event.key === "Enter" && event.preventDefault()}
        placeholder="Search to filter..."
        className="w-full bg-transparent pr-12 pl-8 outline-none placeholder:text-radix-gray-9"
        autoComplete="off"
        spellCheck="false"
      />
      <span
        onClick={handleTipClick}
        className="absolute right-2 flex h-6 cursor-default items-center rounded-md border border-radix-gray-6 bg-radix-gray-2 px-1 text-sm text-radix-gray-9"
      >
        ⌘K
      </span>
    </form>
  )
}
