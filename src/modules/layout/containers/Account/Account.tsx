import { FC, useRef } from 'react';
import { Button, Grid, styled, Typography } from '@mui/material';
import { ArrowDown } from 'components/Icon/components';
import { useModal } from 'hooks';
import {
  BG_BUTTON_GRAY_DARK,
  BORDER_BUTTON_GRAY_BOLD,
  COLOR_TEXT_BLUE,
  TRANSITION_DEFAULT_TIME,
} from 'theme/variables';
import { shortenPhrase } from 'utils';

import { Popover } from './Popover';

export interface AccountProps {
  address: string;
  onDisconnect: () => void;
}

const AccountButtonBox = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 1.7),
  width: '185px',
  height: '78px',
  background: 'transparent',
  border: BORDER_BUTTON_GRAY_BOLD,

  '&:hover': {
    background: 'transparent',
    svg: {
      transform: 'rotate(180deg)',
    },
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    right: '37px',
    width: '2px',
    height: '46px',
    background: BG_BUTTON_GRAY_DARK,
  },
}));

export const Account: FC<AccountProps> = ({ onDisconnect, address }) => {
  const popoverRef = useRef(null);
  const [isAccountInfoVisible, onOpenAccountInfo, onCloseAccountInfo] = useModal(false);

  const handleDisconnect = () => {
    onCloseAccountInfo();
    onDisconnect();
  };

  return (
    <>
      <AccountButtonBox ref={popoverRef} onClick={onOpenAccountInfo} variant="text">
        <Grid item container direction="column" justifyContent="center" alignItems="flex-start" xs={12}>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
            Connected
          </Typography>
          <Typography variant="body2" color={COLOR_TEXT_BLUE}>
            {shortenPhrase(address, 6, 4)}
          </Typography>
        </Grid>
        <Grid item>
          <ArrowDown
            sx={{
              transition: TRANSITION_DEFAULT_TIME,
              transform: isAccountInfoVisible ? 'rotate(180deg)' : 'none',
            }}
          />
        </Grid>
      </AccountButtonBox>

      {isAccountInfoVisible && (
        <Popover
          address={address}
          anchorEl={popoverRef}
          visible={isAccountInfoVisible}
          onClose={onCloseAccountInfo}
          onDisconnect={handleDisconnect}
        />
      )}
    </>
  );
};
