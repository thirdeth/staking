import { FC, useRef } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { ArrowDown, WalletIcon } from 'components/Icon/components';
import { useModal } from 'hooks';
import {
  BG_BUTTON_GRAY_DARK,
  BG_MAIN,
  BORDER_BUTTON_GRAY_BOLD,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLUE,
  TRANSITION_DEFAULT_TIME,
} from 'theme/variables';
import { shortenPhrase } from 'utils';

import { AccountPopover } from './Popover';

export interface AccountProps {
  address: string;
  width: number;
  onDisconnect: () => void;
}

export const Account: FC<AccountProps> = ({ onDisconnect, address, width }) => {
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
        variant={width > 900 ? 'text' : 'contained'}
        startIcon={<WalletIcon sx={{ path: { fill: width > 900 ? BG_BUTTON_GRAY_DARK : BG_MAIN } }} />}
        sx={(theme) => ({
          [theme.breakpoints.between('md', 'xl')]: {
            position: 'relative',
            px: 1.7,
            width: '194px',
            height: '50px',
            background: 'transparent',
            border: BORDER_BUTTON_GRAY_BOLD,
            borderRadius: BORDER_RADIUS_DEFAULT,
            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
            '&:hover': {
              background: 'transparent',
              svg: {
                '&:nth-of-type(2)': {
                  transform: 'rotate(180deg)',
                },
              },
            },
          },
          [theme.breakpoints.down('md')]: { pr: 0, pl: 1, minWidth: '56px' },
        })}
      >
        {width > 900 && (
          <Grid container justifyContent="flex-start" alignItems="center" columnGap={1}>
            <Typography variant="body2" color={COLOR_TEXT_BLUE}>
              {shortenPhrase(address, 6, 4)}
            </Typography>
            <ArrowDown
              sx={{
                transition: TRANSITION_DEFAULT_TIME,
                transform: isAccountInfoVisible ? 'rotate(180deg)' : 'none',
              }}
            />
          </Grid>
        )}
      </Button>

      {isAccountInfoVisible && (
        <AccountPopover
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
