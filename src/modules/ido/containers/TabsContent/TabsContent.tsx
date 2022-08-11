import { FC, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { SideBar } from 'modules/ido/components';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';

import { LottereyInfo, Partners, ProjectInfo, ProjectSummary, Roadmap, TeamMembers, Tokenomics } from './components';
import { sidebarTabItems } from './TabsContent.helpers';

export type TabsContentProps = {
  myRankId: string;
} & ProjectDataProps;

export const TabsContent: FC<TabsContentProps> = ({ projectData, myRankId }) => {
  const [activeTab, setActiveTab] = useState(1);
  const ActiveTabComponent = useMemo(
    () => [LottereyInfo, ProjectInfo, ProjectSummary, Tokenomics, Roadmap, Partners, TeamMembers][activeTab - 1],
    [activeTab],
  );

  const handleChangeActiveTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <SideBar tabItems={sidebarTabItems} activeTab={activeTab} onChangeActiveTab={handleChangeActiveTab} />
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <ActiveTabComponent projectData={projectData} myRankId={myRankId} />
      </Grid>
    </Grid>
  );
};
