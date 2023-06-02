import * as Avatar from "@radix-ui/react-avatar"
import { forwardRef, useState, useEffect } from "react"

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  address: string
  ensAvatar?: string | null
}

export default forwardRef<HTMLSpanElement, AvatarProps>(
  function AvatarComponent({ address, ensAvatar, ...props }, ref) {
    const [mounted, setMounted] = useState(false)
    const [colors, setColors] = useState<string[]>([])

    const gradient = {
      background: `radial-gradient(100% 100% at 0% 0%, ${colors[0]} 35%, ${colors[1]} 65%, ${colors[2]} 100%)`,
    }

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
        className="relative h-10 w-10 cursor-pointer rounded-full focus:outline-none focus:ring-1 focus:ring-radix-gray-8 focus:ring-offset-2 focus:ring-offset-radix-gray-2 dark:focus:ring-radix-grayDark-8 dark:focus:ring-offset-radix-grayDark-2"
        tabIndex={0}
        role="button"
        ref={ref}
        {...props}
      >
        <div className="h-full w-full">
          <Avatar.Image
            className="absolute z-[2] h-full w-full rounded-full"
            src={ensAvatar}
            alt="ENS Avatar"
          />
          {ensAvatar && (
            <span className="absolute z-[1] h-full w-full rounded-full bg-radix-gray-4 dark:bg-radix-grayDark-4" />
          )}
          <Avatar.Fallback
            style={gradient}
            className="absolute h-full w-full rounded-full bg-radix-gray-4 dark:bg-radix-grayDark-4"
          />
        </div>
      </Avatar.Root>
    )
  }
)
