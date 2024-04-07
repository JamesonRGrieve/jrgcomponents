import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React from 'react';

export type QuotaSliderProps = {
  used: number;
  limit: number;
};

const QuotaSliderStyled = styled(Slider)<QuotaSliderProps & SliderProps>(({ used, limit, max }) => {
  return {
    '& .MuiSlider-rail': {
      position: 'relative',
      backgroundColor: '#5F9EA0',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '0',
        right: `${((max - used) / max) * 100}%`,
        backgroundColor: '#00F',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${(limit / max) * 100}%`,
        right: '0',
        backgroundColor: '#555',
      },
    },
  };
});
QuotaSlider.defaultProps = {
  valueLabelFormat: (value: any) => `New Max: ${value}`,
  valueLabelDisplay: 'on',
};
export default function QuotaSlider(props: QuotaSliderProps & SliderProps) {
  return (
    <QuotaSliderStyled
      {...props}
      marks={[
        { label: `${props.used} Used`, value: props.used },
        { label: `${props.limit} Max`, value: props.limit },
        { label: `${props.max} Available`, value: props.max },
      ]}
    />
  );
}
