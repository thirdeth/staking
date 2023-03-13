import { FC } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { MainLogo } from 'assets/img';
import { SocialLinks } from 'components';
import { previewSocialLinksItems } from 'modules/landing/pages/Home/sections/Preview/Preview.helpers';
import { BG_MAIN, BORDER_HEADER, COLOR_TEXT_GRAY_LIGHT } from 'theme/variables';

import { termsItems } from './Footer.helpers';

export const Footer: FC = () => {
  return (
    <Container sx={{ pt: 11, background: BG_MAIN }}>
      <Grid
        container
        alignItems="center"
        py={4.5}
        sx={{
          borderTop: BORDER_HEADER,
          borderBottom: BORDER_HEADER,
        }}
      >
        <Grid
          item
          container
          justifyContent={{ xs: 'flex-start', sm: 'space-between', md: 'space-between', lg: 'space-between' }}
          rowSpacing={1}
          xs={12}
        >
          <Grid item container alignItems="center" columnGap={2}>
            <Box component="img" src={MainLogo} alt="main_logo" maxWidth={{ xs: 160, sm: 240, md: 256 }} />
          </Grid>

          <Grid item>
            <Typography
              variant="body2"
              color={COLOR_TEXT_GRAY_LIGHT}
              sx={{
                maxWidth: { xs: '340px', sm: '459px', md: '459px', lg: '459px' },
                textAlign: { xs: 'left', sm: 'left', md: 'right', lg: 'right' },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-end', lg: 'flex-end' }}
          xs={12}
          pt={4.5}
        >
          <SocialLinks links={previewSocialLinksItems} />
        </Grid>
      </Grid>

      <Grid
        item
        container
        alignItems="center"
        justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'space-between', lg: 'space-between' }}
        xs={12}
        sx={{ py: { xs: 3, sm: 3, md: 0, lg: 0 } }}
      >
        <Grid item container columnGap={1} direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}>
          <Typography variant="body2" color={COLOR_TEXT_GRAY_LIGHT}>
            Copyright © 2022. All Rights Reserved
          </Typography>
          <Typography variant="body2" color={COLOR_TEXT_GRAY_LIGHT}>
            by Arbishpere
          </Typography>
        </Grid>

        <Grid item container alignItems="center" columnGap={2} py={{ xs: 1, sm: 1, md: 4.5, lg: 4.5 }}>
          {termsItems.map(({ id, title, link }) => (
            <a key={id} href={link} target="_blank" rel="noreferrer">
              <Typography variant="body2" align="right" color={COLOR_TEXT_GRAY_LIGHT}>
                {title}
              </Typography>
            </a>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
