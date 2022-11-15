import { render } from '@testing-library/react'

import { FormFieldError } from '.'

describe('<FormFieldError />', () => {
  it('should renders correct <FormFieldError />', () => {
    render(<FormFieldError name="test" />)
  })
})
