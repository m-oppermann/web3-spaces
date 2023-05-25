import { useState, useEffect, createContext } from "react"
import { useScrollContainer } from "react-indiana-drag-scroll"
import { motion } from "framer-motion"

import Layout from "@/components/Layout"
import Post from "@/components/ui/Post"
import PostForm from "@/components/ui/PostForm"
import Avatar from "@/components/ui/Avatar"

import { useAccount, useBalance } from "wagmi"

export const UserContext = createContext(null)

export default function IndexPage() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [contributers, setContributers] = useState(null)

  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  const scrollContainer = useScrollContainer()
  const [scrollLeft, setScrollLeft] = useState(true)
  const [scrollRight, setscrollRight] = useState(false)

  useEffect(() => {
    readPosts()
    readUsers()
  }, [isConnected])

  useEffect(() => {
    setCurrentUser(users?.find(user => user.address === address))
  }, [users, address])

  useEffect(() => {
    setContributers(
      users?.filter(user => posts?.find(post => post.userId === user.id))
    )
  }, [users, posts])

  const readPosts = async () => {
    const response = await fetch("/api/post", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const posts = await response.json()
    if (response.status === 200) {
      setPosts(posts)
      setIsLoadingPosts(false)
    }
  }

  const readUsers = async () => {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const users = await response.json()
    if (response.status === 200) {
      setUsers(users)
      setIsLoadingUsers(false)
    }
  }

  const handleScrollEnd = event => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target
    setScrollLeft(scrollLeft === 0)
    setscrollRight(scrollWidth - scrollLeft === clientWidth)
  }

  return (
    <UserContext.Provider value={{ users, isLoadingUsers }}>
      <Layout>
        <section className="mx-auto flex max-w-[1376px] gap-24 p-6 pt-28 -xl:gap-16 -lg:max-w-2xl -lg:flex-col -lg:gap-8 -lg:pb-4 -sm:pb-2 -sm:pt-24">
          <div className="w-full flex-grow">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-3 w-3 animate-pulse rounded-full bg-green-500 opacity-75" />
              <h3 className="text-lg -sm:text-base">Open Space</h3>
            </div>
            <h1 className="mb-4 w-11/12 text-4xl font-medium -sm:text-3xl -xs:text-2xl">
              Know when it’s valuable to learn to code as a designer.
            </h1>
            <p className="mb-8 text-xl text-radix-gray-11 dark:text-radix-grayDark-11 -lg:mb-6 -sm:text-lg">
              Learning to code as a designer can be invaluable in your career.
              But it can be hard to know when it’s worth investing the time and
              energy to learn to code, and when it’s not.
            </p>
            <div className="flex h-10 items-center gap-3">
              {posts?.length !== 0 && (
                <ul className="ml-3 flex items-center">
                  {contributers?.slice(0, 3).map((contributer, index) => (
                    <li
                      key={index}
                      className="pointer-events-none -ml-3 flex rounded-full border-2 border-radix-gray-2 dark:border-radix-grayDark-2"
                      style={{ zIndex: index }}
                    >
                      <Avatar
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
          <div className="w-full flex-grow -lg:h-64">
            <PostForm
              readPosts={readPosts}
              readUsers={readUsers}
              currentUser={currentUser}
              isConnected={isConnected}
            />
          </div>
        </section>
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
                className="flex gap-4 overflow-x-scroll lg:cursor-grab lg:py-6 lg:active:cursor-grabbing -lg:flex-col"
                ref={scrollContainer.ref}
              >
                {posts
                  ?.slice()
                  .reverse()
                  .map((post, index) => (
                    <Post
                      key={index}
                      post={post}
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
      </Layout>
    </UserContext.Provider>
  )
}
