import classnames from 'classnames'
import { ErrorMessage } from 'formik'
import { FC, memo } from 'react'

export interface IFormFieldErrorProps {
  name: string
  className?: string
}

export const FormFieldError: FC<IFormFieldErrorProps> = memo(
  ({ name, className = '' }: IFormFieldErrorProps) => (
    <ErrorMessage
      name={name}
      component="div"
      className={classnames('mt-2 text-xs font-normal text-red-500', className)}
    />
  )
)

FormFieldError.displayName = 'FormFieldError'

export default FormFieldError
