import { FC } from 'react';
import { Tooltip, Typography, TypographyProps } from '@mui/material';

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
        <Typography mx={0.5} maxWidth={120} noWrap {...textProps}>
          {!isLoading && value}

          {isLoading && '...'}
        </Typography>
        {endText}
      </Typography>
    </Tooltip>
  );
};
