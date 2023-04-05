import { FC } from 'react';
import { Grid, GridProps, Link } from '@mui/material';
import { DiscordIcon, MediumIcon, TelegramIcon, TwitterIcon } from 'components/Icon/components';
import { COLOR_TEXT_BLUE } from 'theme/variables';

import { LinksProps } from './SocialLinks.types';

type SocialLinksProps = {
  color?: string;
  links: LinksProps;
} & GridProps;

export const SocialLinks: FC<SocialLinksProps> = ({ color = COLOR_TEXT_BLUE, links, ...gridProps }) => {
  const { telegram, twitter, discord, medium } = links;
  return (
    <Grid {...gridProps} container spacing={2}>
      {telegram && telegram !== '-' && (
        <Grid item>
          <Link href={telegram} target="_blank" rel="noreferrer">
            <TelegramIcon sx={{ path: { fill: color } }} />
          </Link>
        </Grid>
      )}
      {twitter && twitter !== '-' && (
        <Grid item>
          <Link href={twitter} target="_blank" rel="noreferrer">
            <TwitterIcon sx={{ path: { fill: color } }} />
          </Link>
        </Grid>
      )}
      {discord && discord !== '-' && (
        <Grid item>
          <Link href={discord} target="_blank" rel="noreferrer">
            <DiscordIcon sx={{ path: { fill: color } }} />
          </Link>
        </Grid>
      )}
      {medium && medium !== '-' && (
        <Grid item>
          <Link href={medium} target="_blank" rel="noreferrer">
            <MediumIcon sx={{ path: { fill: color } }} />
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
