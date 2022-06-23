import { render } from '@testing-library/react';

import { TabsContent } from './TabsContent';
import { tabsContentPropsMocked } from './TabsContent.mock';

describe('TabsContent', () => {
  it('should render', () => {
    const { container } = render(<TabsContent {...tabsContentPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
