import { FC } from 'react';

import s from './Dashboard.module.scss';

const Dashboard: FC = () => {
  return (
    <div className={s.dashboardWrapper}>
      <h1>Hello Dashboard!</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, deserunt eveniet. Architecto dolores
        debitis sit minus corporis! Sed ullam, perferendis dicta, dolorem ducimus rem corrupti, maiores veritatis vel
        minima ab!
      </p>
    </div>
  );
};
export default Dashboard;
