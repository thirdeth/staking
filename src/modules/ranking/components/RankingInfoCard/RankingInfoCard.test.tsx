import { render } from '@testing-library/react';

import { RankingInfoCard } from './RankingInfoCard';
import { rankingInfoCardPropsMocked } from './RankingInfoCard.mock';

describe('RankingInfoCard', () => {
  it('should render', () => {
    const { container } = render(<RankingInfoCard {...rankingInfoCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
