import { FC, useRef } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { ArrowDown, WalletIcon } from 'components/Icon/components';
import { useModal } from 'hooks';
import { BORDER_BUTTON_GRAY_BOLD, COLOR_TEXT_BLUE, TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { shortenPhrase } from 'utils';

import { Popover } from './Popover';

export interface AccountProps {
  address: string;
  onDisconnect: () => void;
}

export const Account: FC<AccountProps> = ({ onDisconnect, address }) => {
  const popoverRef = useRef(null);
  const [isAccountInfoVisible, onOpenAccountInfo, onCloseAccountInfo] = useModal(false);

  const handleDisconnect = () => {
    onCloseAccountInfo();
    onDisconnect();
  };

  return (
    <>
      <Button
        ref={popoverRef}
        onClick={onOpenAccountInfo}
        variant="text"
        sx={{
          position: 'relative',
          px: 1.7,
          width: '194px',
          height: '50px',
          background: 'transparent',
          border: BORDER_BUTTON_GRAY_BOLD,

          '&:hover': {
            background: 'transparent',
            svg: {
              '&:nth-of-type(2)': {
                transform: 'rotate(180deg)',
              },
            },
          },
        }}
      >
        <Grid container justifyContent="flex-start" alignItems="center" columnGap={1}>
          <Grid item>
            <WalletIcon
              sx={{
                path: {
                  fill: '#D8D8D8',
                },
              }}
            />
          </Grid>
          <Grid item>
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
        </Grid>
      </Button>

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
