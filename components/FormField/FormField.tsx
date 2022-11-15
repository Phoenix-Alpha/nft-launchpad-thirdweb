import { Field, FieldProps } from 'formik'
import { FC, InputHTMLAttributes } from 'react'

import { Input } from '@/components'

export interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export const FormField: FC<IFormFieldProps> = ({
  name,
  label,
  ...props
}: IFormFieldProps) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <Input
        label={label}
        hasError={meta.touched && !!meta.error}
        {...props}
        {...field}
      />
    )}
  </Field>
)

FormField.displayName = 'FormField'

export default FormField
