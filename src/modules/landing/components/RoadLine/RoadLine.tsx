import { FC } from 'react';
import { Box } from '@mui/material';

export interface RoadLineProps {
  className?: string;
}

export const RoadLine: FC<RoadLineProps> = () => {
  // eslint-disable-next-line no-lone-blocks
  {
    /**
TODO Fixed to current drawing curve and arrow lines on home page 
*/
  }

  // const startDrawingRef = useRef(null);
  // const curveLineRef = useRef<HTMLImageElement | null>(null);

  // const [curveHeight] = useDrawLine(startDrawingRef);

  // useEffect(() => {
  // curveLineRef.current.style.setProperty('--y', curveHeight);
  // }, [curveHeight]);

  return (
    <Box>
      {/* <div ref={startDrawingRef} /> */}
      {/* <div className={s.curve}>
        <CurveLine ref={curveLineRef} />
      </div> */}
    </Box>
  );
};
