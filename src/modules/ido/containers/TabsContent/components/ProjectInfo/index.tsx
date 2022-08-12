import { FC } from 'react';
import { Box, Grid, styled, Tooltip, Typography } from '@mui/material';
import { TextWithTooltip } from 'components';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { shortenPhrase } from 'utils';

const TextContainer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: FontWeights.fontWeightMedium,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('md')]: { maxWidth: '120px' },
}));

export const ProjectInfo: FC<ProjectDataProps> = ({ projectData }) => {
  const { tokenName, tokenSymbol, tokenAddress, totalSupply, decimals } = projectData;
  const titlesArray = ['Token Name', 'Token Symbol', 'Decimals', 'Address', 'Total Supply', 'Access type'];
  return (
    <>
      <Typography fontSize="22px" lineHeight="26px" fontFamily={FontFamilies.secondary} mb={3}>
        Project Info
      </Typography>
      <Box
        sx={{
          p: { xs: 2, sm: 2, md: 3 },
          background: BG_GRAY,
          borderRadius: BORDER_RADIUS_DEFAULT,
        }}
      >
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
                <Typography variant="body2" fontWeight={700}>
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
              <TextWithTooltip
                value={tokenName}
                fontSize="16px"
                maxWidth={{ xs: 120, sm: 120, md: 300 }}
                fontWeight={FontWeights.fontWeightMedium}
              />
            </Grid>
            <Grid item>
              <TextContainer>{tokenSymbol.toUpperCase()}</TextContainer>
            </Grid>
            <Grid item>
              <TextContainer>{decimals}</TextContainer>
            </Grid>
            <Grid item>
              <TextContainer>{shortenPhrase(tokenAddress, 4, 5)}</TextContainer>
            </Grid>
            <Grid item>
              <Tooltip title={totalSupply} arrow placement="left">
                <TextContainer>
                  {totalSupply} {tokenSymbol.toUpperCase()}
                </TextContainer>
              </Tooltip>
            </Grid>
            <Grid item>
              <TextContainer>{projectData.type.includes('public') ? 'Public' : 'Private'}</TextContainer>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
