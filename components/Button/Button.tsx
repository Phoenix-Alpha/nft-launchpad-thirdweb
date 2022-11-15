import classNames from 'classnames'
import { ButtonHTMLAttributes, FC, memo, RefObject } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: RefObject<HTMLButtonElement>
  isLoading?: boolean
  className?: string
  loaderColorHex?: string
}

export const Button: FC<IButtonProps> = memo(
  ({
    btnRef,
    children,
    className = '',
    isLoading = false,
    loaderColorHex = '#fff',
    ...props
  }: IButtonProps) => (
    <button
      ref={btnRef}
      className={classNames(
        'relative flex items-center justify-center py-2 px-4 w-full font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none whitespace-nowrap',
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg
          width="16"
          height="16"
          className="top-x-1/2 absolute left-5 mr-3 -ml-1 inline animate-spin motion-reduce:animate-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke={loaderColorHex}
            strokeWidth="4"
          />
          <path
            className="opacity-100"
            fill={loaderColorHex}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export default Button
