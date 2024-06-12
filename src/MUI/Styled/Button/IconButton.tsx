import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';

export type ButtonWithIconProps = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  iconPosition?: 'top' | 'bottom' | 'left' | 'right';
};

const ButtonThemed = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'iconPosition',
})<{ iconPosition: 'top' | 'bottom' | 'left' | 'right' }>(({ iconPosition }) => ({
  display: 'flex',
  flexDirection: ['top', 'bottom'].includes(iconPosition) ? 'column' : 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  '& .MuiButton-icon': {
    margin: 0,
  },
}));

const StyledButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  label,
  icon,
  onClick,
  type = 'button',
  iconPosition = 'top',
}) => {
  return (
    <ButtonThemed variant='outlined' size='large' onClick={onClick} startIcon={icon} type={type} iconPosition={iconPosition}>
      {label}
    </ButtonThemed>
  );
};

export default StyledButtonWithIcon;
