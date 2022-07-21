import { FC, RefObject, useMemo } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import { BG_MAIN, BORDER_RADIUS_POPOVER, COLOR_TEXT_GRAY_LIGHT } from 'theme/variables';
import { fromDecimals } from 'utils';

type SureWithdrawPopupProps = {
  visible: boolean;
  anchorEl: RefObject<HTMLElement>;
  comissionPercent: string;
  onClose: () => void;
  onChangeSure: (flag: boolean) => void;
};

export const SureWithdrawPopup: FC<SureWithdrawPopupProps> = ({
  anchorEl,
  comissionPercent,
  visible,
  onClose,
  onChangeSure,
}) => {
  const commisionPercentFromDec = useMemo(() => +fromDecimals(comissionPercent) * 100, [comissionPercent]);

  return (
    <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={visible}
      onClose={onClose}
      sx={{
        '& .MuiPopover-paper': {
          mt: 1,
          px: 2.5,
          py: 2,
          width: 323,
          height: 128,
          background: BG_MAIN,
          borderRadius: BORDER_RADIUS_POPOVER,
        },
      }}
    >
      <Typography mb={2} fontSize={14} lineHeight="20px" color={COLOR_TEXT_GRAY_LIGHT} textAlign="center">
        Are you sure? You will be charged with {commisionPercentFromDec}% of the staked balance
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button size="small" variant="contained" onClick={() => onChangeSure(true)}>
          Yes
        </Button>
        <Button size="small" color="secondary" variant="outlined" sx={{ ml: 2 }} onClick={() => onChangeSure(false)}>
          No
        </Button>
      </Box>
    </Popover>
  );
};
