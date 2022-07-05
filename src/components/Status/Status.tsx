import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Spinner } from 'components';
import { BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { IdoStatus } from 'types/store/requests';

import { projectStatusStyleState } from './index';

export type StatusProps = {
  status: IdoStatus;
};

export const Status: FC<StatusProps> = ({ status }) => {
  return (
    <Box
      py={1.5}
      sx={{
        width: '154px',
        maxHeight: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderRadius: BORDER_RADIUS_DEFAULT,
        ...projectStatusStyleState.color[status],
      }}
    >
      {status === IdoStatus.pending ? (
        <Spinner />
      ) : (
        <Typography variant="body2" color={projectStatusStyleState.color[status].color} textTransform="uppercase">
          {status}
        </Typography>
      )}
    </Box>
  );
};
