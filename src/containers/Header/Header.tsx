import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { useShallowSelector } from 'hooks';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { BG_MAIN } from 'theme/variables';
import { Modals, State, UserState } from 'types';

import { HeaderControls } from './components';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const { address } = useShallowSelector<State, UserState>(userSelector.getUser);

  const handleOpenModal = useCallback(
    (type: Modals) => {
      dispatch(
        setActiveModal({
          activeModal: type,
          txHash: '',
          open: true,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0',
        zIndex: '2',
        background: BG_MAIN,
      }}
    >
      <Container>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: '20px 0' }}
          xs={12}
        >
          <HeaderControls address={address} onOpenModal={handleOpenModal} />
        </Grid>
      </Container>
    </Box>
  );
};
