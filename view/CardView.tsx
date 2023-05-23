import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid } from "@mui/material";
import { Card, CardContent } from '@mui/material';
import Item from '@mui/material/Grid';
import { useTheme } from '@mui/material';

type Props = {
  data: any,
  args: any,
  colors: any,
  determineColor: any,
  subsetFilter: any
}
export default function CardView(props: Props) {
  return <Grid container columns={8}>
    {props.args.map((arg: any) => {

      const devices = props.subsetFilter(props.data, arg, props.args);
      return <CardViewCard key={arg} arg={arg} data={devices} color={props.determineColor(props.colors, devices.length)} />;
    }
    )}
  </Grid>
};

type SubProps = {
  arg: any,
  data: any,
  color: any,
}
const CardViewCard = (props: SubProps) => {
  //console.log(props.arg);
  //console.log(props.data);
  return <Item xs={4} md={2} xl={1} sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
    <Card variant="outlined" sx={{ flexGrow: 1, backgroundColor: props.color.color }}>
      <CardContent>
        <Typography variant="h5" component="span" sx={{ mv: "0.5rem", fontWeight: "bold", cursor: "pointer" }}>
          {// Still need to add functionality to replace the * 500 with actual product costs based on the device type
            // Also plan to add localization to the currency, need to find out if I can retrieve their preference from Stripe possibly.
            props.data?.length + (props.data?.length === 1 ? ' Device' : ' Devices')}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.arg === 0 ? "Unsupported Currently" : `Unsupported in ${props.arg} Months`}
        </Typography>
        {props.data?.length === 0 ? "" :
          [
            <Typography variant="body2" key="cost">
              {(props.data?.length * 500).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
            </Typography>,
            <Typography variant="body2" key="priority">
              Priority: {props.color.description}
            </Typography>
          ]}
      </CardContent>
    </Card>
  </Item>
}