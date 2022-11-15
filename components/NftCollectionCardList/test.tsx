import { render } from '@testing-library/react'

import { NftCollectionCardList } from '.'

describe('<NftCollectionCardList />', () => {
  it('should renders correct <NftCollectionCardList />', () => {
    render(<NftCollectionCardList addresses={[]} />)
  })
})
