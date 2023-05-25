import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { forwardRef } from "react"
import { motion } from "framer-motion"

import MetaMaskIcon from "../icons/MetaMask"
import CoinbaseWalletIcon from "../icons/CoinbaseWallet"
import WalletConnectIcon from "../icons/WalletConnect"
import LoadingIndicatior from "../icons/LoadingIndicator"

import { useConnect } from "wagmi"

interface ConnectDropdownProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default forwardRef<HTMLButtonElement, ConnectDropdownProps>(
  function ConnectModalComponent({ children, ...props }, ref) {
    const { connect, connectors, isLoading, pendingConnector, status } =
      useConnect()

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger ref={ref} {...props} asChild>
          {children}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <div className="relative z-10">
            <DropdownMenu.Content sideOffset={8} align="end" asChild>
              <motion.div
                initial={{ y: -5, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className="flex w-80 flex-col gap-y-2.5 rounded-2xl border border-radix-gray-7 bg-white p-2.5 text-radix-gray-12 shadow-sm dark:border-radix-grayDark-7 dark:bg-black dark:text-radix-gray-1"
              >
                {connectors.map(connector => (
                  <DropdownMenu.Item
                    key={connector.id}
                    onSelect={(event: Event) => {
                      event.preventDefault()
                      connect({ connector })
                    }}
                    disabled={isLoading}
                    asChild
                  >
                    {connector.ready && (
                      <div className="relative flex h-12 cursor-pointer select-none items-center justify-center rounded-xl bg-radix-gray-2 font-medium outline-none enabled:cursor-pointer data-[disabled]:cursor-not-allowed data-[highlighted]:bg-radix-gray-4 dark:bg-radix-grayDark-2 dark:data-[highlighted]:bg-radix-grayDark-4">
                        {isLoading && connector.id === pendingConnector?.id ? (
                          <LoadingIndicatior
                            height={20}
                            className="absolute left-3 w-[26px] animate-spin opacity-75"
                          />
                        ) : (
                          <span className="absolute left-3">
                            {connector.name === "MetaMask" ? (
                              <MetaMaskIcon height={26} />
                            ) : connector.name === "Coinbase Wallet" ? (
                              <CoinbaseWalletIcon height={26} />
                            ) : connector.name === "WalletConnect" ? (
                              <WalletConnectIcon height={26} />
                            ) : null}
                          </span>
                        )}
                        {connector.name}
                      </div>
                    )}
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Item disabled={isLoading} asChild>
                  <div
                    onClick={() => {
                      window.open("https://ethereum.org/en/wallets/", "_blank")
                    }}
                    className="flex h-12 cursor-ne-resize select-none items-center justify-center rounded-xl font-medium outline-none enabled:cursor-pointer data-[disabled]:cursor-not-allowed data-[highlighted]:bg-radix-gray-2 dark:data-[highlighted]:bg-radix-grayDark-2"
                  >
                    {"I don't have a wallet"}
                  </div>
                </DropdownMenu.Item>
              </motion.div>
            </DropdownMenu.Content>
          </div>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
