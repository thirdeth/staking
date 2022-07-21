import { FC } from 'react';
import { Card, CardMedia, Grid, Link } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { BscScan, CoinGecko, CoinMarketCap, EtherScan } from './icons';

const PARTNERS_ARRAY_MOCK = [
  {
    logo: BscScan,
    link: '',
  },
  {
    logo: EtherScan,
    link: '',
  },
  {
    logo: CoinGecko,
    link: '',
  },
  {
    logo: CoinMarketCap,
    link: '',
  },
];

export const Partners: FC<ProjectDataProps> = ({ projectData }) => {
  // const { partners } = projectData;
  return (
    <Grid container spacing={{ md: 3, xs: 2 }}>
      {PARTNERS_ARRAY_MOCK.map(({ logo, link }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item key={index} xs={6}>
          <Link href={link} target="_blank" rel="noreferrer">
            <Card
              sx={{
                boxShadow: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '100px', md: '224px' },
                background: BG_GRAY,
                borderRadius: BORDER_RADIUS_CARD_MEDIUM,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  maxWidth: { md: '240px', xs: '120px' },
                }}
                src={logo}
              />
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
