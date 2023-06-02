import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { Command } from "cmdk"

import { Space, Post } from "@/types/entry"

import { Context } from "@/pages/index"

import SearchButton from "./SearchButton"
import Separator from "./Separator"

import ChevronRightIcon from "../icons/ChevronRight"
import CloseIcon from "../icons/Close"

export default function SearchDialogComponent() {
  const [open, setOpen] = useState(false)

  const { spaces, posts, setCurrentSpace, setCurrentSpaceNr, isLoadingSpaces } =
    useContext(Context)

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <SearchButton onClick={() => setOpen(!open)} />
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed top-[50%] left-[50%] z-10 w-full translate-x-[-50%] translate-y-[-50%] focus:outline-none sm:max-w-xl -sm:top-0 -sm:left-0 -sm:translate-x-0 -sm:translate-y-0"
      >
        <motion.div
          initial={{ y: 15, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className="rounded-2xl bg-white pt-5 pb-4 shadow-2xl shadow-radix-grayA-6 focus:outline-none dark:bg-black -sm:rounded-none"
        >
          <div className="relative flex w-full items-center px-6">
            <Command.Input
              placeholder="Search to filter spaces..."
              className="w-full bg-transparent pr-12 outline-none placeholder:text-radix-gray-9 dark:placeholder:text-radix-grayDark-9"
            />
            <button onClick={() => setOpen(!open)} tabIndex={-1}>
              <kbd className="absolute top-0 right-5 flex h-6 items-center rounded-md border border-radix-gray-7 bg-radix-gray-2 px-1 text-sm text-radix-gray-10 outline-none focus:border-radix-gray-8 dark:border-radix-grayDark-7 dark:bg-radix-grayDark-2 dark:text-radix-grayDark-10 -sm:hidden">
                ESC
              </kbd>
              <CloseIcon
                height={21}
                className="stroke-radix-gray-11 dark:stroke-radix-grayDark-11 sm:hidden"
              />
            </button>
          </div>
          <Separator className="mt-4 mb-2 h-px w-full" />
          <Command.List className="overflow-y-scroll px-2 sm:max-h-64">
            {isLoadingSpaces ? (
              <div className="flex h-16 items-center justify-center text-radix-gray-11 dark:text-radix-grayDark-11">
                <Command.Loading>Loading spaces...</Command.Loading>
              </div>
            ) : (
              <>
                <Command.Empty className="flex h-16 items-center justify-center text-radix-gray-11 dark:text-radix-grayDark-11">
                  No results found.
                </Command.Empty>
                <Command.Group>
                  {spaces?.map((space: Space, index) => (
                    <Command.Item
                      key={index}
                      value={space.title}
                      onSelect={() => {
                        setOpen(false)
                        setCurrentSpace(
                          spaces.find((space: Space) => space.id === index + 1)
                        )
                        setCurrentSpaceNr(space.id)
                      }}
                      className="group relative flex cursor-pointer flex-col justify-center rounded-xl py-2 px-4 sm:aria-selected:bg-radix-gray-2 sm:dark:aria-selected:bg-radix-grayDark-2"
                    >
                      <p className="w-11/12">{space.title}</p>
                      <span
                        data-hidden
                        className="mt-1 text-sm text-radix-gray-11 dark:text-radix-grayDark-11"
                      >
                        {posts?.filter(
                          (post: Post) => post.spaceId === space.id
                        ).length + " "}
                        Contribution
                        {posts?.filter(
                          (post: Post) => post.spaceId === space.id
                        ).length !== 1 && "s"}
                      </span>
                      <ChevronRightIcon
                        height={18}
                        className="absolute right-4 stroke-radix-gray-10 dark:stroke-radix-grayDark-10 sm:invisible sm:group-aria-selected:visible"
                      />
                    </Command.Item>
                  ))}
                </Command.Group>
              </>
            )}
          </Command.List>
        </motion.div>
      </Command.Dialog>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-10 bg-radix-grayA-6 dark:bg-radix-grayA-10"
        />
      )}
    </>
  )
}
