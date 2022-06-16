import { FC, useState } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { Select } from 'components';

export const Idos: FC = () => {
  const [selectValue, setSelectValue] = useState(1);

  const handelChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    setSelectValue(Number(value));
  };
  return (
    <Box>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit libero corporis sit velit hic, porro
      nostrum quas repellat illo voluptas vero animi cum, nobis est. Obcaecati doloremque, distinctio ut autem sapiente
      reiciendis aperiam voluptatem tempora cum magni soluta aliquam perferendis. Aperiam, quidem laudantium maxime
      dolore eaque magnam aut cupiditate.
      <Box pt={12}>
        <Select
          value={selectValue}
          defaultValue={selectValue}
          onChange={handelChange}
          paperWidth="200px"
          menuItems={[
            {
              value: 1,
              label: 'one',
            },
            {
              value: 2,
              label: 'two',
            },
            {
              value: 3,
              label: 'three',
            },
          ]}
        />
      </Box>
    </Box>
  );
};
