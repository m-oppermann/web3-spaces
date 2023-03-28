import Link from "next/link"
import Search from "./ui/search"
import Button from "./ui/button"
import Logo from "./icons/logo"
import PowerIcon from "./icons/power"

export default function HeaderComponent() {
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
        <div className="flex items-center gap-3">
          <Button>Connect</Button>
          <Button intent="secondary" type="icon">
            <PowerIcon className="absolute stroke-radix-gray-12" height={19} />
          </Button>
        </div>
      </header>
      <span className="absolute h-10 w-full bg-gradient-to-b from-radix-gray-2" />
    </>
  )
}
