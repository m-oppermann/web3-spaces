import { useState, useEffect } from "react"

import ConnectDropdown from "./ConnectDropdown"
import Button from "./Button"
import Avatar from "./Avatar"
import Tooltip from "./Tooltip"
import AccountDialog from "./AccountDialog"

import { useAccount, useEnsName, useEnsAvatar, useBalance } from "wagmi"

export default function AccountComponent() {
  const [mounted, setMounted] = useState(false)

  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar, isLoading: isLoadingAvatar } = useEnsAvatar({
    address,
  })
  const { data: balance, isLoading: isLoadingBalance } = useBalance({ address })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isConnected) {
    return (
      <div className="flex gap-2">
        <div className="pointer-events-none flex items-center gap-2.5 rounded-full bg-radix-gray-4 px-4 py-2 text-radix-gray-11 dark:bg-radix-grayDark-4 dark:text-radix-grayDark-11">
          {ensName
            ? `${ensName}`
            : address.slice(0, 4) + "..." + address.slice(-4)}
        </div>
        <Tooltip content="Account">
          <AccountDialog
            address={address}
            ensName={ensName}
            ensAvatar={ensAvatar}
            isLoadingAvatar={isLoadingAvatar}
            balance={balance}
            isLoadingBalance={isLoadingBalance}
          >
            <Avatar
              address={address}
              ensAvatar={ensAvatar}
              isLoadingAvatar={isLoadingAvatar}
            />
          </AccountDialog>
        </Tooltip>
      </div>
    )
  }

  return (
    <ConnectDropdown>
      <Button>Connect</Button>
    </ConnectDropdown>
  )
}
