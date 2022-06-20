import { MutableRefObject, RefObject, useLayoutEffect, useState } from 'react';
import { PointValues } from 'components';
import { useWindowState } from 'hooks';

import { ProgressItemProps } from './index';

export const useGetProgressItems = (ref: RefObject<Element>, progress: number): [ProgressItemProps[]] => {
  const [progressItems, setProgressItems] = useState<ProgressItemProps[]>([]);

  const { width } = useWindowState();

  useLayoutEffect(() => {
    if (ref !== null) {
      // Check width of progress bar box
      const progressWidth = (ref as MutableRefObject<HTMLDivElement>).current.getBoundingClientRect().width;

      const progressItemSizeWithSpacing = 13;
      // Calculate max amount of points
      const pointItemsValue = Math.floor(progressWidth / progressItemSizeWithSpacing);

      const newArr = new Array(pointItemsValue).fill('').map((_, index) => {
        const pointCurrPercent = (100 / pointItemsValue) * (index + 1);

        // Filling current color for progress percent
        if (progress > pointCurrPercent) {
          return { value: index + 1, color: PointValues.blue };
        }
        return { value: index + 1, color: PointValues.white };
      });
      setProgressItems(newArr);
    }
  }, [progress, ref, width]);

  return [progressItems];
};
