import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

type ProjectSummaryProps = {
  summaryInfoData: {
    text: string;
    videoLink: string;
  };
};

export const ProjectSummary: FC<ProjectSummaryProps> = ({ summaryInfoData }) => {
  const { text, videoLink } = summaryInfoData;
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h2" fontSize="22px">
          Project Summary
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{text}</Typography>
      </Grid>
      <Grid item>
        <iframe
          width="100%"
          height="374"
          src={videoLink}
          title="YouTube video player"
          frameBorder="20px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
        />
      </Grid>
    </Grid>
  );
};
