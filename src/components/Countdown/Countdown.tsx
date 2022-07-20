import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTimeLeft } from 'modules/ido/hooks';
import { IdoStatus } from 'types/store/requests';
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

export interface CountdownProps {
  timer: number;
  startTime: number;
  type: string;
  auctionEndText: string;
}

export const Countdown: FC<CountdownProps> = ({ startTime, type, timer, auctionEndText }) => {
  const timeLeft = useTimeLeft(+(type === IdoStatus.pending ? startTime : timer) * 1000);

  if (!timeLeft) {
    return <Typography variant="h1">{auctionEndText}</Typography>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between">
      <BoxValueStyled>
        <Typography variant="h1">{getFormatedCounterDate(days)}</Typography>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          d
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <Typography variant="h1">{getFormatedCounterDate(hours)}</Typography>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          h
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <Typography variant="h1">{getFormatedCounterDate(minutes)}</Typography>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          m
        </Typography>
      </BoxValueStyled>
      <BoxValueStyled>
        <Typography variant="h1" minWidth={55}>
          {getFormatedCounterDate(seconds)}
        </Typography>
        <Typography ml={1} variant="body2" textTransform="uppercase">
          s
        </Typography>
      </BoxValueStyled>
    </Box>
  );
};
