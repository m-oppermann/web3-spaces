import * as Avatar from "@radix-ui/react-avatar"
import { forwardRef, useState, useEffect } from "react"

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  address: string
  ensAvatar: string | null
  isLoadingAvatar: boolean
}

export default forwardRef<HTMLSpanElement, AvatarProps>(
  function AvatarComponent(
    { address, ensAvatar, isLoadingAvatar, ...props },
    ref
  ) {
    const [mounted, setMounted] = useState(false)
    const [colors, setColors] = useState([])

    useEffect(() => {
      setMounted(true)

      const hue = Math.floor((parseInt(address?.slice(-2), 16) * 360) / 255)
      setColors([
        `hsl(${hue - 25}, 50%, 85%)`,
        `hsl(${hue}, 95%, 65%)`,
        `hsl(${hue + 25}, 75%, 85%)`,
      ])
    }, [address])

    if (!mounted) {
      return <div className="h-10 w-10" />
    }

    return (
      <Avatar.Root
        onKeyDown={event =>
          event.key === "Enter" && (event.target as HTMLDivElement).click()
        }
        className="h-10 w-10 cursor-pointer rounded-full focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-radix-grayDark-8 dark:focus:ring-offset-radix-grayDark-2"
        tabIndex={0}
        role="button"
        ref={ref}
        {...props}
      >
        {isLoadingAvatar ? (
          <div className="h-full w-full animate-pulse rounded-full bg-radix-gray-4 dark:bg-radix-grayDark-4" />
        ) : ensAvatar !== null ? (
          <Avatar.Image
            className="h-full w-full rounded-full"
            src={ensAvatar}
            alt="ENS Avatar"
          />
        ) : (
          <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-radix-gray-4">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="url(#paint0_radial_110_2)" />
              <defs>
                <radialGradient
                  id="paint0_radial_110_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="rotate(45) scale(141.421)"
                >
                  <stop offset="0.25" stopColor={colors[0]} />
                  <stop offset="0.45" stopColor={colors[1]} />
                  <stop offset="0.75" stopColor={colors[2]} />
                </radialGradient>
              </defs>
            </svg>
          </Avatar.Fallback>
        )}
      </Avatar.Root>
    )
  }
)
