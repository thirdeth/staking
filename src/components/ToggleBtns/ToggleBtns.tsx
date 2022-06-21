import { FC } from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

export interface ToggleBtnsProps {
  buttonsItems: Array<{
    value: number;
    label: string;
  }>;
}

export const ToggleBtns: FC<ToggleBtnsProps & ToggleButtonGroupProps> = ({ buttonsItems, ...toggleBtnsProps }) => {
  /** 
   @example usage:
  const [activeValue, setActiveValue] = useState(2);
  const handleChangeActiveValue = (event: MouseEvent<HTMLElement>) => {
  const { value } = event.target as HTMLButtonElement;
  setActiveValue(+value);
  };
  */

  return (
    <ToggleButtonGroup
      {...toggleBtnsProps}
      sx={{
        background: 'transparent',
        border: 'none',
      }}
    >
      {buttonsItems.map((item) => (
        <ToggleButton key={item.value} value={item.value}>
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
