import Typography from '@mui/material/Typography';
export default function ContentSWR({ swr, authSWR=null, content }) {
  return (
    swr.isLoading || (authSWR && authSWR.isLoading)
      ?
      <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold" }}>
        Loading...
      </Typography>
      :
      (
        swr.error
          ?
          <>
            <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold" }}>
              Error!
            </Typography>
            <Typography paragraph>
              {swr.error.message}
            </Typography>
          </>
          :
          (
          (authSWR && authSWR.error) ? <>
          <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold" }}>
              Unauthorized!
            </Typography>
            <Typography paragraph>
              {authSWR.error.message}
            </Typography> 
            </>
          :
          content({ data: swr.data })
          )
      )
  );
}