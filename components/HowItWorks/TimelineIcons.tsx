interface IconProps {
  className?: string
}

// Icon for "Fill In Quote"
export const QuoteIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <img src="/images/process1.svg" alt="Our Process" width={'40'} className="z-[999]" />
)

// Icon for "Cleaners Arrive"
export const CleanerIcon = ({ className = "w-8 h-8" }: IconProps) => (
 <img src="/images/process2.svg" alt="Our Process" width={'40'} className="z-[999]" />
)

// Icon for "Quality Check"
export const QualityIcon = ({ className = "w-8 h-8" }: IconProps) => (
 <img src="/images/process3.svg" alt="Our Process" width={'40'} className="z-[999]" />
)