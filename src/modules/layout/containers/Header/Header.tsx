import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { useShallowSelector, useWindowState } from 'hooks';
import { useGetScollValue } from 'modules/layout/hooks';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { BG_MAIN, TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { Modals, State, UserState } from 'types';

import { HeaderControls } from './components';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const { address, nativeBalance, rankId } = useShallowSelector<State, UserState>(userSelector.getUser);
  const [headerPadding, setHeaderPadding] = useState(0);
  const [scrollToTopValue] = useGetScollValue();
  const { width } = useWindowState();

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

  useEffect(() => {
    const isWindowsOs = navigator.userAgent.indexOf('Win') !== -1;
    if (isWindowsOs) {
      setHeaderPadding(17);
    }
  }, []);

  return (
    <Box
      sx={{
        py: scrollToTopValue <= 150 ? 2.5 : 0.8,
        paddingRight: `${headerPadding}px`,
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '2',
        width: '100vw',
        background: BG_MAIN,
        transition: TRANSITION_DEFAULT_TIME,
      }}
    >
      <Container>
        <Grid container item direction="column" justifyContent="center" alignItems="center">
          <HeaderControls
            address={address}
            rankId={rankId}
            nativeBalance={nativeBalance}
            onOpenModal={handleOpenModal}
            width={+width}
          />
        </Grid>
      </Container>
    </Box>
  );
};
