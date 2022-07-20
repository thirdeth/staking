import { styled, Tooltip, Typography } from '@mui/material';

const TextEllipsis = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  maxWidth: '100px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const getTooltipWithLoading = (isLoading: boolean, value: string) => {
  if (isLoading) {
    return <Typography>...</Typography>;
  }
  return (
    <Tooltip title={value} arrow placement="bottom-start">
      <TextEllipsis>{value} CRO</TextEllipsis>
    </Tooltip>
  );
};
