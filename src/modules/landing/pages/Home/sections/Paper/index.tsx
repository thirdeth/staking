import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CheckIcon } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';

import { paperItems } from './Paper.helpers';

export const Paper: FC = () => {
  return (
    <Box pt={20}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="center">
        {paperItems.map(({ id, Image, title, text, list }) => (
          <Box
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:nth-of-type(odd)': {
                flexDirection: 'row',
              },
              '&:nth-of-type(even)': {
                flexDirection: 'row-reverse',
              },
            }}
          >
            <Image />
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              rowGap={3}
              xs={5}
            >
              <Typography variant="h1">{title}</Typography>
              {text}
              <Grid container direction="column" justifyContent="center" alignItems="flex-start" rowGap={3}>
                {list.map((checkItem) => (
                  <Grid item container key={checkItem} justifyContent="flex-start" alignItems="center" columnGap={3}>
                    <CheckIcon />
                    <Typography variant="body1" fontWeight={FontWeights.fontWeightMedium}>
                      {checkItem}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
