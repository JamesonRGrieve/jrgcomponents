import {
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import React from "react";
export default function MenuSWR({ swr, menu }) {
  return (
    swr && swr.isLoading
      ?
      <ListItem>
        <ListItemText>
          <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold" }}>
            Loading...
          </Typography>
        </ListItemText>
      </ListItem>
      :
      (
        swr && swr.error
          ?
          <>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold" }}>
                  Error!
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography paragraph component="p">
                  {swr.error.message}
                </Typography>
              </ListItemText>
            </ListItem>
          </>
          :
          menu({ data: swr?.data })
      )
  );
}