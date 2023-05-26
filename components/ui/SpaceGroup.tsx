import ChevronLeft from "@/components/icons/ChevronLeft"
import ChevronRight from "@/components/icons/ChevronRight"

import Avatar from "@/components/ui/Avatar"

export default function SpaceGroupComponent({
  posts,
  spaces,
  currentSpace,
  currentSpaceNr,
  setCurrentSpaceNr,
  contributers,
  isLoadingPosts,
}) {
  return (
    <div className="w-full flex-grow">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5 rounded-full bg-radix-gray-4 p-1.5 dark:bg-radix-grayDark-4">
          <button
            onClick={() => setCurrentSpaceNr(currentSpaceNr - 1)}
            className="group focus:outline-none disabled:opacity-50"
            disabled={currentSpaceNr <= 1}
          >
            <ChevronLeft
              className="stroke-radix-gray-11 group-focus:stroke-radix-gray-12 dark:stroke-radix-grayDark-11 dark:group-focus:stroke-radix-grayDark-12"
              height={18}
            />
          </button>
          <span className="pointer-events-none text-sm font-medium">
            {currentSpace?.id + " "}
            <span className="text-radix-gray-9 dark:text-radix-grayDark-9">
              /
            </span>
            {" " + spaces?.length}
          </span>
          <button
            onClick={() => setCurrentSpaceNr(currentSpaceNr + 1)}
            className="group focus:outline-none disabled:opacity-50"
            disabled={currentSpaceNr >= spaces?.length}
          >
            <ChevronRight
              className="stroke-radix-gray-11 group-focus:stroke-radix-gray-12 dark:stroke-radix-grayDark-11 dark:group-focus:stroke-radix-grayDark-12"
              height={18}
            />
          </button>
        </div>
      </div>
      <h1 className="mb-4 w-11/12 text-4xl font-medium -sm:text-3xl -xs:text-2xl">
        {currentSpace?.title}
      </h1>
      <p className="mb-8 text-xl text-radix-gray-11 dark:text-radix-grayDark-11 -lg:mb-6 -sm:text-lg">
        {currentSpace?.description}
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
  )
}
