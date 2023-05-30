import { useState, useEffect, createContext } from "react"

import Layout from "@/components/Layout"
import PostForm from "@/components/ui/PostForm"

import PostSection from "@/components/PostSection"
import SpaceGroup from "@/components/ui/SpaceGroup"

import { useAccount, useBalance } from "wagmi"

export const Context = createContext(null)

export default function IndexPage() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  const [spaces, setSpaces] = useState(null)
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [currentSpace, setCurrentSpace] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [contributers, setContributers] = useState(null)
  const [currentSpaceNr, setCurrentSpaceNr] = useState(1)

  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
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
      users?.filter(user =>
        posts?.find(
          post => post.userId === user.id && post.spaceId === currentSpace?.id
        )
      )
    )
  }, [users, posts, currentSpace])

  const readSpaces = async () => {
    const response = await fetch("/api/space", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const spaces = await response.json()
    if (response.status === 200) {
      setSpaces(spaces)
      setTimeout(() => {
        setIsLoadingSpaces(false)
      }, 150)
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
      setTimeout(() => {
        setIsLoadingPosts(false)
      }, 150)
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
        isLoadingUsers,
      }}
    >
      <Layout>
        <section className="mx-auto flex max-w-[1376px] gap-24 p-6 pt-28 -xl:gap-16 -lg:max-w-2xl -lg:flex-col -lg:gap-8 -lg:pb-4 -sm:pb-2 -sm:pt-24">
          <SpaceGroup
            posts={posts}
            spaces={spaces}
            currentSpace={currentSpace}
            currentSpaceNr={currentSpaceNr}
            setCurrentSpaceNr={setCurrentSpaceNr}
            contributers={contributers}
            isLoadingSpaces={isLoadingSpaces}
            isLoadingPosts={isLoadingPosts}
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
          posts={posts}
          currentSpace={currentSpace}
          currentUser={currentUser}
          contributers={contributers}
          isLoadingPosts={isLoadingPosts}
        />
      </Layout>
    </Context.Provider>
  )
}
