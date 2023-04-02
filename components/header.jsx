import { useState } from "react"
import Link from "next/link"
import Search from "./ui/Search"
import Button from "./ui/Button"
import Account from "./ui/Account"
import Tooltip from "./ui/Tooltip"
import Separator from "./ui/Separator"
import Logo from "./icons/Logo"
import PowerIcon from "./icons/Power"
import SunIcon from "./icons/Sun"

export default function HeaderComponent() {
  const [isConnected, setIsConnected] = useState(true)

  return (
    <>
      <header className="sticky mx-auto flex max-w-[1376px] items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="rounded-xl focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2"
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
                    className="absolute stroke-radix-gray-1"
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
            <Button intent="secondary" type="icon">
              <SunIcon className="absolute stroke-radix-gray-12" height={21} />
            </Button>
          </Tooltip>
        </div>
      </header>
      <span className="absolute h-10 w-full bg-gradient-to-b from-radix-gray-2" />
    </>
  )
}
