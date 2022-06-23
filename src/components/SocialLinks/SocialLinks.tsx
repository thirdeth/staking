import { FC } from 'react';
import { Grid, GridProps, Link } from '@mui/material';
import { COLOR_TEXT_BLUE } from 'theme/variables';

import { socialsItems } from './SocialLinks.helpers';

type SocialLinksProps = {
  color?: string;
} & GridProps;

export const SocialLinks: FC<SocialLinksProps> = ({ color = COLOR_TEXT_BLUE, ...gridProps }) => {
  return (
    <Grid {...gridProps} container spacing={2}>
      {socialsItems.map(({ id, Icon, link }) => (
        <Grid key={id} item>
          <Link href={link} target="_blank" rel="noreferrer">
            <Icon sx={{ path: { fill: color } }} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
