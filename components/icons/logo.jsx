export default function LogoComponent({ className, ...props }) {
  return (
    <svg
      className={className}
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
          <stop offset="0.25" stop-color="#FBBF24" />
          <stop offset="0.447917" stop-color="#99F6E4" />
          <stop offset="0.729167" stop-color="#2563EB" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="150"
          y1="100"
          x2="100"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#292524" />
          <stop offset="1" stop-color="#292524" stop-opacity="0.25" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="176"
          y1="93.5"
          x2="151.494"
          y2="49.6645"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#57534E" />
          <stop offset="1" stop-color="#57534E" stop-opacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  )
}
