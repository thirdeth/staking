import { CSSProperties, FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Copy } from 'components/Icon/components';
import {
  BG_WHITE_OPACITY,
  BORDER_BUTTON_GRAY,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_GRAY_LIGHT,
  COLOR_TEXT_WHITE_EXTRALIGHT,
} from 'theme/variables';

type Size = 'sm' | 'md';
type Color = 'primary' | 'secondary';

const sizesState: Record<Size, string> = {
  sm: '170px',
  md: '300px',
};

const boxesState: Record<Color, CSSProperties> = {
  primary: {
    background: 'transparent',
    border: BORDER_BUTTON_GRAY,
  },
  secondary: {
    background: BG_WHITE_OPACITY,
  },
};
const colorsState: Record<Color, string> = {
  primary: COLOR_TEXT_GRAY_LIGHT,
  secondary: COLOR_TEXT_WHITE_EXTRALIGHT,
};
export interface CopyTextProps {
  size?: Size;
  color?: Color;
  text: string;
}

export const CopyText: FC<CopyTextProps> = ({ size = 'md', color = 'primary', text }) => {
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setHelperText('');
    }, 1500);
    return () => clearTimeout(timer);
  }, [helperText]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setHelperText('Coppied!');
    } catch (err) {
      setHelperText('Not coppied!');
    }
  };
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: '44p',
        borderRadius: BORDER_RADIUS_DEFAULT,
        ...boxesState[color],
      }}
    >
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        xs={12}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="subtitle1"
          color={colorsState[color]}
          sx={{
            maxWidth: sizesState[size],
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {helperText || text}
        </Typography>
        <Button
          variant="text"
          startIcon={
            <Copy
              sx={{
                color: colorsState[color],
              }}
            />
          }
          sx={{
            p: 0,
          }}
          onClick={handleCopyAddress}
        />
      </Grid>
    </Box>
  );
};
