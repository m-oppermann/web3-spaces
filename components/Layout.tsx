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
        <title>Web3:Spaces</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A web3 way of exploring and sharing new ideas."
        />
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
