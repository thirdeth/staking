import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { CheckIcon } from 'components/Icon/components';
import { useWindowState } from 'hooks';
import { FontWeights } from 'theme/Typography';

import { paperItems } from './Paper.helpers';

export const Paper: FC = () => {
  const { width } = useWindowState();
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" pt={20}>
      {paperItems.map(({ id, Image, title, text, list }) => (
        <Grid
          container
          justifyContent={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
          alignItems="center"
          key={id}
          sx={{
            '&:nth-of-type(odd)': { flexDirection: 'row' },
            '&:nth-of-type(even)': { flexDirection: 'row-reverse' },
          }}
        >
          <Grid item sx={{ img: { width: +width < 900 ? '338px' : '519px' } }} py={{ xs: 4, sm: 4, md: 0, lg: 0 }}>
            <Image />
          </Grid>

          <Grid
            item
            container
            direction="column"
            justifyContent="flex-start"
            alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
            spacing={3}
            xs={11}
            sm={8}
            md={5}
          >
            <Grid item container alignSelf={{ xs: 'flex-start', sm: 'flex-start', md: 'center' }}>
              <Typography variant="h1">{title}</Typography>
            </Grid>
            <Grid item>{text}</Grid>
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={3}
              alignSelf="flex-start"
            >
              {list.map((checkItem) => (
                <Grid item container key={checkItem} justifyContent="flex-start" alignItems="center" spacing={3}>
                  <Grid item>
                    <CheckIcon />
                  </Grid>

                  <Grid item>
                    <Typography variant="body1" fontWeight={FontWeights.fontWeightMedium}>
                      {checkItem}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
