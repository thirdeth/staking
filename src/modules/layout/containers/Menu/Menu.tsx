import { FC, useRef } from 'react';
import { Button } from '@mui/material';
import { BurgerIcon } from 'components/Icon/components';
import { useModal } from 'hooks';
import { BG_MAIN } from 'theme/variables';

import { MenuPopover } from './Popover';

export const Menu: FC = () => {
  const popoverRef = useRef(null);
  const [isMenuVisible, onOpenMenu, onCloseMenu] = useModal(false);

  return (
    <>
      <Button
        ref={popoverRef}
        startIcon={<BurgerIcon sx={{ path: { fill: BG_MAIN } }} />}
        sx={{ pr: 0, pl: 1, minWidth: '56px' }}
        onClick={onOpenMenu}
      />
      {isMenuVisible && <MenuPopover visible={isMenuVisible} anchorEl={popoverRef} onClose={onCloseMenu} />}
    </>
  );
};
