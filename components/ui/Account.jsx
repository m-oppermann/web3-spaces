import { motion } from "framer-motion"

export default function AccountComponent() {
  const ethAdress = "0x9a31E9e3D21602dEf187986Cc87a7daDc43D5434"

  return (
    <div className="pointer-events-none flex items-center gap-2 rounded-full bg-radix-gray-4 px-4 py-2 text-radix-gray-11">
      <motion.div
        animate={{ opacity: [1, 0.75] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="h-3 w-3 rounded-full bg-green-600"
      />
      {ethAdress.slice(0, 5) + "..." + ethAdress.slice(-4)}
    </div>
  )
}
