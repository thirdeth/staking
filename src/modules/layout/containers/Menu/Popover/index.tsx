import { FC, RefObject } from 'react';
import { NavLink } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { Button, Grid, Popover, styled, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { ArrowRightIcon } from 'assets/img';
import { formatRoutesToArr } from 'modules/router/utils';
import { FontWeights } from 'theme/Typography';
import {
  BG_BLUE,
  BG_BLUE_EXTRALIGHT,
  BG_MAIN,
  BORDER_BUTTON_GRAY,
  BORDER_RADIUS_POPOVER,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_BLUE,
} from 'theme/variables';

const BG_ACTIVE_LINK = `url(${ArrowRightIcon}) right 16px center no-repeat, ${BG_BLUE_EXTRALIGHT}`;

const GridNavItem = styled(NavLink)({
  width: '100%',
  color: COLOR_TEXT_BLACK,
});

type MenuPopoverProps = {
  visible: boolean;
  anchorEl: RefObject<HTMLElement>;
  onClose: () => void;
};

export const MenuPopover: FC<MenuPopoverProps> = ({ visible, anchorEl, onClose }) => {
  return (
    <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={visible}
      onClose={onClose}
      sx={{
        '& .MuiPopover-paper': {
          mt: { xs: 2, sm: 2, md: 1 },
          pt: 1,
          pb: 2.5,
          width: 153,
          background: BG_MAIN,
          borderRadius: BORDER_RADIUS_POPOVER,
        },
      }}
    >
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          sx={{ borderBottom: BORDER_BUTTON_GRAY }}
        >
          <Typography variant="body1" fontWeight={FontWeights.fontWeightRegular} px={2}>
            Menu
          </Typography>
          <Button
            variant="text"
            startIcon={<Close sx={{ maxWidth: '16px', maxHeight: '16px', path: { fill: BG_BLUE } }} />}
            onClick={onClose}
            sx={{ pr: 1 }}
          />
        </Grid>
        {formatRoutesToArr(routes).map(
          ({ root: { id, path, title, isNavItem } }) =>
            isNavItem && (
              <Button key={id} variant="text" onClick={onClose} sx={{ p: 0, width: '100%' }}>
                <GridNavItem to={path}>
                  {({ isActive }) => (
                    <Typography
                      variant="body2"
                      sx={{
                        px: 2,
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: FontWeights.fontWeightRegular,
                        textTransform: 'none',
                        color: isActive ? COLOR_TEXT_BLUE : COLOR_TEXT_BLACK,
                        background: isActive ? BG_ACTIVE_LINK : 'transparent',
                      }}
                    >
                      {title}
                    </Typography>
                  )}
                </GridNavItem>
              </Button>
            ),
        )}
      </Grid>
    </Popover>
  );
};
