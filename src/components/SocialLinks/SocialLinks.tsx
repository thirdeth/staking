import { FC } from 'react';
import { Grid, Link } from '@mui/material';

import { socialsItems } from './SocialLinks.helpers';

export const SocialLinks: FC = () => {
  return (
    <Grid container alignItems="center" columnGap={2}>
      {socialsItems.map(({ id, Icon, link }) => (
        <Link key={id} href={link} target="_blank" rel="noreferrer">
          <Icon />
        </Link>
      ))}
    </Grid>
  );
};
