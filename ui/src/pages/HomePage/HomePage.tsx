import { Grid, Typography } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import type { DeviceListInterface } from "./HomePage.types";
import { useEffect } from "react";

function HomePage() {

  const {data} = useAxios<DeviceListInterface>("api/v1/devices/")

  useEffect(() => {
    console.log(data)
  },[data])

  return (
    <Grid>
      <Typography component="h1">HOME PAGE</Typography>
    </Grid>
  );
}

export default HomePage;
