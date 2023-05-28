import { useState, useEffect } from "react"
import { useScrollContainer } from "react-indiana-drag-scroll"
import { motion, useAnimate, stagger } from "framer-motion"
import clsx from "clsx"

import Post from "@/components/ui/Post"

export default function PostSectionComponent({
  isConnected,
  balance,
  posts,
  currentSpace,
  currentUser,
  contributers,
  isLoadingPosts,
}) {
  const [scope, animate] = useAnimate()

  const scrollContainer = useScrollContainer()
  const [scrollLeft, setScrollLeft] = useState(true)
  const [scrollRight, setscrollRight] = useState(false)

  useEffect(() => {
    if (!isLoadingPosts) {
      animate(
        "div[data-group]",
        { opacity: [0, 1], y: [-20, 0] },
        {
          delay: stagger(0.15, { startDelay: 0.3 }),
          type: "spring",
          stiffness: 200,
          damping: 20,
        }
      )
      document.getElementById("scrollContainer").scrollLeft = 0
    }
  }, [animate, currentSpace, isLoadingPosts])

  const handleScrollEnd = event => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target
    setScrollLeft(scrollLeft === 0)
    setscrollRight(scrollWidth - scrollLeft === clientWidth)
  }

  return (
    <section className="relative mx-auto max-w-[1376px] lg:px-6 -lg:max-w-2xl -lg:p-6">
      {isLoadingPosts ? (
        <div className="h-64 animate-pulse rounded-2xl bg-radix-gray-4 dark:bg-radix-grayDark-4 lg:my-6" />
      ) : (
        <>
          {posts?.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-radix-gray-4 dark:bg-radix-grayDark-4 lg:mt-6">
              <span className="text-radix-gray-11 dark:text-radix-grayDark-11">
                No posts yet.
              </span>
            </div>
          ) : (
            <>
              <div ref={scope}>
                <div
                  id="scrollContainer"
                  onScroll={handleScrollEnd}
                  className={clsx(
                    "flex min-h-[290px] gap-4 overflow-x-scroll lg:py-6 -lg:flex-col",
                    posts?.filter(post => post.spaceId === currentSpace?.id)
                      .length > 2 && "lg:cursor-grab lg:active:cursor-grabbing"
                  )}
                  ref={scrollContainer.ref}
                >
                  {posts
                    ?.slice()
                    .reverse()
                    .filter(post => post.spaceId === currentSpace?.id)
                    .map((post, index) => (
                      <div data-group key={index}>
                        <Post
                          post={post}
                          postNr={
                            posts?.filter(
                              post => post.spaceId === currentSpace?.id
                            ).length - index
                          }
                          currentUser={currentUser}
                          contributers={contributers}
                          isConnected={isConnected}
                          balance={balance}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <motion.div
                animate={{ opacity: scrollLeft ? 0 : 1 }}
                className="absolute left-6 top-6 bottom-6 w-12 bg-gradient-to-r from-radix-gray-2 to-transparent dark:from-radix-grayDark-2 -lg:hidden"
              />
              <motion.div
                animate={{ opacity: scrollRight ? 0 : 1 }}
                className="absolute right-6 top-6 bottom-6 w-12 bg-gradient-to-l from-radix-gray-2 to-transparent dark:from-radix-grayDark-2 -lg:hidden"
              />
            </>
          )}
        </>
      )}
    </section>
  )
}
