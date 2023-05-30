import { useState, useEffect } from "react"

import LoadingIndicatior from "../icons/LoadingIndicator"

import Avatar from "./Avatar"
import Button from "./Button"

import { useSendTransaction, usePrepareSendTransaction } from "wagmi"
import { parseEther } from "viem"

export default function PostComponent({
  post,
  postNr,
  currentUser,
  contributers,
  isConnected,
  balance,
}) {
  const [mounted, setMounted] = useState(false)

  const [contributer, setContributer] = useState(null)
  const [byCurrentUser, setByCurrentUser] = useState(false)
  const [txValue, setTxValue] = useState("0")

  const { config } = usePrepareSendTransaction({
    to: contributer?.address,
    value: BigInt(parseEther(`${Number(txValue)}`)),
  })
  const { isLoading: isLoadingTx, sendTransaction } = useSendTransaction(config)

  useEffect(() => {
    setContributer(
      contributers?.find(contributer => contributer.id === post.userId)
    )
    setByCurrentUser(currentUser?.id === post.userId)
  }, [post, contributers, currentUser])

  useEffect(() => {
    setMounted(true)

    if (balance?.formatted > 0.01) {
      setTxValue("0.01")
    } else {
      setTxValue("0")
    }
  }, [balance])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={
        "rounded-2xl border border-radix-gray-7 bg-white p-6 shadow-sm dark:border-radix-grayDark-7 dark:bg-black"
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 lg:w-[440px]">
          <h6 className="font-medium">Thought #{postNr}</h6>
          <p className="dark:text-radix-grayDark-11">{post.content}</p>
        </div>
        <div className="flex justify-between">
          <div className="pointer-events-none flex items-center gap-3">
            <Avatar
              address={contributer?.address}
              ensAvatar={contributer?.ensAvatar}
              tabIndex={-1}
            />
            <span>
              {contributer?.ensName !== null
                ? contributer?.ensName
                : contributer?.address.slice(0, 4) +
                  "..." +
                  contributer?.address.slice(-4)}
            </span>
          </div>
          <Button
            onClick={() => sendTransaction?.()}
            className="h-10 w-[107.9px]"
            intent="secondary"
            disabled={
              !isConnected ||
              balance?.formatted < 0.01 ||
              !sendTransaction ||
              isLoadingTx ||
              byCurrentUser
            }
          >
            {isLoadingTx ? (
              <LoadingIndicatior
                height={20}
                className="animate-spin opacity-75"
              />
            ) : (
              "Tip 0.01 Ξ"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
