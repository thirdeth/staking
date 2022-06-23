import { render } from '@testing-library/react';

import { SideBar } from './SideBar';
import { sideBarPropsMocked } from './SideBar.mock';

describe('SideBar', () => {
  it('should render', () => {
    const { container } = render(<SideBar {...sideBarPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
