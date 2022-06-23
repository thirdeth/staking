import { FC } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { BG_GRAY_LIGHT, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { TokenInfoDataProps } from './TokenIfoCard.types';

const TextContainer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: FontWeights.fontWeightMedium,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('md')]: { maxWidth: '120px' },
}));

export type TokenInfoCardProps = {
  tokenInfoData: TokenInfoDataProps;
};

export const TokenInfoCard: FC<TokenInfoCardProps> = ({ tokenInfoData }) => {
  const { tokenName, tokenSymbol, decimals, address, totalSupply } = tokenInfoData;
  const titlesArray = ['Token Name', 'Token Symbol', 'Decimals', 'Address', 'Total Supply'];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2, md: 3 },
        background: BG_GRAY_LIGHT,
        borderRadius: BORDER_RADIUS_CARD_MEDIUM,
      }}
    >
      <Typography fontSize="22px" lineHeight="26px" fontFamily={FontFamilies.secondary} mb={3}>
        Token Info
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
            <TextContainer>{tokenName}</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{tokenSymbol}</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{decimals}</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{address}</TextContainer>
          </Grid>
          <Grid item>
            <TextContainer>{totalSupply} DDO</TextContainer>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
