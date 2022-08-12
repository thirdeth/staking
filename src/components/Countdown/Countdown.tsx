import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTimeLeft } from 'modules/ido/hooks';
import { FontFamilies } from 'theme';
import { getFormatedCounterDate } from 'utils';

const BoxValueStyled = styled(Box)(({ theme }) => ({
  minWidth: '100px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto',
  },
}));

const TypographyNumberStyled = styled(Typography)(({ theme }) => ({
  fontSize: 36,
  fontFamily: FontFamilies.secondary,
  [theme.breakpoints.down('md')]: {
    fontSize: 28,
  },
}));

export interface CountdownProps {
  timer: number;
  auctionEndText: string;
}

export const Countdown: FC<CountdownProps> = ({ timer, auctionEndText }) => {
  const timeLeft = useTimeLeft(+timer * 1000);

  if (!timeLeft) {
    return <Typography>{auctionEndText}</Typography>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between">
      <BoxValueStyled>
        <TypographyNumberStyled>{getFormatedCounterDate(days)}</TypographyNumberStyled>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          d
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <TypographyNumberStyled>{getFormatedCounterDate(hours)}</TypographyNumberStyled>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          h
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <TypographyNumberStyled>{getFormatedCounterDate(minutes)}</TypographyNumberStyled>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          m
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <TypographyNumberStyled minWidth={55}>{getFormatedCounterDate(seconds)}</TypographyNumberStyled>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          s
        </Typography>
      </BoxValueStyled>
    </Box>
  );
};
