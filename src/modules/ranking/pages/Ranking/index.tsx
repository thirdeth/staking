import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProgressBar } from 'components';

export const Ranking: FC = () => {
  return (
    <Box>
      <Link to="/staking/ranking">Go next</Link>
      <Box>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo suscipit quos quae nisi voluptates excepturi
        consectetur dolore dolorem quo, eaque illum commodi voluptas dicta ab, sint aspernatur modi dignissimos dolorum
        cum? Exercitationem, sit voluptates iure hic nemo id facere facilis. Suscipit optio dolores perspiciatis et quos
        dolorum? Voluptatum beatae est natus neque impedit, recusandae laboriosam consequatur ipsam facere deserunt
        eaque asperiores nisi labore, suscipit deleniti, sapiente consequuntur? Qui quam culpa doloribus molestias,
        adipisci provident exercitationem quidem eum aperiam animi distinctio impedit tempore? Assumenda porro veniam
        exercitationem non quod nisi nam odit aperiam aut quam. Autem quia corporis est labore a.
      </Box>
      <ProgressBar progress={50} />
    </Box>
  );
};
