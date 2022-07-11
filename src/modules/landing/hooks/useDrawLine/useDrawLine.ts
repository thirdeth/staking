import { RefObject, useCallback, useEffect, useState } from 'react';

const DEFAULT_OBSERVER_PARAMS = {
  threshold: 0,
  root: null,
  rootMargin: '70%',
};

const DEFAULT_STROKE_OFFSET = 1000;
const LINE_OFFSET_VALUE = 350;

export const useDrawLine = (elementRef: RefObject<Element>, observerParams = DEFAULT_OBSERVER_PARAMS): [number] => {
  const [isAnimationStart, setAnimationStart] = useState(false);
  const [verticalLineHeight, setVerticalLineHeight] = useState(DEFAULT_STROKE_OFFSET);

  // if intersection ref is intersection
  // it mean that curve line must be drawing
  const handleToggleAnimationStarting = ([entry]: IntersectionObserverEntry[]) => {
    if (!entry) return;

    if (entry.isIntersecting) {
      setAnimationStart(true);
    } else {
      setAnimationStart(false);
    }
  };

  // drawing must be with little offset to view space after drawing line
  const handleDrawRoadLine = useCallback(
    (event: Event) => {
      const { scrollTop } = (event.target as Document).documentElement;

      if (isAnimationStart) {
        setVerticalLineHeight(+scrollTop + LINE_OFFSET_VALUE);
      }
    },
    [isAnimationStart],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ancorElement: any = elementRef?.current;
    const observer = new IntersectionObserver(handleToggleAnimationStarting, observerParams);

    // simple div element after title
    observer.observe(ancorElement);
    document.addEventListener('scroll', handleDrawRoadLine);

    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', handleDrawRoadLine);
    };
  }, [elementRef, handleDrawRoadLine, observerParams]);

  return [verticalLineHeight];
};
