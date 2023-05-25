import Separator from "./ui/Separator"

export default function FooterComponent() {
  return (
    <footer className="mx-auto flex max-w-[1376px] items-center justify-center gap-2 p-6 text-sm text-radix-gray-11 dark:text-radix-grayDark-11 lg:mt-2 -lg:mb-6 -lg:max-w-2xl -lg:p-4 -sm:flex-col -sm:gap-1 -sm:p-2">
      <p>{"©2023 – All rights reserved."}</p>
      <Separator className={"h-5"} />
      <p>
        {"Made with ♥ by "}
        <a
          className="cursor-ne-resize underline transition-colors duration-150 hover:text-radix-gray-12 focus:text-radix-gray-12 focus:outline-none"
          href="https://read.cv/mtths"
          target="_blank"
        >
          mtths
        </a>
      </p>
    </footer>
  )
}
