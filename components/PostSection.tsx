import { useState } from "react"
import { useScrollContainer } from "react-indiana-drag-scroll"
import { motion } from "framer-motion"
import clsx from "clsx"

import Post from "@/components/ui/Post"

export default function PostSectionComponent({
  isConnected,
  balance,
  posts,
  currentSpace,
  currentUser,
  contributers,
}) {
  const scrollContainer = useScrollContainer()
  const [scrollLeft, setScrollLeft] = useState(true)
  const [scrollRight, setscrollRight] = useState(false)

  const handleScrollEnd = event => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target
    setScrollLeft(scrollLeft === 0)
    setscrollRight(scrollWidth - scrollLeft === clientWidth)
  }

  return (
    <section className="relative mx-auto max-w-[1376px] lg:px-6 -lg:max-w-2xl -lg:p-6">
      {posts?.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-2xl bg-radix-gray-4 dark:bg-radix-grayDark-4 lg:my-6 lg:h-64">
          <span className="text-radix-gray-11 dark:text-radix-grayDark-11">
            No posts yet.
          </span>
        </div>
      ) : (
        <>
          <div
            onScroll={handleScrollEnd}
            className={clsx(
              "flex gap-4 overflow-x-scroll lg:py-6 -lg:flex-col",
              posts?.filter(post => post.spaceId === currentSpace?.id).length >
                2 && "lg:cursor-grab lg:active:cursor-grabbing"
            )}
            ref={scrollContainer.ref}
          >
            {posts
              ?.slice()
              .reverse()
              .filter(post => post.spaceId === currentSpace?.id)
              .map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  postNr={
                    posts?.filter(post => post.spaceId === currentSpace?.id)
                      .length - index
                  }
                  currentUser={currentUser}
                  contributers={contributers}
                  isConnected={isConnected}
                  balance={balance}
                />
              ))}
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
    </section>
  )
}
