import { Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

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

    onStateChange={(state) => {console.log(state)}}
    onRowClick={props.rowClick}
    columns={props.columns}
    rows={props.data.filter(props.rowFilter)?.map(props.rowMap) || []}
    onFilterModelChange={(model :any) => {
      let filtered = [...props.data.filter(props.rowFilter)?.map(props.rowMap).map((x:any) => {
        for (const key in x) {
          if(x[key] && typeof x[key] === 'string') x[key] = x[key].toUpperCase(); 
        }  
        return x;
      })];
      for (const filter of model.items)
      {
        if (filter.value)
        {
          const transformedFilterValue = filter.value.toUpperCase();
          if (filter.operatorValue === "contains")
          {
            filtered = filtered.filter(x => x[filter.columnField].includes(transformedFilterValue))
          }
          else if (filter.operatorValue === "equals")
          {
            filtered = filtered.filter(x => x[filter.columnField] == transformedFilterValue)
          }
          else if (filter.operatorValue === "startsWith")
          {
            filtered = filtered.filter(x => x[filter.columnField].startsWith(transformedFilterValue))
          }
          else if (filter.operatorValue === "endsWith")
          {
            filtered = filtered.filter(x => x[filter.columnField].endsWith(transformedFilterValue))
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