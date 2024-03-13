import { Button } from '@mui/material';
import Item from '@mui/material/Grid';
//import { useState } from 'react';
import React from 'react';

export default function IntegrationSummary(props: any) {
  //const [clicked, setClicked] = useState(false);
  return (
    <Item xs={12} md={6}>
      <Button
        sx={{ width: '100%' }}
        variant='contained'
        color={props.color}
        size='large'
        disabled={props.disabledCheck()}
        onClick={
          props.action

          /*() => {
                console.log(props.action.constructor.name);
                console.log(props.action);
                if (props.action.constructor.name == "AsyncFunction")
                {
                    setClicked(true);
                    setTimeout(() => setClicked(false), 5000);
                    props.action().then((x: any) => {
                        //props.swr.mutate();
                        //mutate("IntegrationMenuProvider");
                    })
                }
                else
                {
                    props.action();
                }
            }}*/
        }
      >
        {props.name}
      </Button>
    </Item>
  );
}
