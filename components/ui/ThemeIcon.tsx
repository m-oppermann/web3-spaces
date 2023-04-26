import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

import SunIcon from "../icons/Sun"
import MoonIcon from "../icons/Moon"

export default function ThemeIconComponent() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <AnimatePresence initial={false}>
      {resolvedTheme === "light" ? (
        <SunIcon
          initial={{ rotate: -45, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          style={{ originX: "center", originY: "center" }}
          className="absolute stroke-radix-gray-12 dark:invisible dark:stroke-radix-grayDark-12"
          /* className="absolute rotate-0 scale-100 stroke-radix-gray-12 transition-transform dark:invisible dark:-rotate-45 dark:scale-90 dark:stroke-radix-grayDark-12" */
          height={21}
        />
      ) : (
        <MoonIcon
          initial={{ rotate: -45, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          style={{ originX: "center", originY: "center" }}
          className="absolute stroke-radix-gray-12 dark:stroke-radix-grayDark-12"
          /* className="invisible absolute -rotate-45 scale-90 stroke-radix-gray-12 transition-transform dark:visible dark:rotate-0 dark:scale-100 dark:stroke-radix-grayDark-12" */
          height={18}
        />
      )}
    </AnimatePresence>
  )
}
