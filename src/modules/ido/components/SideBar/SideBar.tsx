import { FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FontFamilies } from 'theme/Typography';
import { BG_GRAY, BORDER_RADIUS_DEFAULT, COLOR_TEXT_BLACK, COLOR_TEXT_BLUE } from 'theme/variables';

export type SideBarProps = {
  tabItems: string[];
  activeTab: number;
  onChangeActiveTab: (tabNumber: number) => void;
};

export const SideBar: FC<SideBarProps> = ({ activeTab, tabItems, onChangeActiveTab }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2, md: 3 },
        py: { xs: 1, sm: 1, md: 3 },
        height: { xs: '37px', sm: '37px', md: '363px' },
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Grid
        container
        direction={{ xs: 'row', sm: 'row', md: 'column' }}
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        overflow="auto"
        spacing={2}
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {tabItems.map((tab, index) => (
          // not rerendering items of tabs
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item>
            <Button
              variant="text"
              onClick={() => onChangeActiveTab(index + 1)}
              sx={{
                height: 'auto',
                color: activeTab === index + 1 ? COLOR_TEXT_BLUE : COLOR_TEXT_BLACK,
                fontFamily: FontFamilies.secondary,
                fontSize: '16px',
                lineHeight: '19px',
              }}
            >
              {tab}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
