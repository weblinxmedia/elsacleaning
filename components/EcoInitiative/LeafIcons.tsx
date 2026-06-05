interface IconProps {
  className?: string
}

export const Leaf1 = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5C50 5 15 25 15 55C15 75 30 90 50 90C70 90 85 75 85 55C85 25 50 5 50 5Z" fill="#4ADE80" stroke="#22C55E" strokeWidth="2"/>
    <path d="M50 30V80" stroke="#22C55E" strokeWidth="2"/>
    <path d="M50 50L35 40" stroke="#22C55E" strokeWidth="2"/>
    <path d="M50 60L65 50" stroke="#22C55E" strokeWidth="2"/>
  </svg>
)

export const Leaf2 = ({ className = "w-10 h-10" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 80C10 80 20 20 60 10C80 5 95 20 90 40C85 60 40 85 10 80Z" fill="#86EFAC" stroke="#4ADE80" strokeWidth="2"/>
    <path d="M15 75L60 20" stroke="#4ADE80" strokeWidth="2"/>
  </svg>
)

export const Leaf3 = ({ className = "w-14 h-14" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M90 15C90 15 80 75 40 85C20 90 5 75 10 55C15 35 60 10 90 15Z" fill="#BBF7D0" stroke="#86EFAC" strokeWidth="2"/>
    <path d="M85 20L40 75" stroke="#86EFAC" strokeWidth="2"/>
  </svg>
)