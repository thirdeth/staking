import { FC } from 'react';
import { Grid, GridProps, Link } from '@mui/material';
import { COLOR_TEXT_BLUE } from 'theme/variables';

import { socialsItems } from './SocialLinks.helpers';

type SocialLinksProps = {
  color?: string;
  fullWidth?: boolean;
} & GridProps;

export const SocialLinks: FC<SocialLinksProps> = ({ color = COLOR_TEXT_BLUE, fullWidth = false, ...gridProps }) => {
  return (
    <Grid
      {...gridProps}
      container
      spacing={2}
      justifyContent={fullWidth ? 'space-between' : 'center'}
      sx={{ width: fullWidth ? '100% !important' : 'auto' }}
    >
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
