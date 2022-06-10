import { FC } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { SocialLinks } from 'components';
import { MainLogo } from 'components/Icon/components';
import { BG_MAIN, BORDER_HEADER, COLOR_TEXT_BLUE, COLOR_TEXT_GRAY_LIGHT } from 'theme/variables';

import { termsItems } from './Footer.helpers';

export const Footer: FC = () => {
  return (
    <Box
      sx={(theme) => ({
        paddingTop: theme.spacing(11),
        width: '100%',
        background: BG_MAIN,
      })}
    >
      <Container>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          py={4.5}
          sx={{ borderTop: BORDER_HEADER, borderBottom: BORDER_HEADER }}
        >
          <Grid item container justifyContent="space-between" alignItems="center" xs={12}>
            <Grid item container alignItems="center" columnGap={2}>
              <MainLogo />
              <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                Cronos Launcher
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2" align="right" color={COLOR_TEXT_GRAY_LIGHT} sx={{ maxWidth: '459px' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&apos;s standard dummy text ever since the 1500s.
              </Typography>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between" alignItems="center" xs={12} pt={4.5}>
            <Button variant="text" sx={{ padding: '0', color: COLOR_TEXT_BLUE }}>
              Documents
            </Button>
            <Grid item>
              <SocialLinks />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="center" xs={12}>
          <Grid item>
            <Typography variant="body2" color={COLOR_TEXT_GRAY_LIGHT}>
              Copyright © 2022. All Rights Reserved by Cronos Launcher
            </Typography>
          </Grid>
          <Grid item container alignItems="center" columnGap={2} py={4.5}>
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
    </Box>
  );
};
