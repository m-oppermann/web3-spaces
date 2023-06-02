import { useEffect } from "react"
import { useAnimate, stagger } from "framer-motion"

import { Space, Post, User } from "@/types/entry"

import Avatar from "@/components/ui/Avatar"

import ChevronLeftIcon from "@/components/icons/ChevronLeft"
import ChevronRightIcon from "@/components/icons/ChevronRight"

interface SpaceGroupProps {
  spaces: Space[]
  currentSpace: Space
  currentSpaceNr: number
  setCurrentSpaceNr: React.Dispatch<React.SetStateAction<number>>
  isLoadingSpaces: boolean
  posts: Post[]
  isLoadingPosts: boolean
  contributers: User[]
}

export default function SpaceGroupComponent({
  spaces,
  currentSpace,
  currentSpaceNr,
  setCurrentSpaceNr,
  isLoadingSpaces,
  posts,
  isLoadingPosts,
  contributers,
}: SpaceGroupProps) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!isLoadingSpaces) {
      animate("div[data-item]", { opacity: [0, 1] }, { delay: 0.15 })
    }
  }, [animate, isLoadingSpaces])

  useEffect(() => {
    if (!isLoadingSpaces) {
      animate(
        "div[data-group]",
        { opacity: [0, 1] },
        { delay: stagger(0.15, { startDelay: 0.3 }), duration: 0.5 }
      )
    }
  }, [animate, currentSpace, isLoadingSpaces])

  return (
    <div className="w-full flex-grow">
      {isLoadingSpaces ? (
        <>
          <div className="mb-3 h-8 w-20 animate-pulse rounded-full bg-radix-gray-4 p-1.5 dark:bg-radix-grayDark-4" />
          <div className="mb-8 h-[180px] w-full animate-pulse rounded-2xl bg-radix-gray-4 p-1.5 dark:bg-radix-grayDark-4" />
          <div className="h-10 w-48 animate-pulse rounded-xl bg-radix-gray-4 p-1.5 dark:bg-radix-grayDark-4" />
        </>
      ) : (
        <div ref={scope}>
          <div className="mb-3 flex">
            <div className="rounded-full bg-radix-gray-4 p-1.5 dark:bg-radix-grayDark-4">
              <div data-item className="flex items-center gap-px">
                <button
                  onClick={() => setCurrentSpaceNr(currentSpaceNr - 1)}
                  className="group focus:outline-none disabled:opacity-50"
                  disabled={currentSpaceNr <= 1}
                  aria-label="Previous Space"
                >
                  <ChevronLeftIcon
                    className="stroke-radix-gray-11 group-focus:stroke-radix-gray-12 dark:stroke-radix-grayDark-11 dark:group-focus:stroke-radix-grayDark-12"
                    height={18}
                  />
                </button>
                <span className="pointer-events-none flex gap-[2.5px] text-sm font-medium">
                  <span className="flex min-w-[10px] justify-center">
                    {currentSpace?.id}
                  </span>
                  <span className="text-radix-gray-9 dark:text-radix-grayDark-9">
                    /
                  </span>
                  <span className="flex min-w-[10px] justify-center">
                    {spaces?.length}
                  </span>
                </span>
                <button
                  aria-label="Next Space"
                  onClick={() => setCurrentSpaceNr(currentSpaceNr + 1)}
                  className="group focus:outline-none disabled:opacity-50"
                  disabled={currentSpaceNr >= spaces?.length}
                >
                  <ChevronRightIcon
                    className="stroke-radix-gray-11 group-focus:stroke-radix-gray-12 dark:stroke-radix-grayDark-11 dark:group-focus:stroke-radix-grayDark-12"
                    height={18}
                  />
                </button>
              </div>
            </div>
          </div>
          <div data-group>
            <h1 className="mb-4 w-11/12 text-4xl font-medium -sm:text-3xl -xs:text-2xl">
              {currentSpace?.title}
            </h1>
            <p className="mb-8 text-xl text-radix-gray-11 dark:text-radix-grayDark-11 -lg:mb-6 -sm:text-lg">
              {currentSpace?.description}
            </p>
          </div>
          <div data-group="1" className="flex h-10 items-center">
            {posts?.filter(post => post.spaceId === currentSpace?.id).length !==
              0 && (
              <ul className="mx-3 flex items-center">
                {contributers?.slice(0, 3).map((contributer, index) => (
                  <li
                    key={index}
                    className="pointer-events-none -ml-3 flex rounded-full border-2 border-radix-gray-2 dark:border-radix-grayDark-2"
                    style={{ zIndex: index }}
                  >
                    <Avatar
                      aria-label="Contributer Avatar"
                      address={contributer.address}
                      ensAvatar={contributer.ensAvatar}
                      tabIndex={-1}
                    />
                  </li>
                ))}
                {contributers?.length > 3 && (
                  <li className="dark:bg-radiy-grayDark-4 pointer-events-none z-[3] -ml-3 box-content flex h-10 w-10 items-center justify-center rounded-full border-2 border-radix-gray-2 bg-radix-gray-4 text-radix-gray-11 dark:border-radix-grayDark-2 dark:bg-radix-grayDark-4 dark:text-radix-grayDark-11 ">
                    <span className="-mr-0.5">
                      {contributers?.length - 3 + "+"}
                    </span>
                  </li>
                )}
              </ul>
            )}
            {!isLoadingPosts && (
              <div className="flex gap-1 text-radix-gray-11 dark:text-radix-grayDark-11">
                <span className="min-w-[10px]">{contributers?.length}</span>
                <span>Contributor{contributers?.length !== 1 && "s"}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
