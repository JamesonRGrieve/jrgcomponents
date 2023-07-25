import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiContext } from "@mui/x-data-grid";
type Props = {
    title: string,
    columns: any[],
    data: any,
    pagination: number[],
    rowFilter: any,
    rowMap: any, 
    rowClick: any,
    export?: boolean,
    filteredDataCallback?: any
  }
export default function GridView(props: Props) {
  console.log(props);
    return <> 
    <Typography variant="h4" component="h1" gutterBottom>{props.title}</Typography>
    <DataGrid
    autoHeight
    initialState={{
      pagination: {
        pageSize: props.pagination[0],
      }
    }}
    onStateChange={(state) => {console.log(state)}}
    onRowClick={props.rowClick}
    columns={props.columns}
    rows={props.data.filter(props.rowFilter)?.map(props.rowMap) || []}
    rowsPerPageOptions={props.pagination}
    onFilterModelChange={(model :any) => {
      console.log(model);
      let filtered = [...props.data.filter(props.rowFilter)?.map(props.rowMap)];
      for (const filter of model.items)
      {
        if (filter.value)
        {
          if (filter.operatorValue === "contains")
          {
            filtered = filtered.filter(x => x[filter.columnField].includes(filter.value))
          }
          else if (filter.operatorValue === "equals")
          {
            filtered = filtered.filter(x => x[filter.columnField] == filter.value)
          }
          else if (filter.operatorValue === "startsWith")
          {
            filtered = filtered.filter(x => x[filter.columnField].startsWith(filter.value))
          }
          else if (filter.operatorValue === "endsWith")
          {
            filtered = filtered.filter(x => x[filter.columnField].endsWith(filter.value))
          }
          else if (filter.operatorValue === "isEmpty")
          {
            filtered = filtered.filter(x => !x[filter.columnField])
          }
          else if (filter.operatorValue === "isNotEmpty")
          {
            filtered = filtered.filter(x => x[filter.columnField])
          }
          // TODO: Add support for "any of".
        }
        
      }
      props.filteredDataCallback(filtered);
    }}
    onCellClick={(params) => {
      console.log(params)
      //
    }}
    components={{ Toolbar: GridToolbar }}
  />
  </>
    
  };