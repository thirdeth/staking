import { render } from '@testing-library/react';

import { RankingCard } from './RankingCard';
import { rankingCardPropsMocked } from './RankingCard.mock';

describe('RankingCard', () => {
  it('should render', () => {
    const { container } = render(<RankingCard {...rankingCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
