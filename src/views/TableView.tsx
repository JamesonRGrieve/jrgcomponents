import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link
} from '@mui/material';
import Router from 'next/router';
type Props = {
  title: string;
  rows: any;
  data: any;
};
import React from 'react';
export default function TableView(props: Props) {
  return (
    <TableContainer>
      <Typography variant='h4' component='h1' gutterBottom>
        {props.title}
      </Typography>
      <Table sx={{ minWidth: 200 }} aria-label='simple table'>
        <TableHead>
          <TableRow key={props.title}>
            <TableCell align='center'>Field Name</TableCell>
            <TableCell align='center'>Value</TableCell>
            <TableCell align='center'>Data Source(s)</TableCell>
            <TableCell align='center'>Last Affecting Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row' align='center'>
                {row.name}
              </TableCell>
              {row.linkAccessor ? (
                <TableCell align='center'>
                  <Link
                    sx={{ cursor: 'pointer' }}
                    onClick={() => Router.push(row.linkAccessor(props.data))}
                  >
                    {row.valueAccessor(props.data) ?? 'Not Available'}
                  </Link>
                </TableCell>
              ) : (
                <TableCell align='center'>
                  {row.valueAccessor(props.data) ?? 'Not Available'}
                </TableCell>
              )}
              <TableCell align='center'>Coming Soon</TableCell>
              <TableCell align='center'>Coming Soon</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
