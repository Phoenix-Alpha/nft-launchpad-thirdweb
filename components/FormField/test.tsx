import { render } from '@testing-library/react'

import { FormField } from '.'

describe('<FormField />', () => {
  it('should renders correct <FormField />', () => {
    render(<FormField name="test" />)
  })
})
