import { render } from '@testing-library/react';

import { InfoCard } from './InfoCard';
import { infoCardPropsMocked } from './InfoCard.mock';

describe('InfoCard', () => {
  it('should render', () => {
    const { container } = render(<InfoCard {...infoCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
