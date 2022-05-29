import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'components';
import { useShallowSelector } from 'hooks';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals, State, UserState } from 'types';

import s from './Header.module.scss';

interface IHeaderProps {
  disconnect: () => void;
}
export const Header: FC<IHeaderProps> = ({ disconnect }) => {
  const dispatch = useDispatch();
  const { address } = useShallowSelector<State, UserState>(userSelector.getUser);

  const openModal = useCallback(
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
    <div className={s.headerWrapper}>
      <Button onClick={() => (address ? disconnect() : openModal(Modals.ConnectWallet))}>
        {address.length ? 'Disconnect' : 'Connect wallet'}
      </Button>
    </div>
  );
};
