import { FC } from 'react';
import { Button, Grid, styled, Typography } from '@mui/material';
import { MetamaskLogo, WalletConnectLogo } from 'assets/img';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BORDER_BUTTON_BLUE, BORDER_BUTTON_RED, COLOR_TEXT_BLACK, COLOR_TEXT_GRAY_LIGHT } from 'theme/variables';
import { Chains, INotifyModalProps, WalletProviders } from 'types';

interface IConnectWalletModalProps extends INotifyModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: (provider: any, chain: any) => void;
}

const WalletButton = styled(Button)({
  width: '100%',
  maxWidth: '100%',
  height: '76px',
  background: 'transparent',
  color: COLOR_TEXT_BLACK,
  fontFamily: FontFamilies.primary,
  fontSize: '22px',

  '&:hover': {
    background: 'transparent',
  },
});

export const ConnectWalletModal: FC<IConnectWalletModalProps> = ({ onConnectWallet, closeModal, currData }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConnect = (provider: any, chain: any) => {
    onConnectWallet(provider, chain);
    closeModal();
  };

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={2}>
      <Typography variant="subtitle1" color={COLOR_TEXT_GRAY_LIGHT}>
        {currData?.subtitle}
      </Typography>
      <Grid item container xs={12}>
        <WalletButton
          sx={{
            border: BORDER_BUTTON_RED,
            fontWeight: FontWeights.fontWeightMedium,
            letterSpacing: '3.5px',
          }}
          startIcon={<MetamaskLogo />}
          onClick={() => handleConnect(WalletProviders.metamask, Chains.Cronos)}
        >
          MetaMask
        </WalletButton>
      </Grid>
      <Grid item container xs={12}>
        <WalletButton
          sx={{
            border: BORDER_BUTTON_BLUE,
            textTransform: 'none',
          }}
          startIcon={<WalletConnectLogo />}
          onClick={() => handleConnect(WalletProviders.walletConnect, Chains.Cronos)}
        >
          Wallet connect
        </WalletButton>
      </Grid>
    </Grid>
  );
};
