import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Sparkles, RotateCcw, Smile, Paperclip } from 'lucide-react'
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
          <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-luxury-pink text-white shadow-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-parkinsans text-medium font-semibold text-gray-900 tracking-tight">Corner Stone</h3>
                <p className="text-[12px] text-gray-400 -mt-0.5">
                  Floor Care LLC
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([])}
                className="flex h-8 w-8 items-center justify-center rounded-full text-luxury-pink transition-colors hover:bg-gray-100"
                aria-label="Restart chat"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.length > 0 && (
              <div className="mb-6 flex items-center justify-center">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="px-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 align-middle"></span>
                  We're online...
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
            )}

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

            {/* Suggested Replies */}
            {messages.length === 1 && messages[0].role === 'assistant' && (
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                {['Yes, sure!', 'No, thanks!', 'I want to book for a commercial property'].map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage({ text: reply })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${i === 0
                      ? 'bg-luxury-pink text-white shadow-sm'
                      : 'border border-luxury-pink bg-white text-luxury-pink'
                      }`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
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
          <div className="border-t border-gray-100 bg-white p-4 pt-3">
            <form onSubmit={onSubmit} className="relative flex items-center mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter message"
                className="w-full rounded-full bg-gray-100 py-3 pl-5 pr-12 font-outfit text-sm text-gray-800 placeholder-gray-400 transition-colors focus:bg-gray-50 focus:outline-none ring-1 ring-gray-300 focus:ring-1 focus:ring-luxury-pink/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === 'submitted' || status === 'streaming'}
                className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-luxury-pink disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="flex items-center gap-3 px-2 text-gray-400">
              <button type="button" aria-label="Emoji" className="hover:text-gray-600 transition-colors">
                <Smile size={18} />
              </button>
              <button type="button" aria-label="Attachment" className="hover:text-gray-600 transition-colors">
                <Paperclip size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

