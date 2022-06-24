import { FC, useMemo, useRef } from 'react';
import { Box } from '@mui/material';
import { useDrawLine } from 'modules/landing/hooks';

import { CurveLine, HorizontalArrowIcon } from '../icons';

export interface RoadLineProps {
  className?: string;
}

// it affects on scrollTop value and on calculating of lines sizes
export const PREVIEW_SECTION_SIZE = '820px';

// to which arrows one full visible value has
const arrowOneFullValue = 1600;

// to which arrows two full visible value has
const arrowTwoFullValue = 1500;

// acceleration drawing arrows one
const accOne = 0.2;

// acceleration drawing arrows two
const accTwo = 0.45;

export const RoadLine: FC<RoadLineProps> = () => {
  const startDrawingRef = useRef(null);
  const [curveHeight] = useDrawLine(startDrawingRef);

  const arrowScaleValueOne = useMemo(() => curveHeight / arrowOneFullValue - accOne, [curveHeight]);
  const arrowScaleValueTwo = useMemo(() => curveHeight / arrowTwoFullValue - accTwo, [curveHeight]);

  return (
    <Box ref={startDrawingRef} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
      <CurveLine
        sx={{
          position: 'absolute',
          top: '-225px',
          left: '200px',
          zIndex: '-1',
        }}
        strokeDashoffset={curveHeight}
      />
      <HorizontalArrowIcon
        sx={{
          position: 'absolute',
          top: '525px',
          left: '490px',
          zIndex: '-1',
          opacity: curveHeight > 1302 ? 1 : 0,
          transform: `scale(${arrowScaleValueOne})`,
        }}
      />
      <HorizontalArrowIcon
        sx={{
          position: 'absolute',
          top: '1025px',
          left: '490px',
          zIndex: '-1',
          opacity: curveHeight > 1702 ? 1 : 0,
          transform: `scale(${arrowScaleValueTwo})`,
        }}
      />

      <div ref={startDrawingRef} />
    </Box>
  );
};
