import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutComponent({ children }: LayoutProps) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Web3:Spaces</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A web3 app to share thoughts and explore new ideas."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:url" content="https://web3-spaces.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web3:Spaces" />
        <meta
          property="og:description"
          content="A web3 app to share thoughts and explore new ideas."
        />
        <meta
          property="og:image"
          content="https://web3-spaces.vercel.app/assets/preview.jpg"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Web3:Spaces" />
        <meta
          property="twitter:description"
          content="A web3 app to share thoughts and explore new ideas."
        />
        <meta
          property="twitter:image"
          content="https://web3-spaces.vercel.app/assets/preview.jpg"
        />
        {/* Favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="any"
          href="/assets/favicon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
