import "@/styles/globals.css"
import { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"

import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: "3786081120834325b4d89eb73896feee" }),
    publicProvider(),
  ]
)

const config = createConfig({
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
        projectId: "d767c2f488ff1178fa7f6904cddb6bfa",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          font-variant-ligatures: no-contextual;
        }
        body {
          pointer-events: inherit !important;
        }
      `}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
