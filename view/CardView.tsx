import { Typography, Grid } from "@mui/material";
import { Card, CardContent } from '@mui/material';
import Item from '@mui/material/Grid';
import React from "react";
type Props = {
  data: any,
  determineColor: any,
}
export default function CardView(props: Props) {
  return <Grid container columns={8}>
    {props.data.map((cardData: any) => {
      return <CardViewCard key={cardData.key} title={cardData.title} subtitle={cardData.subtitle} color={cardData.color} />;
    }
    )}
  </Grid>
};

type SubProps = {
  key: any,
  title: any,
  subtitle: any,
  color: any
}
const CardViewCard = (props: SubProps) => {
  return <Item item xs={8} md={4} xl={1} sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
    <Card variant="outlined" sx={{ flexGrow: 1, backgroundColor: props.color }}>
      <CardContent>
        <Typography variant="h5" component="p" sx={{ mv: "0.5rem", fontWeight: "bold", cursor: "pointer", textAlign: "center" }}>
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5, textAlign: "center"}} color="text.secondary">
          {props.subtitle}
        </Typography>
      </CardContent>
    </Card>
  </Item>
}