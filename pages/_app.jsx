import "@/styles/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          font-variant-ligatures: no-contextual;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}