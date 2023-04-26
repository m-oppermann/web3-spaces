import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { forwardRef } from "react"

import MetaMaskIcon from "../icons/MetaMask"
import CoinbaseWalletIcon from "../icons/CoinbaseWallet"
import WalletConnectIcon from "../icons/WalletConnect"
import LoadingIndicatior from "../icons/LoadingIndicator"

import { useConnect } from "wagmi"

export default forwardRef(function ConnectModalComponent(
  { children, ...props },
  ref
) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger ref={ref} {...props} asChild>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="flex w-[232px] flex-col gap-y-2 rounded-xl border border-radix-gray-7 bg-white p-2 text-radix-gray-12 shadow-sm dark:border-radix-grayDark-7 dark:bg-black dark:text-radix-gray-1"
          align="end"
        >
          {connectors.map(connector => (
            <DropdownMenu.Item
              key={connector.id}
              onSelect={event => {
                event.preventDefault()
                connect({ connector })
              }}
              disabled={isLoading}
              asChild
            >
              {connector.ready && (
                <div className="flex h-12 cursor-pointer select-none items-center justify-between rounded-lg bg-radix-gray-2 py-2.5 px-3.5 text-base font-medium outline-none enabled:cursor-pointer data-[disabled]:cursor-not-allowed data-[highlighted]:bg-radix-gray-4 dark:bg-radix-grayDark-2 dark:data-[highlighted]:bg-radix-grayDark-4">
                  {connector.name}
                  {isLoading && connector.id === pendingConnector?.id ? (
                    <LoadingIndicatior
                      height={20}
                      className="w-[26px] animate-spin opacity-75"
                    />
                  ) : (
                    <span>
                      {connector.name === "MetaMask" ? (
                        <MetaMaskIcon height={26} />
                      ) : connector.name === "Coinbase Wallet" ? (
                        <CoinbaseWalletIcon height={26} />
                      ) : connector.name === "WalletConnect" ? (
                        <WalletConnectIcon height={26} />
                      ) : null}
                    </span>
                  )}
                </div>
              )}
            </DropdownMenu.Item>
          ))}

          {/* {error && <div>{error.message}</div>} */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
})
