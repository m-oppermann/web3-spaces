import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "fd3c5f53911fb970a03a7fddd0ecf6ae",
      },
    }),
  ],
  provider,
  webSocketProvider,
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

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
