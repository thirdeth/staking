import { FC } from 'react';
import { Grid, Typography } from '@mui/material';

type RoadmapProps = {
  roadmapText: string;
};

export const Roadmap: FC<RoadmapProps> = ({ roadmapText }) => {
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Typography variant="h2" fontSize="22px">
          Roadmap
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{roadmapText}</Typography>
      </Grid>
    </Grid>
  );
};
