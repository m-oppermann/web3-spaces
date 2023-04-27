import * as Tooltip from "@radix-ui/react-tooltip"
import { motion } from "framer-motion"

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export default function TooltipComponent({ children, content }: TooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={450}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={3}>
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none rounded-lg bg-radix-grayDark-2 px-2 py-1 text-sm text-radix-gray-2 dark:bg-radix-grayDark-6 dark:text-radix-gray-6"
            >
              {content}
              <Tooltip.Arrow className="fill-radix-grayDark-2 dark:fill-radix-grayDark-6" />
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
