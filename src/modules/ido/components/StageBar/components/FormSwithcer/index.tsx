import { FC } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BG_BLUE, BG_GRAY, BG_MAIN, BORDER_RADIUS_DEFAULT } from 'theme/variables';

type FormswitcherProps = {
  isStakingRequire: boolean;
  onChangeStakingRequired: () => void;
};

export const FormSwitcher: FC<FormswitcherProps> = ({ isStakingRequire, onChangeStakingRequired }) => {
  return (
    <FormControlLabel
      label={
        <Typography variant="body2" fontWeight={FontWeights.fontWeightMedium} fontFamily={FontFamilies.secondary}>
          {isStakingRequire ? 'Staking required' : 'Staking not required'}
        </Typography>
      }
      sx={{
        mt: 1,
        mx: 0,
        width: 274,
        height: 40,
        alignSelf: 'flex-end',
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
      control={
        <Switch
          size="medium"
          sx={(theme) => ({
            '&.MuiSwitch-root': {
              width: 72,
            },
            '& .MuiSwitch-thumb': {
              mt: 0.7,
              ml: 1,
              width: 18,
              height: 12,
              borderRadius: '17px',
              background: BG_MAIN,
              boxShadow: '0px 4px 6px -1px #00000014 0px 2px 4px -1px #0000000F',
            },
            '& .MuiSwitch-track': {
              width: 45,
              height: 18,
              borderRadius: '12px',
              backgroundColor: BG_BLUE,
              opacity: 1,
              transition: theme.transitions.create(['background-color'], {
                duration: 500,
              }),
            },
          })}
          checked={!isStakingRequire}
          onChange={onChangeStakingRequired}
        />
      }
    />
  );
};
