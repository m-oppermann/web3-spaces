import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import Logo from "./ui/Logo"
import SearchDialog from "./ui/SearchDialog"
import Account from "./ui/Account"
import Tooltip from "./ui/Tooltip"
import ThemeToggle from "./ui/ThemeToggle"
import Separator from "./ui/Separator"

export default function HeaderComponent() {
  const [scrollTop, setScrollTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY === 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 mx-auto flex w-full max-w-[1376px] items-center justify-between bg-radix-gray-2 p-6 dark:bg-radix-grayDark-2">
        <div className="flex items-center gap-6 -sm:gap-4">
          <Link
            href="/"
            className="rounded-xl focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-radix-grayDark-8 dark:focus:ring-offset-radix-grayDark-2"
          >
            <Logo width={64} height={36} />
          </Link>
          <SearchDialog />
        </div>
        <div className="flex items-center gap-2">
          <Account />
          <Separator className={"h-7 w-px -sm:hidden"} />
          <Tooltip content="Theme">
            <ThemeToggle />
          </Tooltip>
        </div>
        <motion.div
          animate={{ opacity: scrollTop ? 0 : 1 }}
          className="pointer-events-none absolute -bottom-10 left-0 h-10 w-full bg-gradient-to-b from-radix-gray-2 to-transparent dark:from-radix-grayDark-2"
        />
      </header>
    </>
  )
}
