import { render } from '@testing-library/react';

import { rowCardSkeletonPropsMocked } from './RowCardSkeleton.mock';
import { RowCardSkeleton } from './RowCardSkeletonProps';

describe('RowCardSkeleton', () => {
  it('should render', () => {
    const { container } = render(<RowCardSkeleton {...rowCardSkeletonPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
