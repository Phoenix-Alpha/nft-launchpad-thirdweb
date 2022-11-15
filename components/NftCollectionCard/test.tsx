import { render } from '@testing-library/react'

import { NftCollectionCard } from '.'

describe('<NftCollectionCard />', () => {
  it('should renders correct <NftCollectionCard />', () => {
    render(<NftCollectionCard address="test" />)
  })
})
