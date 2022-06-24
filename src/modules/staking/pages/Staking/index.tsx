import { FC, MouseEvent, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ApplyCard } from 'components';
import { useValidateInputField, ValidationTypes } from 'hooks';
import { ChartCard } from 'modules/staking/components';
import { StakingForm } from 'modules/staking/containers';

import { chartItemsArray } from './Staking.helpers';

const USER_STAKES_VALUE_MOCK = 256.5;
const USER_BALANCE_VALUE_MOCK = 2889.0;

interface StakingProps {
  title: string;
}

export const Staking: FC<StakingProps> = ({ title }) => {
  const [stakePeriod, setStakePeriod] = useState(2);
  const [stakeValue, setStakeValue, setMaxStakeValue] = useValidateInputField(ValidationTypes.number);

  const handleCahngeStakePeriod = (event: MouseEvent<HTMLElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setStakePeriod(+value);
  };

  const handleStake = () => {
    console.log('stake value:', stakeValue, 'stake period:', stakePeriod);
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h1">{title}</Typography>
        </Grid>
        <Grid item>
          <Button>Leaderboard</Button>
        </Grid>
      </Grid>

      <Grid
        container
        pt={5.1}
        justifyContent={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12} sm={12} md={6}>
          <StakingForm
            userStakes={USER_STAKES_VALUE_MOCK}
            userBalance={USER_BALANCE_VALUE_MOCK}
            stakePeriod={stakePeriod}
            stakeValue={stakeValue}
            onChangeStakePeriod={handleCahngeStakePeriod}
            onChangeStakeValue={setStakeValue}
            onSetMaxStakeValue={setMaxStakeValue}
            onStake={handleStake}
          />
        </Grid>
        <Grid item container spacing={1} direction="column" xs={12} sm={12} md={6}>
          {chartItemsArray.map(({ value, text, Img }, index) => (
            // not rerendering chart card items
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item>
              <ChartCard value={value} text={text} chartImg={<Img />} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <ApplyCard size="s" />
    </Box>
  );
};
