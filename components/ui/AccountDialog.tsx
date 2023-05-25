import * as Dialog from "@radix-ui/react-dialog"
import { forwardRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Avatar from "./Avatar"
import Button from "./Button"

import CloseIcon from "../icons/Close"
import LogoutIcon from "../icons/Logout"
import CopyIcon from "../icons/Copy"
import CheckIcon from "../icons/Check"

import { FetchBalanceResult } from "@wagmi/core"
import { useDisconnect } from "wagmi"

interface AccountDialogProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  address: string
  ensName?: string
  ensAvatar?: string
  isLoadingAvatar?: boolean
  balance?: FetchBalanceResult
  isLoadingBalance?: boolean
}

export default forwardRef<HTMLButtonElement, AccountDialogProps>(
  function AccountDialogComponent(
    {
      children,
      address,
      ensName,
      ensAvatar,
      isLoadingAvatar,
      balance,
      isLoadingBalance,
      ...props
    },
    ref
  ) {
    const [copied, setCopied] = useState(false)

    const { disconnect } = useDisconnect()

    const handleCopy = () => {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }

    return (
      <Dialog.Root>
        <Dialog.Trigger ref={ref} {...props} asChild>
          {children}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="opacity-1 fixed inset-0 z-10 bg-radix-grayA-6 dark:bg-radix-grayA-8"
            />
          </Dialog.Overlay>
          <Dialog.Content
            onOpenAutoFocus={event => {
              event.preventDefault(), (event.target as HTMLDivElement).focus()
            }}
            className="fixed top-[50%] left-[50%] z-10 w-full max-w-xs translate-x-[-50%] translate-y-[-50%] focus:outline-none"
          >
            <motion.div
              initial={{ y: 15, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="rounded-2xl bg-white p-6 shadow-2xl shadow-radix-grayA-6 focus:outline-none dark:bg-black"
            >
              <section className="mt-3 flex flex-col items-center justify-center gap-4">
                <div className="pointer-events-none h-[72px] w-[72px]">
                  <Avatar
                    tabIndex={-1}
                    address={address}
                    ensAvatar={ensAvatar}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div
                    onClick={handleCopy}
                    className="group relative flex cursor-pointer items-center gap-1"
                  >
                    <h6 className="text-lg font-medium">
                      {ensName
                        ? `${ensName}`
                        : address.slice(0, 4) + "..." + address.slice(-4)}
                    </h6>
                    <AnimatePresence>
                      {copied ? (
                        <CheckIcon
                          initial={{ y: 2, scale: 0.9 }}
                          animate={{ y: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                          height={19}
                          className="absolute -right-6 top-[3px] stroke-green-500 dark:stroke-green-500"
                        />
                      ) : (
                        <CopyIcon
                          height={19}
                          className="absolute -right-6 top-1 stroke-radix-gray-8 transition-all duration-150 ease-in-out group-hover:stroke-radix-gray-11 dark:stroke-radix-grayDark-8 dark:group-hover:stroke-radix-grayDark-11"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  {isLoadingBalance ? (
                    <div className="mb-2 flex h-6 w-16 items-center ">
                      <div className="h-4 w-full animate-pulse rounded-md bg-radix-gray-2 dark:bg-radix-grayDark-2" />
                    </div>
                  ) : (
                    <div className="mb-2 flex gap-1 text-radix-gray-11 dark:text-radix-grayDark-11">
                      <span>{balance?.formatted.slice(0, 4)}</span>
                      <span>{balance?.symbol}</span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => disconnect()}
                  intent="tertiary"
                  roundness="rounded"
                  full
                >
                  <LogoutIcon
                    height={20}
                    className="stroke-radix-gray-11 dark:stroke-radix-grayDark-11"
                  />
                  Disconnect
                </Button>
              </section>
              <Dialog.Close className="absolute top-4 right-4 rounded-full p-1 transition-colors duration-150 ease-in-out hover:bg-radix-gray-2 focus:bg-radix-gray-4 focus:outline-none dark:hover:bg-radix-grayDark-2 dark:focus:bg-radix-grayDark-4">
                <CloseIcon
                  height={21}
                  className="stroke-radix-gray-11 dark:stroke-radix-grayDark-11"
                />
              </Dialog.Close>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
