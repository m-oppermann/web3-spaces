import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { forwardRef } from "react"
import { useTheme } from "next-themes"
import { clsx } from "clsx"

import Button from "./Button"
import ThemeIcon from "./ThemeIcon"

import SunIcon from "../icons/Sun"
import MoonIcon from "../icons/Moon"
import SettingsIcon from "../icons/Settings"

export default forwardRef<HTMLButtonElement>(function ThemeDropdownComponent(
  { ...props },
  ref
) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger ref={ref} {...props} asChild>
        <Button intent="secondary" model="icon" aria-label="Theme">
          <ThemeIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onCloseAutoFocus={event => event.preventDefault()}
          className="z-10 flex w-36 flex-col rounded-xl border border-radix-gray-7 bg-white py-2 text-radix-gray-12 shadow-sm dark:border-radix-grayDark-7 dark:bg-black dark:text-radix-gray-1"
          sideOffset={8}
          align="end"
        >
          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem
              className={clsx(
                "relative mx-2 flex cursor-pointer select-none items-center rounded-lg py-1 pl-10 text-base outline-none enabled:cursor-pointer data-[disabled]:pointer-events-none data-[highlighted]:bg-radix-gray-2 dark:data-[highlighted]:bg-radix-grayDark-2",
                theme === "light" && "bg-radix-gray-4 dark:bg-radix-grayDark-4"
              )}
              value="light"
              disabled={theme === "light"}
            >
              <SunIcon
                className="absolute left-2 stroke-radix-gray-12 dark:stroke-radix-grayDark-12"
                height={21}
              />
              Light
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className={clsx(
                "relative mx-2 flex cursor-pointer select-none items-center rounded-lg py-1 pl-10 text-base outline-none enabled:cursor-pointer data-[disabled]:pointer-events-none data-[highlighted]:bg-radix-gray-2 dark:data-[highlighted]:bg-radix-grayDark-2",
                theme === "dark" && "bg-radix-gray-4 dark:bg-radix-grayDark-4"
              )}
              value="dark"
              disabled={theme === "dark"}
            >
              <MoonIcon
                className="absolute left-2 stroke-radix-gray-12 dark:stroke-radix-grayDark-12"
                height={18.5}
                width={21}
              />
              Dark
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className={clsx(
                "relative mx-2 flex cursor-pointer select-none items-center rounded-lg py-1 pl-10 text-base outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-radix-gray-2 dark:data-[highlighted]:bg-radix-grayDark-2",
                theme === "system" && "bg-radix-gray-4 dark:bg-radix-grayDark-4"
              )}
              value="system"
              disabled={theme === "system"}
            >
              <SettingsIcon
                className="absolute left-2 stroke-radix-gray-12 dark:stroke-radix-grayDark-12"
                height={21}
                strokeWidth={1.75}
              />
              System
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
})
