import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { forwardRef, useState } from "react"

import MetaMaskIcon from "../icons/MetaMask"
import WalletConnectIcon from "../icons/WalletConnect"
import LoadingIndicatior from "../icons/LoadingIndicator"

import { useConnect } from "wagmi"

export default forwardRef(function ConnectModalComponent(
  { isConnecting, children, ...props },
  ref
) {
  const [isSelected, setIsSelected] = useState()
  const { connect, connectors } = useConnect()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger ref={ref} {...props} asChild>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="flex w-56 flex-col gap-y-2 rounded-xl border border-radix-gray-7 bg-white p-2 text-radix-gray-12 shadow-sm dark:border-radix-grayDark-7 dark:bg-black dark:text-radix-gray-1"
          align="end"
        >
          {connectors.map(connector => (
            <DropdownMenu.Item
              onSelect={event => {
                event.preventDefault()
                setIsSelected(connector.id)
                connect({ connector })
              }}
              className="flex h-12 cursor-pointer select-none items-center justify-between rounded-lg bg-radix-gray-2 py-2.5 px-3.5 text-base font-medium outline-none enabled:cursor-pointer data-[disabled]:cursor-not-allowed data-[highlighted]:bg-radix-gray-4 dark:bg-radix-grayDark-2 dark:data-[highlighted]:bg-radix-grayDark-4"
              disabled={isConnecting || !connector.ready}
              key={connector.id}
            >
              {connector.name}
              {connector.name === "MetaMask" ? (
                <span>
                  {isConnecting && connector.id === isSelected ? (
                    <LoadingIndicatior
                      height={21}
                      className="animate-spin opacity-50"
                    />
                  ) : (
                    <MetaMaskIcon height={28} />
                  )}
                </span>
              ) : (
                <span>
                  {isConnecting && connector.id === isSelected ? (
                    <LoadingIndicatior
                      height={21}
                      className="animate-spin opacity-50"
                    />
                  ) : (
                    <WalletConnectIcon height={28} />
                  )}
                </span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
})
