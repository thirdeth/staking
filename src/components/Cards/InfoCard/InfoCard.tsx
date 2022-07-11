import { FC, PropsWithChildren } from 'react';
import { Box, BoxProps, Button, Typography } from '@mui/material';
import { WarningIcon } from 'components/Icon/components';
import { BG_BLUE_LIGHT, BORDER_RADIUS_DEFAULT, COLOR_TEXT_ACCENT_BLUE } from 'theme/variables';

export interface InfoCardProps {
  title: string;
  buttonText?: string;
  onClick?: () => void;
}

export const InfoCard: FC<PropsWithChildren<InfoCardProps & Pick<BoxProps, 'sx'>>> = ({
  sx,
  title,
  onClick,
  buttonText,
  children,
}) => {
  return (
    <Box
      sx={{
        px: 2,
        background: BG_BLUE_LIGHT,
        borderRadius: BORDER_RADIUS_DEFAULT,
        height: '296px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      {children}
      <WarningIcon sx={{ path: { fill: COLOR_TEXT_ACCENT_BLUE } }} />
      <Typography variant="body1" my={2} color={COLOR_TEXT_ACCENT_BLUE} textAlign="center" maxWidth={350}>
        {title}
      </Typography>

      {buttonText && (
        <Button size="large" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
