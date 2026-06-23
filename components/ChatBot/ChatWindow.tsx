import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Sparkles } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { useChat } from '@ai-sdk/react'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  initialMessages?: any[]
}

export default function ChatWindow({ isOpen, onClose, initialMessages = [] }: ChatWindowProps) {
  const { messages, sendMessage, status, setMessages } = useChat()

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0 && messages.length === 0) {
      setMessages(initialMessages)
    }
  }, [initialMessages, setMessages, messages.length])

  const [input, setInput] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('shazam_chat_history', JSON.stringify(messages))
    }
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'submitted' || status === 'streaming') return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-[999999999] flex h-[600px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-luxury-pink px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-parkinsans text-lg font-medium tracking-wide">Shazam Concierge</h3>
                <p className="font-outfit text-xs text-white/80">Premium Digital Support</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                <Sparkles size={40} className="mb-4 text-luxury-pink" />
                <p className="font-parkinsans text-sm text-gray-500">
                  Welcome to Shazam Windows Cleaning.<br />How may I assist you today?
                </p>
              </div>
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} />)
            )}

            {(status === 'submitted' || status === 'streaming') && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start mb-4">
                <div className="bg-[#f4f6f0] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-luxury-pink rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-luxury-pink rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-luxury-pink rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-4">
            <form onSubmit={onSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-full border border-gray-200 bg-[#f4f6f0] py-3 pl-5 pr-12 font-outfit text-sm text-gray-800 focus:border-luxury-pink focus:outline-none focus:ring-1 focus:ring-luxury-pink"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === 'submitted' || status === 'streaming'}
                className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-pink text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
              </button>
            </form>
            <div className="mt-2 text-center">
              <span className="font-outfit text-[10px] text-gray-400">
                AI can make mistakes. Please verify important info.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

