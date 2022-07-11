import { COLOR_TEXT_BLACK, COLOR_TEXT_BLUE, COLOR_TEXT_WHITE } from 'theme/variables';

import { RankItemProps } from './Rank.types';

export const rankColors: RankItemProps[] = [
  {
    id: 0,
    title: 'Stake to get RANK',
    stopColorOne: '#FFFFFF',
    stopColorTwo: '#FFFFFF',
  },
  {
    id: 1,
    title: 'Bronze',
    stopColorOne: '#882B03',
    stopColorTwo: '#BB6221',
  },
  {
    id: 2,
    title: 'Silver',
    stopColorOne: '#667274',
    stopColorTwo: '#ABB9BB',
  },
  {
    id: 3,
    title: 'Gold',
    stopColorOne: '#D08C06',
    stopColorTwo: '#FAB400',
  },
  {
    id: 4,
    title: 'Sapphire',
    stopColorOne: '#191FAC',
    stopColorTwo: '#4575F2',
  },
  {
    id: 5,
    title: 'Ruby',
    stopColorOne: '#AC1919',
    stopColorTwo: '#FF5C5C',
  },
  {
    id: 6,
    title: 'Emerald',
    stopColorOne: '#06880B',
    stopColorTwo: '#27E723',
  },
];

export const styleHelper = {
  account: {
    rankColor: COLOR_TEXT_WHITE,
    subtitleColor: COLOR_TEXT_WHITE,
  },
  card: {
    rankColor: COLOR_TEXT_BLUE,
    subtitleColor: COLOR_TEXT_BLACK,
  },
};
