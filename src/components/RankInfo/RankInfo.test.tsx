import { render } from '@testing-library/react';

import { RankInfo } from './RankInfo';
import { rankInfoPropsMocked } from './RankInfo.mock';

describe('RankInfo', () => {
  it('should render', () => {
    const { container } = render(<RankInfo {...rankInfoPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
