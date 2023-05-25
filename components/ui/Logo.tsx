import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function LogoComponent({ ...props }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-16" />
  }

  return (
    <svg
      viewBox="0 0 176 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill="url(#paint0_radial_0_1)" />
      <path
        d="M100 100V0C127.614 0 150 22.3858 150 50C150 77.6142 127.614 100 100 100Z"
        fill="url(#paint1_linear_0_1)"
      />
      <path
        d="M150 93.6218V7C165.543 15.6452 176 31.8038 176 50.3109C176 68.8179 165.543 84.9765 150 93.6218Z"
        fill="url(#paint2_linear_0_1)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45) scale(141.421)"
        >
          <stop offset="0.25" stopColor="#C6DFEC" />
          <stop offset="0.45" stopColor="#517BFB" />
          <stop offset="0.70" stopColor="#C6BCF5" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="150"
          y1="100"
          x2="100"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171717" />
          <stop offset="1" stopColor="#c7c7c7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="176"
          y1="93.5"
          x2="151.494"
          y2="49.6645"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={resolvedTheme === "light" ? "#6f6f6f" : "#171717"} />
          <stop
            offset="1"
            stopColor={resolvedTheme === "light" ? "#dbdbdb" : "#8f8f8f"}
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
