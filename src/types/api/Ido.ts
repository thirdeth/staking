/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Partner } from './Partner';
import { Team } from './Team';
import { Tokenomic } from './Tokenomic';

export interface Ido {
  decimals?: number;
  discord: string;
  end: string;
  hardCap: string;
  id?: number;
  idoIncrement: number;
  investor?: string;
  investors?: string;
  logoUrl?: string;
  lotteryParams?: { level: string; percent: string }[];
  medium: string;
  owner?: number;
  ownerAddress?: string;
  partners?: Partner[];
  price: number;
  projectName: string;
  projectSummary: string;
  roadmap: string;
  softCap: string;
  start: string;
  startUnlockPercent?: number;
  status?: string;
  targetedRaise?: string;
  team?: Team[];
  telegram: string;
  timer?: string;
  tokenAddress: string;
  tokenLogoUrl?: string;
  tokenName: string;
  tokenSymbol: string;
  tokenomics?: Tokenomic[];
  totalBought: string;
  totalSupply: string;
  twitter: string;
  type?: string;
  unlockPercent?: number;
  unlockStepTime?: number;
  vesting?: boolean;
  videoUrl: string;
}
