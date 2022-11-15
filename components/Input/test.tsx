import { render, screen } from '@testing-library/react'

import { Input } from '.'

describe('<Input />', () => {
  it('should renders correct <Input />', () => {
    render(<Input label="Test Input" />)

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
  })
})
