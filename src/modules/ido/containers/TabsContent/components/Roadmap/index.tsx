import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';

export const Roadmap: FC<ProjectDataProps> = ({ projectData }) => {
  const { roadmap } = projectData;
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Typography variant="h2" fontSize="22px">
          Roadmap
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{roadmap}</Typography>
      </Grid>
    </Grid>
  );
};
