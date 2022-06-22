import { render } from '@testing-library/react';

import { LauncherCard } from './LauncherCard';
import { launcherCardPropsMocked } from './LauncherCard.mock';

describe('LauncherCard', () => {
  it('should render', () => {
    const { container } = render(<LauncherCard {...launcherCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
