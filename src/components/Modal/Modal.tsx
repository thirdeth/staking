import { FC, PropsWithChildren } from 'react';
import { Box, Dialog, IconButton, styled, Typography } from '@mui/material';
import { Close } from 'components/Icon/components';
import { BG_BLUE, COLOR_TEXT_WHITE } from 'theme/variables';

export interface ModalProps {
  // size?: 'sm' | 'md' | 'lg';
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  title?: string;
}

const CloseIconButton = styled(IconButton)({
  position: 'absolute',
  top: '18px',
  right: '19px',
});

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ open, onClose, closable = true, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      transitionDuration={{
        enter: 250,
        exit: 100,
      }}
    >
      {title && (
        <Box
          sx={(theme) => ({
            position: 'relative',
            padding: theme.spacing(0, 2.3),
            width: '100%',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            background: BG_BLUE,
          })}
        >
          <Typography variant="h4" color={COLOR_TEXT_WHITE}>
            {title}
          </Typography>
          {closable && (
            <CloseIconButton onClick={onClose}>
              <Close />
            </CloseIconButton>
          )}
        </Box>
      )}

      <Box
        sx={(theme) => ({
          padding: theme.spacing(2.2, 2.2, 4.7),
        })}
      >
        {children}
      </Box>
    </Dialog>
  );
};
