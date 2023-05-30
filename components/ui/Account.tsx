import { useState, useEffect, useContext } from "react"
import { Context } from "@/pages/index"

import ConnectDropdown from "./ConnectDropdown"
import Button from "./Button"
import Avatar from "./Avatar"
import Tooltip from "./Tooltip"
import AccountDialog from "./AccountDialog"

import { useAccount, useEnsName, useEnsAvatar, useBalance } from "wagmi"

export default function AccountComponent() {
  const [mounted, setMounted] = useState(false)

  const { address, isConnected } = useAccount()
  const { data: ensName, isLoading: isLoadingName } = useEnsName({ address })
  const { data: ensAvatar, isLoading: isLoadingAvatar } = useEnsAvatar({
    name: ensName,
  })
  const { data: balance, isLoading: isLoadingBalance } = useBalance({ address })

  const { users, isLoadingUsers } = useContext(Context)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (
      mounted &&
      isConnected &&
      !isLoadingName &&
      !isLoadingAvatar &&
      !isLoadingUsers &&
      !users?.find(user => user.address === address)
    ) {
      handleNewUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mounted,
    isConnected,
    address,
    isLoadingName,
    isLoadingAvatar,
    isLoadingUsers,
  ])

  useEffect(() => {
    if (
      mounted &&
      isConnected &&
      !isLoadingUsers &&
      !users?.find(user => user.ensName === ensName) &&
      !users?.find(user => user.ensAvatar === ensAvatar)
    ) {
      handleUpdateUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isConnected, ensName, ensAvatar, isLoadingUsers])

  const handleNewUser = async () => {
    const body = { address, ensName, ensAvatar }
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  }

  const handleUpdateUser = async () => {
    const body = { address, ensName, ensAvatar }
    await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  }

  if (!mounted) {
    return null
  }

  if (isConnected) {
    return (
      <div className="flex gap-2">
        <div className="pointer-events-none flex items-center gap-2.5 rounded-full bg-radix-gray-4 px-4 py-2 text-radix-gray-11 dark:bg-radix-grayDark-4 dark:text-radix-grayDark-11 -sm:hidden">
          {ensName
            ? `${ensName}`
            : address.slice(0, 4) + "..." + address.slice(-4)}
        </div>
        <Tooltip content="Account">
          <AccountDialog
            address={address}
            ensName={ensName}
            ensAvatar={ensAvatar}
            balance={balance}
            isLoadingBalance={isLoadingBalance}
          >
            <Avatar address={address} ensAvatar={ensAvatar} />
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
