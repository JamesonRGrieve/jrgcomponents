import { Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

type Props = {
  title: string;
  columns: any[];
  data: any;
  pagination: number[];
  rowFilter: any;
  rowMap: any;
  rowClick: any;
  export?: boolean;
  filteredDataCallback?: any;
};
export default function GridView(props: Props) {
  console.log(props);
  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        {props.title}
      </Typography>
      <DataGrid
        autoHeight
        onStateChange={(state) => {
          console.log(state);
        }}
        onRowClick={props.rowClick}
        columns={props.columns}
        rows={props.data.filter(props.rowFilter)?.map(props.rowMap) || []}
        onFilterModelChange={(model: any) => {
          let filtered = [
            ...props.data
              .filter(props.rowFilter)
              ?.map(props.rowMap)
              .map((x: any) => {
                for (const key in x) {
                  if (x[key] && typeof x[key] === 'string') {
                    x[key] = x[key].toUpperCase();
                  }
                }
                return x;
              }),
          ];
          for (const filter of model.items) {
            if (filter.value) {
              console.log('Pre Filter', filtered);
              console.log('Applying Filter', filter);
              const transformedFilterValue = filter.value.toUpperCase();
              if (filter.operator === 'contains') {
                filtered = filtered.filter((x) => x[filter.field].includes(transformedFilterValue));
              } else if (filter.operator === 'equals') {
                filtered = filtered.filter((x) => x[filter.field] == transformedFilterValue);
              } else if (filter.operator === 'startsWith') {
                filtered = filtered.filter((x) => x[filter.field].startsWith(transformedFilterValue));
              } else if (filter.operator === 'endsWith') {
                filtered = filtered.filter((x) => x[filter.field].endsWith(transformedFilterValue));
              } else if (filter.operator === 'isEmpty') {
                filtered = filtered.filter((x) => !x[filter.field]);
              } else if (filter.operator === 'isNotEmpty') {
                filtered = filtered.filter((x) => x[filter.field]);
              }
              // TODO: Add support for "any of".
              console.log('Post Filter', filtered);
            }
          }
          console.log('Filtered in GridView', filtered);
          props.filteredDataCallback(filtered);
        }}
        onCellClick={(params) => {
          console.log(params);
          //
        }}
        components={{ Toolbar: GridToolbar }}
      />
    </>
  );
}
