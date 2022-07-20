import { render } from '@testing-library/react';

import { CircleChart } from './CircleChart';
import { circleChartPropsMocked } from './CircleChart.mock';

describe('CircleChart', () => {
  it('should render', () => {
    const { container } = render(<CircleChart {...circleChartPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
