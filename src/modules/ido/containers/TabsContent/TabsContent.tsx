import { FC, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { SideBar } from 'modules/ido/components';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';

import { ProjectInfo, ProjectSummary, Roadmap, Tokenomics } from './components';
import { sidebarTabItems } from './TabsContent.helpers';

export const TabsContent: FC<ProjectDataProps> = ({ projectData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const ActiveTabComponent = useMemo(
    () => [ProjectInfo, ProjectSummary, Tokenomics, Roadmap][activeTab - 1],
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
        <ActiveTabComponent projectData={projectData} />
      </Grid>
    </Grid>
  );
};
