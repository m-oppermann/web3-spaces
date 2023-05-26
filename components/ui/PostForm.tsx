import { useState } from "react"

import LoadingIndicatior from "../icons/LoadingIndicator"

import Button from "./Button"

import { useSignMessage } from "wagmi"

export default function PostFormComponent({
  isConnected,
  currentSpace,
  currentUser,
  readPosts,
  readUsers,
}) {
  const { isLoading, isError, signMessage } = useSignMessage({
    message:
      "This cryptographic signature is to verify that it is you posting this — not someone else. Before you sign, take a breath and make sure you are being helpful with your post.",
    onSuccess() {
      submitPost()
    },
    onError() {
      setIsSending(false)
    },
  })
  const [isSending, setIsSending] = useState(false)

  const [content, setContent] = useState("")
  const [count, setCount] = useState(0)
  const maxLength = 250

  const resetContent = () => {
    setContent("")
    setCount(0)
  }

  const handleSubmit = event => {
    event.preventDefault()
    signMessage()
    setIsSending(true)
    if (currentUser === undefined) {
      readUsers()
    }
  }

  const handleChange = event => {
    setCount(event.target.value.length)
    setContent(event.target.value)
  }

  const submitPost = async () => {
    const body = { content, userId: currentUser.id, spaceId: currentSpace.id }
    const response = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (response.status === 200) {
      resetContent()
      setIsSending(false)
      readPosts()
      readUsers()
    }
  }

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-radix-gray-7 bg-white p-6 shadow-sm dark:border-radix-grayDark-7 dark:bg-black -sm:-mb-6">
      <form
        action="#"
        method="POST"
        onSubmit={event => handleSubmit(event)}
        className="flex h-full flex-col gap-4"
      >
        <textarea
          name="content"
          id="content"
          onChange={event => handleChange(event)}
          value={content}
          className="h-full w-full rounded-xl bg-radix-gray-2 p-4 placeholder:text-radix-gray-9 focus:outline-none dark:bg-radix-grayDark-2 dark:placeholder:text-radix-grayDark-9"
          placeholder="Write your thoughts here..."
          maxLength={maxLength}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              className="h-10 w-[66.28px]"
              disabled={
                !isConnected ||
                count <= 0 ||
                count < 100 ||
                isLoading ||
                isSending
              }
            >
              {isSending ? (
                <LoadingIndicatior
                  height={20}
                  className="animate-spin opacity-75"
                />
              ) : (
                "Post"
              )}
            </Button>
            <span className="text-radix-gray-11 dark:text-radix-grayDark-11">
              {isLoading && !isError && "Waiting for signature..."}
              {!isConnected && count > 0 && "No wallet connection..."}
              {isConnected && count > 0 && count < 100 && "Write some more..."}
            </span>
          </div>
          <span className="text-radix-gray-11 dark:text-radix-grayDark-11">
            {count + "/" + maxLength}
          </span>
        </div>
      </form>
    </div>
  )
}
