import { BaseLogo, EvmLogo, HubLogo, IbcLogo } from 'assets/img';

export const roadCards = [
  {
    id: 1,
    Image: EvmLogo,
    title: 'EVM COMPATIBLE',
    text: 'Cronos is built on Ethermint, this allows rapid porting of DApps, Tokens and Smart Contracts from other EVM chains like Ethereum, Binance Smart Chain and Polygon.',
  },
  {
    id: 2,
    Image: IbcLogo,
    title: 'IBC INTEROPERABILITY',
    text: 'Cronos, thanks to the Tendermint protocol, is able to communicate and allows the token transfer between all IBC-compatible chains like Crypto.org, Cosmos and Terra.',
  },
  {
    id: 3,
    Image: HubLogo,
    title: 'CONNECTION HUB',
    text: 'Cronos is actually the only EVM chain IBC-enabled, it can work as a connection hub between the two ecosystems, attracting interest and capital from both sides.',
  },
  {
    id: 4,
    Image: BaseLogo,
    title: 'USER BASE',
    text: 'Cronos will be able to attract users relying not only on its technical features, high speed-low fees transactions but also on the 10M+ active users of Crypto.com.',
  },
];
