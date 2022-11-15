import { render } from '@testing-library/react'

import { SiteHead } from './index'

describe('<SiteHead />', () => {
  it('should renders correct <SiteHead />', async () => {
    render(<SiteHead />)
  })
})
