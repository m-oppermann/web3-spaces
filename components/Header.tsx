import Link from "next/link"

import Logo from "./ui/Logo"
import Search from "./ui/Search"
import Account from "./ui/Account"
import Tooltip from "./ui/Tooltip"
import ThemeToggle from "./ui/ThemeToggle"
import Separator from "./ui/Separator"

export default function HeaderComponent() {
  return (
    <>
      <header className="sticky mx-auto flex max-w-[1376px] items-center justify-between p-6">
        <div className="flex items-center gap-6 -md:gap-4">
          <Link
            href="/"
            className="rounded-xl focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-radix-grayDark-8 dark:focus:ring-offset-radix-grayDark-2"
          >
            <Logo width={64} height={36} />
          </Link>
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <Account />
          {/* <Separator /> */}
          <Tooltip content="Theme">
            <ThemeToggle />
          </Tooltip>
        </div>
      </header>
      <span className="absolute h-10 w-full bg-gradient-to-b from-radix-gray-2 dark:from-radix-grayDark-2" />
    </>
  )
}
