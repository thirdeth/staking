import { render } from '@testing-library/react';

import { TokenInfoCard } from './TokenInfoCard';
import { tokenInfoCardPropsMocked } from './TokenInfoCard.mock';

describe('TokenInfoCard', () => {
  it('should render', () => {
    const { container } = render(<TokenInfoCard {...tokenInfoCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
