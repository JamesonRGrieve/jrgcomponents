import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
type Props = {
    columns: any,
    rows: any,
    data: any,
    pagination: any,
    rowFilter: any,
    rowMap: any, 
    rowClick: any
  }
export default function GridView(props: Props) {
  console.log(props);
    return <DataGrid
    autoHeight
    initialState={{
      pagination: {
        pageSize: props.pagination[0],
      }
    }}
    onRowClick={props.rowClick}
    columns={props.columns}
    rows={props.rowFilter(props.data)?.map(props.rowMap) || []}
    rowsPerPageOptions={props.pagination}
    onCellClick={(params) => {
      console.log(params)
      //
    }}
  />
    
  };