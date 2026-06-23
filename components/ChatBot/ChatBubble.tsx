'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'

interface ChatBubbleProps {
  isOpen: boolean
  onClick: () => void
  unreadCount?: number
}

export default function ChatBubble({ isOpen, onClick, unreadCount = 1 }: ChatBubbleProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[999999999] flex items-center gap-3">
      {/* Animated Greeting Message */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="flex origin-right items-center rounded-full bg-white/90 px-6 py-2 text-[14px] md:text-[16px] font-thin text-black shadow-lg border-1 border-luxury-pink"
          >
            Chat with us 👋
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Subtle Pulse Effect when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-luxury-pink animate-ping opacity-20" />
        )}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="relative flex h-14 w-14 items-center cursor-pointer justify-center rounded-full bg-luxury-pink text-white shadow-xl shadow-luxury-pink/20 transition-all hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:ring-offset-2"
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
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[14px] font-regular text-white shadow-md z-10 ring-2 ring-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  )
}
