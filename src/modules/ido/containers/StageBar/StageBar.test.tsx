import { render } from '@testing-library/react';

import { StageBar } from './StageBar';
import { stageBarPropsMocked } from './StageBar.mock';

describe('StageBar', () => {
  it('should render', () => {
    const { container } = render(<StageBar {...stageBarPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
