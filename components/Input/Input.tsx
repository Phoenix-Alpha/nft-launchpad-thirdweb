import { ExclamationCircleIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { FC, InputHTMLAttributes } from 'react'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: boolean
  className?: string
}

export const Input: FC<IInputProps> = ({
  label,
  hasError,
  className,
  ...props
}: IInputProps) => (
  <label>
    {label && (
      <div className="block text-sm font-medium text-gray-700">{label}</div>
    )}
    <div
      className={classNames(
        'relative mt-1 rounded-md shadow-sm sm:text-sm',
        className
      )}
    >
      <input
        className={classNames(
          'block py-2 px-3 w-full placeholder-gray-400 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm appearance-none focus:outline-none',
          {
            'border-red-500': hasError
          }
        )}
        {...props}
      />
      {hasError && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  </label>
)

Input.displayName = 'Input'

export default Input
