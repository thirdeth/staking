import { FC, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { SideBar } from 'modules/ido/components';

import { ProjectSummary, Roadmap, Schedule, Tokenomics } from './components';
import { sidebarTabItems } from './TabsContent.helpers';

const SCHEDULE_DATA_MOCK = [
  {
    title: 'Allocation',
    date: {
      open: 1655899748,
      close: 1655899748,
    },
  },
  {
    title: 'Validator Round',
    date: {
      open: 1655899748,
      close: 1655899748,
    },
  },
  {
    title: 'Staking Round',
    date: {
      open: 1655899748,
      close: 1655899748,
    },
  },
  {
    title: 'Sale Ends',
    date: {
      open: 1655899748,
      close: 1655899748,
    },
  },
];

const ROADMAP_TEXT_MOCK =
  'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur cites of the word in classical literature.Standard chunkde Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original making it over 2000 years old. Richard McClintock';

const SUMMARY_DATA_MOCK = {
  text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur cites of the word in classical literature.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original',
  videoLink: 'https://www.youtube.com/embed/djHa6pZskQU',
};

export const TabsContent: FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const ActiveTabComponent = useMemo(() => [ProjectSummary, Schedule, Tokenomics, Roadmap][activeTab - 1], [activeTab]);

  const handleChangeActiveTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <SideBar tabItems={sidebarTabItems} activeTab={activeTab} onChangeActiveTab={handleChangeActiveTab} />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <ActiveTabComponent
          summaryInfoData={SUMMARY_DATA_MOCK}
          scheduleInfoData={SCHEDULE_DATA_MOCK}
          roadmapText={ROADMAP_TEXT_MOCK}
        />
      </Grid>
    </Grid>
  );
};
