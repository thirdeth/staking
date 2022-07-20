import { render } from '@testing-library/react';

import { rankingInfoCardPropsMocked } from './RankingInfoCard.mock';
import { RankingInfoCard } from './RankingInfoCardProps';

describe('RankingInfoCard', () => {
  it('should render', () => {
    const { container } = render(<RankingInfoCard {...rankingInfoCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
