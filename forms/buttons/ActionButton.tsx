import { Button } from '@mui/material';
import Item from '@mui/material/Grid';
import { useState } from 'react';
import { useSWRConfig } from 'swr'

export default function IntegrationSummary(props: any) {
    const [clicked, setClicked] = useState(false);
    const { mutate } = useSWRConfig();
    return <Item xs={12} md={6}>
            <Button
             sx={{width:"100%"}} 
             variant="contained" 
             color={props.color}
             size="large" 
             disabled={clicked || props.disabledCheck()} 
             onClick={() => {
                console.log(props.action.constructor.name);
                if (props.action.constructor.name == "AsyncFunction")
                {
                    setClicked(true);
                    setTimeout(() => setClicked(false), 5000);
                    props.action().then((x: any) => {
                        props.swr.mutate();
                        mutate("IntegrationMenuProvider");
                    })
                }
                else
                {
                    props.action();
                }
            }}>
                {props.name}
            </Button>
        </Item>;
}