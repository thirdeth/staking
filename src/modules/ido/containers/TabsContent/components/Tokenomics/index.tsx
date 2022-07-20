import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CircleChart } from 'modules/ido/components';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { FontFamilies } from 'theme/Typography';
import { BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';

const CHART_DATA_MOCK = [
  { title: 'One', value: 10, color: '#6D4AFE' },
  { title: 'One', value: 10, color: '#A3FF12' },
  { title: 'Two', value: 15, color: '#3BCBFF' },
  { title: 'Two', value: 15, color: '#0B58FE' },
  { title: 'Two', value: 15, color: '#01CC9B' },
  { title: 'Three', value: 20, color: '#D08C06' },
  { title: 'Three', value: 20, color: '#AC1919' },
  { title: 'Three', value: 20, color: '#f1899d' },
  { title: 'Three', value: 20, color: '#a99a4b' },
];

export const Tokenomics: FC<ProjectDataProps> = ({ projectData }) => {
  return (
    <Box p={1}>
      <Typography variant="h2" fontSize="22px" mb={3}>
        Tokenomics
      </Typography>
      <Grid
        container
        justifyContent={{ xs: 'center', sm: 'center', md: 'space-between' }}
        alignItems="center"
        sx={{
          p: 3,
          background: BG_GRAY,
          borderRadius: BORDER_RADIUS_DEFAULT,
        }}
        spacing={2}
      >
        <CircleChart chartData={CHART_DATA_MOCK} />

        <Grid item container spacing={2} xs={12} md={6}>
          {CHART_DATA_MOCK.map(({ title, value, color }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item container alignItems="flex-start" xs={6}>
              <Box sx={{ mt: 0.7, width: '12px', height: '12px', background: color, borderRadius: '50%' }} />
              <Box ml={1}>
                <Typography variant="body2">{title}</Typography>
                <Typography variant="body2" fontFamily={FontFamilies.secondary}>
                  {value} %
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
