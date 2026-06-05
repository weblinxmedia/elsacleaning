import React from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <input
          ref={ref}
          className={`w-full px-4 py-3.5 bg-white border ${error ? 'border-red-400 focus:ring-red-300' : 'border-gray-400 focus:ring-luxury-pink'} rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-xs mt-1 pl-1">{error}</span>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
export default FormInput