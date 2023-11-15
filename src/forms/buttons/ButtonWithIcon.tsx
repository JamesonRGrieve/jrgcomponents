import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import React from 'react';

export type ButtonWithIconProps = {
  label: string;
  icon: ReactNode;
  action: any;
};

const ButtonThemed = styled(Button)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .MuiButton-endIcon': {
    margin: 0
  }
}));

const StyledButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  label,
  icon,
  action
}) => {
  return (
    <ButtonThemed
      variant='outlined'
      size='large'
      onClick={action}
      endIcon={icon}
    >
      {label}
    </ButtonThemed>
  );
};

export default StyledButtonWithIcon;
