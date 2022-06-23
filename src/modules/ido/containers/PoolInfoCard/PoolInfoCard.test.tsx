import { render } from '@testing-library/react';

import { PoolInfoCard } from './PoolInfoCard';
import { poolInfoCardPropsMocked } from './PoolInfoCard.mock';

describe('PoolInfoCard', () => {
  it('should render', () => {
    const { container } = render(<PoolInfoCard {...poolInfoCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
