import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Grid, Typography } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { getEmbedYoutubeLink } from 'modules/ido/utils';
import { BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

export const ProjectSummary: FC<ProjectDataProps> = ({ projectData }) => {
  const { projectSummary, videoUrl } = projectData;
  const currentUrl = getEmbedYoutubeLink(videoUrl);

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h2" fontSize="22px">
          Project Summary
        </Typography>
      </Grid>
      <Grid item>
        <Typography component="div">{ReactHtmlParser(projectSummary)}</Typography>
      </Grid>
      {videoUrl !== '-' && (
        <Grid item>
          <iframe
            width="100%"
            height="374"
            src={currentUrl}
            title="YouTube video player"
            frameBorder="20px"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
          />
        </Grid>
      )}
    </Grid>
  );
};
