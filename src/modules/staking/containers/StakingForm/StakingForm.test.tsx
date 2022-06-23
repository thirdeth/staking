import { render } from '@testing-library/react';

import { StakingForm } from './StakingForm';
import { stakingFormPropsMocked } from './StakingForm.mock';

describe('StakingForm', () => {
  it('should render', () => {
    const { container } = render(<StakingForm {...stakingFormPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
