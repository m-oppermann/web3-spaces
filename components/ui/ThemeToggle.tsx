import { forwardRef, useEffect } from "react"
import { useTheme } from "next-themes"

import Button from "./Button"
import ThemeIcon from "./ThemeIcon"

export default forwardRef<HTMLSpanElement>(function ThemeToggleComponent(
  { ...props },
  ref
) {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light")
    }
    prefersDark.addEventListener("change", handleChange)
    return () => {
      prefersDark.removeEventListener("change", handleChange)
    }
  }, [setTheme])

  return (
    <span ref={ref} {...props}>
      <Button
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light")
        }}
        intent="secondary"
        model="icon"
        aria-label="Theme"
      >
        <ThemeIcon />
      </Button>
    </span>
  )
})
