import { FC } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { ChangeStakeItemType } from 'modules/staking/pages/Staking/Staking.types';
import { BG_BLUE_LIGHT, BORDER_RADIUS_DEFAULT, TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { ColorProps, ProjectCardDataProps, RankCardDataProps, StakesCardDataProps, VariantProps } from 'types';

import { Stakes } from './variants/Stakes';
import { Project, Rank, rowCardStyleState } from './index';

export const BoxRowStyled = styled(Box)({
  borderRadius: BORDER_RADIUS_DEFAULT,
  transition: TRANSITION_DEFAULT_TIME,
  '&:hover': {
    backgroundColor: BG_BLUE_LIGHT,
  },
});

export type RowCardProps = {
  variant?: VariantProps;
  rowColor?: ColorProps;
  isHarvesting?: boolean;
  isWithdrawing?: boolean;
  onChangeStakeItem?: (changeType: ChangeStakeItemType, stakeIndex: number) => void;
  cardData: ProjectCardDataProps | RankCardDataProps | StakesCardDataProps;
} & BoxProps;

export const RowCard: FC<RowCardProps> = ({
  variant = 'project',
  rowColor = 'gray',
  cardData,
  isHarvesting = false,
  isWithdrawing = false,
  onChangeStakeItem,
  ...boxProps
}) => {
  return (
    <BoxRowStyled
      p={variant === 'project' ? { xs: 2, sm: 2 } : { xs: 2, sm: 2 }}
      sx={{
        backgroundColor: rowCardStyleState.color[rowColor],
        ...boxProps,
      }}
    >
      {variant === 'project' && cardData && <Project cardData={cardData} />}
      {variant === 'rank' && cardData && <Rank cardData={cardData} />}
      {variant === 'stakes' && cardData && (
        <Stakes
          cardData={cardData}
          isHarvesting={isHarvesting}
          isWithdrawing={isWithdrawing}
          onChangeStakeItem={onChangeStakeItem}
        />
      )}
    </BoxRowStyled>
  );
};
