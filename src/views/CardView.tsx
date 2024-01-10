import { Typography, CardActionArea, Box, Card, CardContent } from '@mui/material';

import React from 'react';

type Props = {
  data: any;
  determineColor: any;
  cardAction: any;
};
export default function CardView({ data, cardAction }: Props) {
  return (
    <Box display='grid' gridTemplateColumns='repeat(8, 1fr)' gap='1rem' my='1rem'>
      {data.map((cardData: any) => {
        return (
          <CardViewCard
            key={cardData.key}
            title={cardData.title}
            subtitle={cardData.subtitle}
            color={cardData.color}
            action={() => cardAction(cardData.key)}
          />
        );
      })}
    </Box>
  );
}

type SubProps = {
  key: any;
  title: any;
  subtitle: any;
  color: any;
  action: any;
};
const CardViewCard = (props: SubProps) => {
  return (
    <Card sx={{ backgroundColor: props.color, boxShadow: '0.3rem 0.45rem #555' }}>
      <CardActionArea onClick={props.action}>
        <CardContent>
          <Typography
            variant='h5'
            component='p'
            sx={{
              mv: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5, textAlign: 'center' }} color='text.secondary'>
            {props.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
