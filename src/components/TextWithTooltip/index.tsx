import { FC } from 'react';
import { Tooltip, Typography, TypographyProps } from '@mui/material';
import BigNumber from 'bignumber.js/bignumber';

type TextWithTooltipProps = {
  value: string;
  startText?: string;
  endText?: string;
  isLoading?: boolean;
} & TypographyProps;

export const TextWithTooltip: FC<TextWithTooltipProps> = ({
  value,
  startText,
  endText,
  isLoading = false,
  ...textProps
}) => {
  return (
    <Tooltip title={value} placement="top-start">
      <Typography {...textProps} sx={{ display: 'flex', flexDirection: 'row' }}>
        {startText}
        <Typography mx={0.5} maxWidth={100} noWrap {...textProps}>
          {!isLoading && new BigNumber(value).isNaN() ? value : new BigNumber(value).toFixed(2)}

          {isLoading && '...'}
        </Typography>
        {endText}
      </Typography>
    </Tooltip>
  );
};
