import { useState, useEffect, createContext } from "react"

import { Space, Post, User } from "@/types/entry"

import { useAccount, useBalance } from "wagmi"

import Layout from "@/components/Layout"
import PostSection from "@/components/PostSection"
import PostForm from "@/components/ui/PostForm"
import SpaceGroup from "@/components/ui/SpaceGroup"

export const Context = createContext(null)

export default function IndexPage() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  const [spaces, setSpaces] = useState<Space[] | null>(null)
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null)
  const [currentSpaceNr, setCurrentSpaceNr] = useState(1)
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true)

  const [posts, setPosts] = useState<Post[] | null>(null)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  const [users, setUsers] = useState<User[] | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [contributers, setContributers] = useState<User[] | null>(null)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  useEffect(() => {
    readSpaces()
    readPosts()
    readUsers()
  }, [])

  useEffect(() => {
    setCurrentUser(users?.find(user => user.address === address))
  }, [users, address])

  useEffect(() => {
    setCurrentSpace(spaces?.find(space => space.id === currentSpaceNr))
  }, [spaces, currentSpaceNr])

  useEffect(() => {
    setContributers(
      posts
        ?.filter(post => post.spaceId === currentSpace?.id)
        .map(post => users?.find(user => user.id === post.userId))
    )
  }, [posts, users, currentSpace])

  const readSpaces = async () => {
    const response = await fetch("/api/space", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const spaces = await response.json()
    if (response.status === 200) {
      setSpaces(spaces)
      setIsLoadingSpaces(false)
    }
  }

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

  return (
    <Context.Provider
      value={{
        spaces,
        posts,
        users,
        setCurrentSpace,
        setCurrentSpaceNr,
        isLoadingSpaces,
        isLoadingUsers,
      }}
    >
      <Layout>
        <section className="mx-auto flex max-w-[1376px] gap-24 p-6 pt-28 -xl:gap-16 -lg:max-w-2xl -lg:flex-col -lg:gap-8 -lg:pb-4 -sm:pb-2 -sm:pt-24">
          <SpaceGroup
            spaces={spaces}
            currentSpace={currentSpace}
            currentSpaceNr={currentSpaceNr}
            setCurrentSpaceNr={setCurrentSpaceNr}
            isLoadingSpaces={isLoadingSpaces}
            posts={posts}
            isLoadingPosts={isLoadingPosts}
            contributers={contributers}
          />
          <div className="w-full flex-grow -lg:h-64">
            <PostForm
              isConnected={isConnected}
              currentSpace={currentSpace}
              currentUser={currentUser}
              readPosts={readPosts}
              readUsers={readUsers}
            />
          </div>
        </section>
        <PostSection
          isConnected={isConnected}
          balance={balance}
          currentSpace={currentSpace}
          posts={posts}
          isLoadingPosts={isLoadingPosts}
          currentUser={currentUser}
          contributers={contributers}
        />
      </Layout>
    </Context.Provider>
  )
}
