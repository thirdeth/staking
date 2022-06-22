import { styled, Typography } from '@mui/material';
import { DaoLogo, DefiLogo, GamefiLogo, NftLogo } from 'modules/landing/assets';
import { FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';

const TextContainer = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '18px',
  lineHeight: '30px',
  fontWeight: FontWeights.fontWeightRegular,
  strong: { color: COLOR_TEXT_BLUE },
  [theme.breakpoints.down('md')]: {
    // width: '338px',
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

export const paperItems = [
  {
    id: 1,
    Image: GamefiLogo,
    title: 'GAMEFI',
    text: (
      <>
        <TextContainer>
          Thanks to the <strong>Play-to-Earn</strong> growth and the rebranding of Facebook in Meta, the decentralized
          gaming sector is going viral in Q4 2021.
        </TextContainer>
        <TextContainer>
          The Initial Game Offerings (IGO) are the last trend and Cronos Launcher aims to be one of the main actors in
          building the <strong>Cronos Metaverse</strong> supporting promising projects and giving players the chance to
          purchase and farm tokens before anyone else.
        </TextContainer>
      </>
    ),
    list: ['Launchpool', 'IGO (Intial Game Offering)'],
  },
  {
    id: 2,
    Image: DefiLogo,
    title: 'DEFI',
    text: (
      <>
        <TextContainer>
          Cronos is a brand new ecosystem ready to be built, <strong>DEXes & Lending</strong> platforms are ready to
          develop, Indexes & Insurance protocols are ready to move from IBC-compatible and EVM blockchains and some
          <br />
          <strong>Yield Optimizers & Aggregators</strong> have already done it.
        </TextContainer>
        <TextContainer>
          Cronos Launcher is the first incubator and accelerator on Cronos, active since day one and ready to launch the
          future leading protocols of this blockchain.
        </TextContainer>
      </>
    ),
    list: ['Launchpool', 'IGO (Intial Game Offering)'],
  },
  {
    id: 3,
    Image: DaoLogo,
    title: 'DAO',
    text: (
      <>
        <TextContainer>
          Natively born in the DeFi, <strong>DAOs</strong> are quickly taking control of the crypto world holding
          billions in assets and controlling the majority of the biggest DeFi protocols.
        </TextContainer>
        <TextContainer>
          In a future dominated by DAOs, <strong>Governance tokens</strong> are the new standard in truly-decentralized
          projects giving to the holders voting power, revenue shares and further benefits giving the investors a key
          position in their development.
        </TextContainer>
      </>
    ),
    list: ['DAICO (Decentralized Autonomous ICO)', 'Airdrop'],
  },
  {
    id: 4,
    Image: NftLogo,
    title: 'NFT',
    text: (
      <>
        <TextContainer>
          NFT collections are sharply rising, becoming mainstream and gaining the interest of mass media and famous
          personalities from all over the world, from NBA players to Hollywood stars.
        </TextContainer>
        <TextContainer>
          Given its technical features, Cronos has the potential to attract a high number creators to become a hub for
          Wrapped NFTs and Fractionalized NFTs thanks to its interoperability and its cheaper fees.
        </TextContainer>
      </>
    ),
    list: ['Stake to Earn', 'NFTs Offering & Minting'],
  },
];
