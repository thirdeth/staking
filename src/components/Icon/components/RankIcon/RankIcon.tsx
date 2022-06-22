import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

interface RankIconProps {
  stopColorOne?: string;
  stopColorTwo?: string;
}

export const RankIcon: FC<RankIconProps & SvgIconProps> = ({ sx, stopColorOne = '', stopColorTwo = '', ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 70 79"
    sx={{
      width: '70px',
      height: '79px',
      ...sx,
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M70 57.6667V21.3333C69.9971 20.7863 69.8514 20.2498 69.5775 19.7777C69.3037 19.3057 68.9114 18.915 68.4402 18.6448L36.4837 0.401357C36.0326 0.138423 35.5209 0 35 0C34.4791 0 33.9674 0.138423 33.5163 0.401357L1.55978 18.6448C1.08862 18.915 0.69633 19.3057 0.422483 19.7777C0.148636 20.2498 0.00291008 20.7863 0 21.3333V57.6667C0.00291008 58.2137 0.148636 58.7502 0.422483 59.2223C0.69633 59.6943 1.08862 60.085 1.55978 60.3552L33.5163 78.5986C33.9674 78.8616 34.4791 79 35 79C35.5209 79 36.0326 78.8616 36.4837 78.5986L68.4402 60.3552C68.9114 60.085 69.3037 59.6943 69.5775 59.2223C69.8514 58.7502 69.9971 58.2137 70 57.6667ZM58.3333 52.6589V26.3411L35 13.0205L11.6667 26.3411V52.6589L35 65.9795L58.3333 52.6589Z"
      fill="url(#paint0_linear_1827_8683)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.4239 28.6118C35.295 28.5385 35.1488 28.5 35 28.5C34.8512 28.5 34.705 28.5385 34.5761 28.6118L25.4457 33.6922C25.311 33.7675 25.199 33.8763 25.1207 34.0077C25.0425 34.1392 25.0008 34.2886 25 34.4409V44.5591C25.0008 44.7114 25.0425 44.8608 25.1207 44.9923C25.199 45.1237 25.311 45.2325 25.4457 45.3078L34.5761 50.3882C34.705 50.4615 34.8512 50.5 35 50.5C35.1488 50.5 35.295 50.4615 35.4239 50.3882L44.5543 45.3078C44.689 45.2325 44.801 45.1237 44.8793 44.9923C44.9575 44.8608 44.9992 44.7114 45 44.5591V34.4409C44.9992 34.2886 44.9575 34.1392 44.8793 34.0077C44.801 33.8763 44.689 33.7675 44.5543 33.6922L35.4239 28.6118ZM41 36.292L35 32.9534L29 36.292V42.708L35 46.0466L41 42.708V36.292ZM33.448 46.9103C33.4562 46.9057 33.4643 46.9011 33.4725 46.8966L33.448 46.9103ZM36.5519 46.9103L36.5275 46.8965C36.5356 46.9011 36.5438 46.9057 36.5519 46.9103ZM36.5276 32.1034L36.5519 32.0897C36.5439 32.0943 36.5357 32.0989 36.5276 32.1034ZM33.448 32.0897L33.4724 32.1034C33.4643 32.0989 33.4561 32.0943 33.448 32.0897Z"
      fill="url(#paint1_linear_1827_8683)"
    />
    <defs>
      <linearGradient id="paint0_linear_1827_8683" x1="15" y1="9" x2="50.5" y2="77.5" gradientUnits="userSpaceOnUse">
        <stop stopColor={stopColorOne} />
        <stop offset="1" stopColor={stopColorTwo} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1827_8683"
        x1="29.2857"
        y1="31.0063"
        x2="39.0246"
        y2="50.2863"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={stopColorOne} />
        <stop offset="1" stopColor={stopColorTwo} />
      </linearGradient>
    </defs>
  </SvgIcon>
);