import { useState } from "react"
import Link from "next/link"

import Search from "./ui/Search"
import Button from "./ui/Button"
import Account from "./ui/Account"
import Tooltip from "./ui/Tooltip"
import Separator from "./ui/Separator"
import ThemeToggle from "./ui/ThemeToggle"

import Logo from "./icons/Logo"
import PowerIcon from "./icons/Power"
import SunIcon from "./icons/Sun"
import MoonIcon from "./icons/Moon"

export default function HeaderComponent() {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <>
      <header className="sticky mx-auto flex max-w-[1376px] items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="rounded-xl focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-radix-grayDark-8 dark:focus:ring-offset-radix-grayDark-2"
          >
            <Logo height={36} />
          </Link>
          <Search />
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Account />
              <Tooltip content="Disconnect">
                <Button intent="primary" type="icon">
                  <PowerIcon
                    className="absolute stroke-radix-gray-1 dark:stroke-radix-grayDark-1"
                    height={18}
                  />
                </Button>
              </Tooltip>
            </>
          ) : (
            <Button>Connect</Button>
          )}
          <Separator />
          <Tooltip content="Theme">
            <ThemeToggle
              trigger={
                <Button intent="secondary" type="icon">
                  <SunIcon
                    className="absolute scale-100 stroke-radix-gray-12 dark:scale-0 dark:stroke-radix-grayDark-12"
                    height={21}
                  />
                  <MoonIcon
                    className="absolute scale-0 stroke-radix-gray-12 dark:scale-100 dark:stroke-radix-grayDark-12"
                    height={18}
                  />
                </Button>
              }
            ></ThemeToggle>
          </Tooltip>
        </div>
      </header>
      <span className="absolute h-10 w-full bg-gradient-to-b from-radix-gray-2 dark:from-radix-grayDark-2" />
    </>
  )
}
