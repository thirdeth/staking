import { FC } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BG_GRAY_LIGHT, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { PoolInfoDataProps } from './PoolInfoCard.types';

const TextContainer = styled(Typography)({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: FontWeights.fontWeightMedium,
});

export type PoolInfoCardProps = {
  poolInfoData: PoolInfoDataProps;
};

export const PoolInfoCard: FC<PoolInfoCardProps> = ({ poolInfoData }) => {
  const { tokenDistribution, minAllocation, maxAllocation, tokenPrice, accessType } = poolInfoData;
  const titlesArray = ['Token Distribution', 'Min. Allocation', 'Max. Allocation', 'Token Price', 'Access type'];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2, md: 3 },
        background: BG_GRAY_LIGHT,
        borderRadius: BORDER_RADIUS_CARD_MEDIUM,
      }}
    >
      <Typography fontSize="22px" lineHeight="26px" fontFamily={FontFamilies.secondary} mb={3}>
        Pool Info
      </Typography>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={{ xs: 2, sm: 2, md: 3 }}
          xs={6}
        >
          {titlesArray.map((title, index) => (
            // not rerendering items of array
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item>
              <Typography variant="body2" fontWeight={700} whiteSpace="nowrap">
                {title}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          rowSpacing={{ xs: 2, sm: 2, md: 3 }}
          xs={6}
        >
          <Grid item>
            <TextContainer>{tokenDistribution} UTC</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{minAllocation} BUSD</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{maxAllocation} BUSD</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer whiteSpace="nowrap">{tokenPrice} SIDUS</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{accessType}</TextContainer>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
