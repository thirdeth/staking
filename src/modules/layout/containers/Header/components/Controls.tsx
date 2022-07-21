import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { UserBalance } from 'components';
import { MainLogo, WalletIcon } from 'components/Icon/components';
import { Account, Menu } from 'modules/layout/containers';
import { formatRoutesToArr } from 'modules/router/utils';
import { FontFamilies } from 'theme/Typography';
import { BG_BLUE, BG_BLUE_LIGHT, BG_BUTTON_BLUE, COLOR_TEXT_BLACK, COLOR_TEXT_BLUE } from 'theme/variables';
import { Modals } from 'types';

interface HeaderControlsProps {
  address: string;
  rankId: string;
  nativeBalance: string;
  width: number;
  onOpenModal: (type: Modals) => void;
}

const GridNavItem = styled(NavLink)({
  color: COLOR_TEXT_BLACK,
});

export const HeaderControls: FC<HeaderControlsProps> = ({ address, rankId, nativeBalance, width, onOpenModal }) => {
  return (
    <Grid container item justifyContent="space-between" alignItems="center" xs={12} wrap="nowrap">
      <Menu />

      <Grid container item alignItems="center" columnGap={{ xs: 1, sm: 1, md: 2 }} paddingRight={0.5}>
        <MainLogo />
        <Typography
          fontFamily={FontFamilies.secondary}
          textTransform="uppercase"
          fontSize={{ xs: '18px', sm: '18px', md: '24px' }}
          maxWidth={{ xs: '103px', sm: '103px', md: '100%', lg: '100%' }}
        >
          Cronos Launcher
        </Typography>
      </Grid>

      <Grid
        container
        alignItems="center"
        paddingX={4.5}
        columnGap={7}
        sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
      >
        {formatRoutesToArr(routes).map(
          ({ root: { id, path, title, isNavItem } }) =>
            isNavItem && (
              <Grid key={id} item>
                <GridNavItem to={path}>
                  {({ isActive }) => (
                    <Typography
                      variant="body2"
                      color={isActive ? COLOR_TEXT_BLUE : COLOR_TEXT_BLACK}
                      sx={{ '&:hover': { color: COLOR_TEXT_BLUE } }}
                    >
                      {title}
                    </Typography>
                  )}
                </GridNavItem>
              </Grid>
            ),
        )}
      </Grid>
      {address.length ? (
        <Grid item container justifyContent="center" alignItems="center" wrap="nowrap" columnGap={3}>
          {width > 1000 && <UserBalance balance={nativeBalance} />}
          <Account
            address={address}
            rankId={rankId}
            nativeBalance={nativeBalance}
            width={width}
            onDisconnect={() => onOpenModal(Modals.Disconnect)}
          />
        </Grid>
      ) : (
        <Button
          size="large"
          sx={{
            pr: { xs: 0, sm: 0, md: 2 },
            pl: { xs: 1, sm: 1, md: 2 },
            minWidth: { xs: '56px', sm: '56px', md: '130px' },
            height: { xs: '44px', sm: '44px', md: '56px' },
            background: { xs: BG_BLUE_LIGHT, sm: BG_BLUE_LIGHT, md: BG_BUTTON_BLUE },
          }}
          onClick={() => onOpenModal(Modals.ConnectWallet)}
          startIcon={<WalletIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, path: { fill: BG_BLUE } }} />}
        >
          {width > 900 && 'Connect wallet'}
        </Button>
      )}
    </Grid>
  );
};
