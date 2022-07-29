import { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, Stack, styled, Typography } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

const Item = styled(Card)({
  border: 'none',
  boxShadow: 'none',
});

export const TeamMembers: FC<ProjectDataProps> = ({ projectData }) => {
  const { team } = projectData;
  return (
    <Grid container spacing={{ md: 3, xs: 2 }}>
      {team.map(({ photo, name, position, id }) => (
        <Grid item key={id} md={3} xs={6}>
          <Stack
            sx={{
              m: '0 auto',
              maxWidth: { xs: '162px', md: 'none' },
            }}
          >
            <Item>
              <CardMedia
                sx={{
                  background: BG_GRAY,
                  borderRadius: BORDER_RADIUS_CARD_MEDIUM,
                  height: { md: '224px', xs: '216px' },
                }}
                component="img"
                src={photo}
              />
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography variant="body2" fontWeight={700}>
                  {name}
                </Typography>
                <Typography variant="body2">{position}</Typography>
              </CardContent>
            </Item>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
