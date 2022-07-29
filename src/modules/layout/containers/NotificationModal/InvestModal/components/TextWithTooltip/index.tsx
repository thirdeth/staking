import { FC } from 'react';
import { Tooltip, Typography, TypographyProps } from '@mui/material';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_GRAY_DARK } from 'theme/variables';

type TextWithTooltipProps = {
  value: string;
  startText: string;
  endText: string;
} & TypographyProps;

export const TextWithTooltip: FC<TextWithTooltipProps> = ({ value, startText, endText, ...textProps }) => {
  return (
    <Tooltip title={value} placement="top-start">
      <Typography
        {...textProps}
        fontWeight={FontWeights.fontWeightRegular}
        color={COLOR_TEXT_GRAY_DARK}
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        {startText}
        <Typography mx={0.5} maxWidth={120} noWrap color={COLOR_TEXT_GRAY_DARK}>
          {value}
        </Typography>
        {endText}
      </Typography>
    </Tooltip>
  );
};
