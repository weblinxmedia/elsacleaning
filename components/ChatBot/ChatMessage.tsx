import { CheckCircle2 } from 'lucide-react'

// Lightweight markdown parser for the chatbot
function parseMarkdown(text: string, isUser: boolean) {
  // Bold
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Links
  const linkColor = isUser ? 'text-white underline' : 'text-luxury-pink underline font-medium'
  parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="${linkColor}">$1</a>`)
  // Bullet points
  parsed = parsed.replace(/^- (.*)$/gm, '<li class="ml-4 list-disc">$1</li>')
  // Paragraphs / Line breaks
  parsed = parsed.replace(/\n\n/g, '<br /><br />')
  parsed = parsed.replace(/\n/g, '<br />')

  return parsed
}

export default function ChatMessage({ message }: { message: any }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-4 py-3 shadow-sm ${isUser
          ? 'bg-luxury-pink text-white rounded-2xl rounded-br-sm'
          : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
          }`}
      >
        {/* Render parts if they exist (from streamText tools) */}
        {message.parts && message.parts.length > 0 ? (
          message.parts.map((part: any, i: number) => {
            if (part.type === 'text') {
              return (
                <div
                  key={i}
                  className="font-outfit text-[14px] leading-[1.3rem]"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(part.text, isUser) }}
                />
              )
            }

            if (part.type === 'tool-invocation') {
              if (part.toolInvocation.toolName === 'capture_service_lead') {
                if (part.toolInvocation.state === 'result') {
                  const result = part.toolInvocation.result
                  if (result.success) {
                    return (
                      <div key={i} className="mt-2 p-3 bg-white/70 border border-luxury-pink/20 rounded-xl flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-luxury-pink mt-0.5 flex-shrink-0" />
                        <div className="text-[13px] font-parkinsans text-luxury-dark">
                          Internal submission successful.
                        </div>
                      </div>
                    )
                  }
                } else {
                  return (
                    <div key={i} className="mt-2 p-3 bg-white/70 border border-luxury-pink/20 rounded-xl flex items-start gap-2 opacity-70">
                      <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-luxury-pink border-t-transparent animate-spin flex-shrink-0" />
                      <div className="text-[13px] font-parkinsans text-gray-500">
                        Submitting details...
                      </div>
                    </div>
                  )
                }
              }
            }

            return null
          })
        ) : (
          /* Fallback for manually injected or standard string messages */
          <div
            className="font-outfit text-[14px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content || '', isUser) }}
          />
        )}
        {/* Timestamp */}
        <div className={`text-[10px] mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
