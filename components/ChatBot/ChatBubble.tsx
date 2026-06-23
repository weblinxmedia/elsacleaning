'use client'

import { motion } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'

interface ChatBubbleProps {
  isOpen: boolean
  onClick: () => void
  unreadCount?: number
}

export default function ChatBubble({ isOpen, onClick, unreadCount = 0 }: ChatBubbleProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-luxury-pink text-white shadow-lg shadow-luxury-pink/30 transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:ring-offset-2"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <MessageSquare size={24} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <X size={24} />
      </motion.div>

      {!isOpen && unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-md"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </motion.div>
      )}
    </motion.button>
  )
}
