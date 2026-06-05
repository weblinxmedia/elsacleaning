import React from 'react'

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[]
  error?: string
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ options, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <select
          ref={ref}
          className={`w-full px-4 py-3.5 bg-white border ${error ? 'border-red-400 focus:ring-red-300' : 'border-gray-400 focus:ring-luxury-pink'} rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 appearance-none cursor-pointer transition-all duration-200 ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
          {...props}
        >
          <option value="" disabled>
            Choose a Service
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-xs mt-1 pl-1">{error}</span>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
export default FormSelect