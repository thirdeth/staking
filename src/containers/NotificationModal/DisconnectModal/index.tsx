import { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { CopyText } from 'components';
import { INotifyModalProps } from 'types';

interface IDisconnectModalProps extends INotifyModalProps {
  address: string;
  disconnect: () => void;
}

export const DisconnectModal: FC<IDisconnectModalProps> = ({ address, disconnect, closeModal }) => {
  const handleDisconnect = () => {
    disconnect();
    closeModal();
  };
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" rowGap={2}>
      <CopyText text={address} />
      <Button
        variant="contained"
        sx={{
          width: '100%',
          maxWidth: '100%',
        }}
        onClick={handleDisconnect}
      >
        Disconnect
      </Button>
    </Grid>
  );
};
