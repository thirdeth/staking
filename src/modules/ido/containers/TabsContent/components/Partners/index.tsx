import { FC } from 'react';
import { Card, CardMedia, Grid, Link } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

export const Partners: FC<ProjectDataProps> = ({ projectData }) => {
  const { partners } = projectData;
  return (
    <Grid container spacing={{ md: 3, xs: 2 }}>
      {partners.map(({ icon, urlPath, id }) => (
        <Grid item key={id} xs={6}>
          <Link href={urlPath} target="_blank" rel="noreferrer">
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
                src={icon}
              />
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
