import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { UserBalance } from 'components';
import { MainLogo } from 'components/Icon/components';
import { formatRoutesToArr } from 'modules/router/utils';
import { BORDER_HEADER, COLOR_TEXT_BLACK, COLOR_TEXT_BLUE } from 'theme/variables';
import { Modals } from 'types';

import { Account } from '../../Account';

interface HeaderControlsProps {
  address: string;
  onOpenModal: (type: Modals) => void;
}

const GridNavItem = styled(NavLink)({
  color: COLOR_TEXT_BLACK,
});

export const HeaderControls: FC<HeaderControlsProps> = ({ address, onOpenModal }) => {
  return (
    <Grid container item justifyContent="space-between" alignItems="center" xs={12}>
      <Grid container item alignItems="center">
        <Grid container item alignItems="center" columnGap={2} paddingRight={2}>
          <Grid item>
            <MainLogo />
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
              Cronos Launcher
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          paddingX={4.5}
          columnGap={7}
          sx={{
            borderRight: BORDER_HEADER,
            borderLeft: BORDER_HEADER,
            height: '75px',
          }}
        >
          {formatRoutesToArr(routes).map(
            ({ root: { id, path, title, isNavItem } }) =>
              isNavItem && (
                <Grid key={id} item>
                  <GridNavItem to={path}>
                    {({ isActive }) => (
                      <Typography variant="body2" color={isActive ? COLOR_TEXT_BLUE : COLOR_TEXT_BLACK}>
                        {title}
                      </Typography>
                    )}
                  </GridNavItem>
                </Grid>
              ),
          )}
        </Grid>
      </Grid>
      {address.length ? (
        <Grid item container justifyContent="center" alignItems="center" wrap="nowrap" columnGap={3}>
          <UserBalance balance="1.123124124" />
          <Account address={address} onDisconnect={() => onOpenModal(Modals.Disconnect)} />
        </Grid>
      ) : (
        <Button size="large" onClick={() => onOpenModal(Modals.ConnectWallet)}>
          Connect wallet
        </Button>
      )}
    </Grid>
  );
};
