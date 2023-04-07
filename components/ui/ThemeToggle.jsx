import { forwardRef, useEffect } from "react"
import { useTheme } from "next-themes"

import Button from "./Button"
import ThemeIcon from "./ThemeIcon"

export default forwardRef(function ThemeToggleComponent(
  { children, ...props },
  ref
) {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
    prefersDark.addEventListener("change", event => {
      setTheme(event.matches ? "dark" : "light")
      return () => {
        prefersDark.removeEventListener("change", event)
      }
    })
  }, [setTheme])

  return (
    <span ref={ref} {...props}>
      <Button
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light")
        }}
        intent="secondary"
        type="icon"
        visibility
        aria-label="Theme"
      >
        <ThemeIcon />
      </Button>
    </span>
  )
})
