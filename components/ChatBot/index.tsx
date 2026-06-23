'use client'

import { useState, useEffect } from 'react'
import ChatBubble from './ChatBubble'
import ChatWindow from './ChatWindow'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMessages, setInitialMessages] = useState<any[]>([])
  const [hasMounted, setHasMounted] = useState(false)

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setHasMounted(true)

    // Load persisted chat history
    const savedChat = localStorage.getItem('shazam_chat_history')
    if (savedChat) {
      try {
        setInitialMessages(JSON.parse(savedChat))
      } catch (e) {
        console.error('Failed to parse chat history', e)
        localStorage.removeItem('shazam_chat_history')
      }
    } else {
      // Set default initial message
      setInitialMessages([
        {
          id: 'initial-greeting',
          role: 'assistant',
          content: 'Hi there! 👋 We are currently offline, but if you need any assistance, feel free to ask. We will reply as soon as possible. ✨',
          createdAt: new Date().toISOString()
        }
      ])
    }
  }, [])

  if (!hasMounted) return null

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        unreadCount={isOpen ? 0 : 1}
      />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialMessages={initialMessages}
      />
    </>
  )
}
