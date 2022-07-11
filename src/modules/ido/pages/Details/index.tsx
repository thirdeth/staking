import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { ApplyCard } from 'components';
import { useShallowSelector } from 'hooks';
import { isEmpty } from 'lodash';
import { LauncherCard, TabsContent } from 'modules/ido/containers';
import { LauncherSkeletonCard } from 'modules/ido/containers/LauncherCard/components';
import { getIdoById } from 'store/ido/actions';
import idoActionTypes from 'store/ido/actionTypes';
import idoSelector from 'store/ido/selectors';
import uiSelector from 'store/ui/selectors';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';
import { RequestStatus } from 'types';
import { getDisplayStageName } from 'utils';

import { IdoRequiredProps } from './Details.types';

export const Details: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const projectData = useShallowSelector(idoSelector.getProp('currentIdo')) as IdoRequiredProps;
  const { userAllocation } = useShallowSelector(idoSelector.getProp('userInfo'));

  const {
    [idoActionTypes.REGISTRATION_TO_IDO]: registrationRequestStatus,
    [idoActionTypes.GET_IDO_BY_ID]: getIdoByIdRequestStatus,
  } = useShallowSelector(uiSelector.getUI);
  const isRegistration = registrationRequestStatus === RequestStatus.REQUEST;
  const isGettingIdoById = getIdoByIdRequestStatus === RequestStatus.REQUEST;

  useEffect(() => {
    if (id) {
      dispatch(getIdoById({ id }));
    }
  }, [dispatch, id]);

  return (
    <>
      {!isEmpty(projectData) && !isGettingIdoById && (
        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3} sx={{ overflowX: 'hidden' }}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                strong: {
                  fontSize: '30px',
                  fontFamily: FontFamilies.secondary,
                  fontWeight: FontWeights.fontWeightRegular,
                  textTransform: 'uppercase',
                  color: COLOR_TEXT_BLUE,
                },
              }}
            >
              Status: <strong>{getDisplayStageName(projectData.status)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LauncherCard projectData={projectData} userAllocation={userAllocation} isRegistration={isRegistration} />
          </Grid>
          <Grid item xs={12}>
            <TabsContent projectData={projectData} />
          </Grid>
          <Grid item xs={12}>
            <ApplyCard size="s" />
          </Grid>
        </Grid>
      )}
      {isGettingIdoById && <LauncherSkeletonCard />}
    </>
  );
};
