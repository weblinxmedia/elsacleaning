'use client'

import { useState, useEffect } from 'react'
import ChatBubble from './ChatBubble'
import ChatWindow from './ChatWindow'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMessages, setInitialMessages] = useState([])
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
    }
  }, [])

  if (!hasMounted) return null

  return (
    <>
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialMessages={initialMessages}
      />
    </>
  )
}
