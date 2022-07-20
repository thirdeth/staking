import { FC, PropsWithChildren } from 'react';
import { Box, Dialog, Grid, IconButton, styled, Typography } from '@mui/material';
import { Close } from 'components/Icon/components';
import { BG_BLUE, BG_BLUE_ACCENT, BG_MAIN, COLOR_TEXT_WHITE } from 'theme/variables';

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
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={(theme) => ({
            position: 'relative',
            padding: theme.spacing(0, 2.3),
            height: '60px',
            background: BG_BLUE,
          })}
        >
          <Grid item>
            <Typography variant="h4" color={COLOR_TEXT_WHITE}>
              {title}
            </Typography>
          </Grid>
          {closable && (
            <Grid item>
              <CloseIconButton
                onClick={onClose}
                sx={{ svg: { path: { stroke: BG_MAIN } }, '&:hover': { svg: { path: { stroke: BG_BLUE_ACCENT } } } }}
              >
                <Close />
              </CloseIconButton>
            </Grid>
          )}
        </Grid>
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
