import { FC, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Popover as MuiPopover, styled, Typography } from '@mui/material';
import { CopyText } from 'components';
import { Close, OutIcon } from 'components/Icon/components';
import { FontFamilies } from 'theme/Typography';
import { BG_BLUE, BG_BUTTON_WHITE, BORDER_RADIUS_POPOVER, COLOR_TEXT_RED, COLOR_TEXT_WHITE } from 'theme/variables';

import { accountLinkItems } from './Popover.helpers';

interface AccountModalProps {
  address: string;
  visible: boolean;
  anchorEl: RefObject<HTMLElement>;
  onClose: () => void;
  onDisconnect: () => void;
}

const DisconnectButton = styled(Button)({
  width: '100%',
  color: COLOR_TEXT_RED,
  textTransform: 'none',
  fontFamily: FontFamilies.primary,

  '&:hover': {
    background: BG_BUTTON_WHITE,
    color: COLOR_TEXT_RED,
  },
});

export const Popover: FC<AccountModalProps> = ({ address, anchorEl, visible, onClose, onDisconnect }) => {
  return (
    <MuiPopover
      anchorEl={anchorEl.current}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={visible}
      onClose={onClose}
      sx={{
        '& .MuiPopover-paper': {
          mt: 1,
          px: 2.5,
          pt: 1,
          pb: 2.5,
          width: '310px',
          height: '328px',
          background: BG_BLUE,
          borderRadius: BORDER_RADIUS_POPOVER,
        },
      }}
    >
      <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={2} xs={12}>
        <Grid item container justifyContent="space-between" alignItems="center" xs={12}>
          <Typography variant="h3" color={COLOR_TEXT_WHITE} fontFamily={FontFamilies.primary}>
            Account
          </Typography>
          <Button
            variant="text"
            startIcon={<Close sx={{ maxWidth: '16px', maxHeight: '16px' }} />}
            onClick={onClose}
            sx={{
              padding: '0',
            }}
          />
        </Grid>
        <Grid item container xs={12}>
          <CopyText size="sm" color="secondary" text={address} />
        </Grid>
        {accountLinkItems.map(({ link, title, Icon }, index) => (
          // list is not re rendering
          // eslint-disable-next-line react/no-array-index-key
          <Link key={index} to={link} onClick={onClose}>
            <Grid item container xs={12} columnGap={2}>
              <Icon />
              <Typography variant="body2" color={COLOR_TEXT_WHITE}>
                {title}
              </Typography>
            </Grid>
          </Link>
        ))}
        <Grid item container xs={12}>
          <DisconnectButton color="secondary" onClick={onDisconnect} endIcon={<OutIcon />}>
            Disconnect
          </DisconnectButton>
        </Grid>
      </Grid>
    </MuiPopover>
  );
};
