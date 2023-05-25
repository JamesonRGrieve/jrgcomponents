import Typography from '@mui/material/Typography';
export default function ContentSWR({ swr, authSWR=null, content }) {
  //console.log(swr.data);
  console.log(swr);
  return (
    swr.isLoading || (authSWR && authSWR.isLoading)
      ?
      <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold", width: "100%", textAlign: "center" }}>
        Loading...
      </Typography>
      :
      (
        swr.error
          ?
          <>
            <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold", width: "100%", textAlign: "center" }}>
              Error!
            </Typography>
            <Typography paragraph>
              {swr.error.message}
            </Typography>
          </>
          :
          (
          (authSWR && authSWR.error) ? <>
          <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: "bold", width: "100%", textAlign: "center" }}>
              Unauthorized!
            </Typography>
            <Typography paragraph sx={{ width: "100%", textAlign: "center" }}>
              {authSWR.error.message}
            </Typography> 
            </>
          :
          content({ data: swr.data })
          )
      )
  );
}