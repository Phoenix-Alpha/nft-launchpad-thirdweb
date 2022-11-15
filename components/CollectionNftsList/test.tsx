import { render } from '@testing-library/react'

import { CollectionNftsList } from '.'

describe('<CollectionNftsList />', () => {
  it('should renders correct <CollectionNftsList />', () => {
    render(<CollectionNftsList address="test" />)
  })
})
